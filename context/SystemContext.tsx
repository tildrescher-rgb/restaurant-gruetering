import React, { createContext, useContext, useState, useEffect } from 'react';
import { Reservation, Table, AuditLogEntry, StaffUser, ReservationStatus } from '../types';

// Initial Mock Data
const MOCK_TABLES: Table[] = [
  { id: 't1', name: 'T1', capacity: 2, minCapacity: 1, area: 'window', isActive: true, x: 0, y: 0 },
  { id: 't2', name: 'T2', capacity: 2, minCapacity: 1, area: 'window', isActive: true, x: 1, y: 0 },
  { id: 't3', name: 'T3', capacity: 4, minCapacity: 2, area: 'main', isActive: true, x: 0, y: 1 },
  { id: 't4', name: 'T4', capacity: 4, minCapacity: 2, area: 'main', isActive: true, x: 1, y: 1 },
  { id: 't5', name: 'T5', capacity: 6, minCapacity: 4, area: 'main', isActive: true, x: 0, y: 2 },
  { id: 't6', name: 'Garden 1', capacity: 8, minCapacity: 4, area: 'garden', isActive: true, x: 2, y: 2 },
];

const MOCK_STAFF: StaffUser[] = [
  { id: 'u1', name: 'Chef', role: 'admin', pin: '0000' },
  { id: 'u2', name: 'Service', role: 'service', pin: '1234' },
];

interface SystemContextType {
  tables: Table[];
  reservations: Reservation[];
  logs: AuditLogEntry[];
  currentUser: StaffUser | null;
  
  // Public Actions
  findAvailableSlots: (date: string, partySize: number) => string[];
  createReservation: (data: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Promise<boolean>;
  
  // Staff Actions
  login: (pin: string) => boolean;
  logout: () => void;
  updateReservationStatus: (id: string, status: ReservationStatus, pin: string) => boolean;
  updateReservation: (id: string, updates: Partial<Reservation>, pin: string) => boolean;
  updateTable: (table: Table) => void;
  updateTablePlan: (tables: Table[]) => void;
  deleteCustomerData: (identifier: string, pin: string) => boolean;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or use mock
  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem('gruetering_tables');
    return saved ? JSON.parse(saved) : MOCK_TABLES;
  });
  
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('gruetering_reservations');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('gruetering_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('gruetering_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // --- Logic ---

  const addLog = (action: string, details: string, user: string = 'System') => {
    const newLog: AuditLogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      action,
      details,
      user
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const findAvailableSlots = (date: string, partySize: number): string[] => {
    // Simplified logic: Open 17:00 - 21:00 start times
    const possibleSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
    
    // Filter by tables capable of holding partySize
    const suitableTables = tables.filter(t => t.isActive && t.capacity >= partySize && t.minCapacity <= partySize + 1); // +1 allow small flexibility
    
    if (suitableTables.length === 0) return [];

    // Filter slots based on existing reservations
    // In a real app, this would check overlaps. 
    // MVP: If total reservations at a time > total tables, block it.
    return possibleSlots.filter(slot => {
      const busyTablesAtSlot = reservations.filter(r => 
        r.date === date && 
        r.status !== 'cancelled' && 
        r.status !== 'finished' &&
        r.time === slot
      ).length;

      return busyTablesAtSlot < suitableTables.length;
    });
  };

  const createReservation = async (data: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find a table assignment (simple auto-assign)
    const suitableTable = tables.find(t => 
      t.isActive && t.capacity >= data.partySize && 
      !reservations.some(r => r.date === data.date && r.time === data.time && r.tableId === t.id && r.status !== 'cancelled')
    );

    const newRes: Reservation = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: data.partySize > 8 ? 'pending' : 'confirmed', // Large groups need approval
      createdAt: new Date().toISOString(),
      tableId: suitableTable?.id // might be undefined if overbooked, but logic should prevent this
    };

    setReservations(prev => [...prev, newRes]);
    addLog('RESERVATION_CREATED', `New reservation for ${data.customerName} (${data.partySize}p)`);
    return true;
  };

  const login = (pin: string) => {
    const user = MOCK_STAFF.find(u => u.pin === pin);
    if (user) {
      setCurrentUser(user);
      addLog('LOGIN', 'Staff logged in', user.name);
      return true;
    }
    return false;
  };

  const logout = () => {
    addLog('LOGOUT', 'Staff logged out', currentUser?.name);
    setCurrentUser(null);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus, pin: string) => {
    // Validate PIN for action
    const user = MOCK_STAFF.find(u => u.pin === pin);
    if (!user) return false;

    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    addLog('STATUS_CHANGE', `Reservation ${id} changed to ${status}`, user.name);
    return true;
  };

  const updateReservation = (id: string, updates: Partial<Reservation>, pin: string) => {
    const user = MOCK_STAFF.find(u => u.pin === pin);
    if (!user) return false;

    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    addLog('RESERVATION_UPDATE', `Updated booking ${id} details`, user.name);
    return true;
  };

  const updateTable = (updatedTable: Table) => {
    setTables(prev => prev.map(t => t.id === updatedTable.id ? updatedTable : t));
    addLog('TABLE_UPDATE', `Updated table ${updatedTable.name}`, currentUser?.name);
  };
  
  const updateTablePlan = (newTables: Table[]) => {
      setTables(newTables);
      addLog('PLAN_UPDATE', 'Updated table layout', currentUser?.name);
  }

  const deleteCustomerData = (phone: string, pin: string) => {
    const user = MOCK_STAFF.find(u => u.pin === pin);
    // Only allow deletion if user exists. In real world, check for admin role.
    if (!user) return false;

    // We anonymize instead of delete to keep stats correct
    setReservations(prev => prev.map(r => {
      if (r.customerPhone === phone) {
        return {
          ...r,
          customerName: 'Anonymized Guest',
          customerPhone: 'Deleted',
          customerEmail: '',
          notes: 'Data deleted per GDPR request',
          status: r.status // keep status
        };
      }
      return r;
    }));
    
    addLog('GDPR_DELETE', `Anonymized data for phone ${phone}`, user.name);
    return true;
  };

  return (
    <SystemContext.Provider value={{
      tables,
      reservations,
      logs,
      currentUser,
      findAvailableSlots,
      createReservation,
      login,
      logout,
      updateReservationStatus,
      updateReservation,
      updateTable,
      updateTablePlan,
      deleteCustomerData
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within SystemProvider');
  return context;
};
