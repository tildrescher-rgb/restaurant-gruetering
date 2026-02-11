import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useSystem } from '../context/SystemContext';
import { LayoutGrid, Calendar, Settings, LogOut, CheckCircle, XCircle, Clock, Search, List, Edit2, ShieldAlert, Plus, Users, Trash2, History, Save } from 'lucide-react';
import { Reservation, ReservationStatus, Table } from '../types';

// --- Sub-Components ---

const LoginScreen = () => {
  const { login } = useSystem();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gruetering-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <h1 className="font-serif text-3xl text-gruetering-gold">Staff Access</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            maxLength={4}
            className="w-full bg-gruetering-anthracite border border-gruetering-stone p-4 text-center text-2xl tracking-[1em] text-gruetering-text rounded-sm focus:border-gruetering-gold focus:outline-none"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">Invalid PIN</p>}
          <button type="submit" className="w-full bg-gruetering-gold text-gruetering-black py-3 font-bold uppercase tracking-widest rounded-sm">
            Unlock
          </button>
        </form>
        <Link to="/" className="block text-gruetering-muted text-xs uppercase hover:text-white">Back to Public Site</Link>
      </div>
    </div>
  );
};

const StaffNav = () => {
  const { logout, currentUser } = useSystem();
  const loc = useLocation();
  
  const items = [
    { path: '/staff/dashboard', icon: <Calendar size={18} />, label: 'Bookings' },
    { path: '/staff/guests', icon: <Users size={18} />, label: 'Guests' },
    { path: '/staff/tables', icon: <LayoutGrid size={18} />, label: 'Table Plan' },
    { path: '/staff/audit', icon: <ShieldAlert size={18} />, label: 'Audit Log' },
  ];

  return (
    <nav className="bg-gruetering-anthracite border-b border-gruetering-stone px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-8">
        <span className="font-serif text-xl text-gruetering-gold">Grütering <span className="text-gruetering-muted text-sm font-sans uppercase ml-2">Internal</span></span>
        <div className="hidden md:flex space-x-1">
          {items.map(i => (
            <Link 
              key={i.path} 
              to={i.path}
              className={`px-4 py-2 rounded-sm text-sm font-medium flex items-center space-x-2 transition-colors ${
                loc.pathname === i.path ? 'bg-gruetering-stone text-white' : 'text-gruetering-muted hover:text-white'
              }`}
            >
              {i.icon} <span>{i.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xs text-gruetering-muted hidden sm:block">Logged in as <span className="text-gruetering-gold">{currentUser?.name}</span></span>
        <button onClick={logout} className="p-2 text-gruetering-muted hover:text-red-400 transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

const PinConfirmModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: (pin: string) => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}> = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message = "Enter your PIN to verify.", confirmLabel = "CONFIRM", isDestructive = false }) => {
  const [pin, setPin] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gruetering-anthracite p-8 border border-gruetering-stone rounded-sm max-w-xs w-full text-center space-y-4 shadow-2xl">
        <h3 className={`text-gruetering-text ${isDestructive ? 'text-red-500' : ''}`}>{title}</h3>
        <p className="text-xs text-gruetering-muted">{message}</p>
        <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-center text-xl tracking-widest text-gruetering-text focus:border-gruetering-gold focus:outline-none"
            autoFocus
          />
        <div className="flex space-x-2 pt-2">
          <button onClick={onClose} className="flex-1 py-2 border border-gruetering-stone text-gruetering-muted text-xs hover:bg-gruetering-stone hover:text-white transition-colors">CANCEL</button>
          <button 
            onClick={() => { onConfirm(pin); setPin(''); onClose(); }} 
            className={`flex-1 py-2 text-gruetering-black text-xs font-bold hover:opacity-90 transition-opacity ${isDestructive ? 'bg-red-500' : 'bg-gruetering-gold'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

const EditReservationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  onSave: (id: string, updates: Partial<Reservation>) => void;
  tables: Table[];
}> = ({ isOpen, onClose, reservation, onSave, tables }) => {
  const [formData, setFormData] = useState<Partial<Reservation>>({});

  useEffect(() => {
    if (reservation) {
      setFormData({
        date: reservation.date,
        time: reservation.time,
        partySize: reservation.partySize,
        tableId: reservation.tableId || '',
        notes: reservation.notes || '',
      });
    }
  }, [reservation]);

  if (!isOpen || !reservation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(reservation.id, formData);
    onClose();
  };

  const timeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-gruetering-anthracite w-full max-w-lg border border-gruetering-stone rounded-sm shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gruetering-stone flex justify-between items-center">
           <h3 className="text-xl font-serif text-gruetering-gold">Edit Reservation</h3>
           <button onClick={onClose} className="text-gruetering-muted hover:text-white"><XCircle size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest text-gruetering-muted">Date</label>
               <input 
                 type="date"
                 value={formData.date || ''}
                 onChange={e => setFormData({...formData, date: e.target.value})}
                 className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-white focus:border-gruetering-gold focus:outline-none"
               />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest text-gruetering-muted">Time</label>
               <select
                 value={formData.time || ''}
                 onChange={e => setFormData({...formData, time: e.target.value})}
                 className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-white focus:border-gruetering-gold focus:outline-none"
               >
                 {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
               </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest text-gruetering-muted">Guests</label>
               <input 
                 type="number"
                 min="1"
                 max="20"
                 value={formData.partySize || ''}
                 onChange={e => setFormData({...formData, partySize: parseInt(e.target.value)})}
                 className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-white focus:border-gruetering-gold focus:outline-none"
               />
             </div>
             <div className="space-y-2">
               <label className="text-xs uppercase tracking-widest text-gruetering-muted">Table</label>
               <select
                 value={formData.tableId || ''}
                 onChange={e => setFormData({...formData, tableId: e.target.value || undefined})}
                 className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-white focus:border-gruetering-gold focus:outline-none"
               >
                 <option value="">Auto / Unassigned</option>
                 {tables.map(t => (
                   <option key={t.id} value={t.id}>
                     {t.name} ({t.capacity}p) {t.isActive ? '' : '(Inactive)'}
                   </option>
                 ))}
               </select>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest text-gruetering-muted">Notes</label>
             <textarea 
               rows={3}
               value={formData.notes || ''}
               onChange={e => setFormData({...formData, notes: e.target.value})}
               className="w-full bg-gruetering-black border border-gruetering-stone p-2 text-white focus:border-gruetering-gold focus:outline-none"
             />
          </div>

          <div className="pt-4 flex justify-end space-x-4">
             <button type="button" onClick={onClose} className="px-4 py-2 border border-gruetering-stone text-gruetering-muted text-sm hover:text-white transition-colors">CANCEL</button>
             <button type="submit" className="px-6 py-2 bg-gruetering-gold text-gruetering-black text-sm font-bold uppercase tracking-widest hover:bg-gruetering-goldLight transition-colors">SAVE CHANGES</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Dashboard ---

const Dashboard = () => {
  const { reservations, updateReservationStatus, updateReservation, tables } = useSystem();
  const [filter, setFilter] = useState('all');
  const [pinModal, setPinModal] = useState<{ open: boolean, action: ((pin: string) => void) | null }>({ open: false, action: null });
  const [editModal, setEditModal] = useState<{ open: boolean, reservation: Reservation | null }>({ open: false, reservation: null });

  // Group by Time
  const sortedReservations = useMemo(() => {
    // Filter for today (mocking today as the dates in DB might be diff, so just showing all for MVP)
    let data = [...reservations].sort((a, b) => a.time.localeCompare(b.time));
    if (filter !== 'all') {
      data = data.filter(r => r.status === filter);
    }
    return data;
  }, [reservations, filter]);

  const handleStatusChange = (id: string, newStatus: ReservationStatus) => {
    setPinModal({
      open: true,
      action: (pin) => {
        const success = updateReservationStatus(id, newStatus, pin);
        if (!success) alert('Invalid PIN');
      }
    });
  };

  const handleEditSave = (id: string, updates: Partial<Reservation>) => {
    // We close the edit modal then open the pin modal to confirm
    setPinModal({
      open: true,
      action: (pin) => {
        const success = updateReservation(id, updates, pin);
        if (!success) alert('Invalid PIN');
      }
    });
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'confirmed': return 'text-green-400 border-green-900 bg-green-900/20';
      case 'seated': return 'text-blue-400 border-blue-900 bg-blue-900/20';
      case 'pending': return 'text-yellow-400 border-yellow-900 bg-yellow-900/20';
      case 'cancelled': return 'text-red-400 border-red-900 bg-red-900/20';
      default: return 'text-gray-400 border-gray-800 bg-gray-900';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-serif text-gruetering-text">Todays Reservations</h2>
        
        {/* Quick Stats */}
        <div className="flex space-x-4 text-xs text-gruetering-muted">
           <div>Total: <span className="text-white">{reservations.length}</span></div>
           <div>Pax: <span className="text-white">{reservations.reduce((acc, curr) => acc + curr.partySize, 0)}</span></div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 bg-gruetering-anthracite p-1 rounded-sm border border-gruetering-stone">
           {['all', 'confirmed', 'seated', 'pending'].map(f => (
             <button 
               key={f} 
               onClick={() => setFilter(f)}
               className={`px-3 py-1 text-xs uppercase rounded-sm transition-colors ${filter === f ? 'bg-gruetering-gold text-black' : 'text-gruetering-muted hover:text-white'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid gap-4">
        {sortedReservations.length === 0 && <p className="text-gruetering-muted text-center py-12">No reservations found.</p>}
        
        {sortedReservations.map(res => (
          <div key={res.id} className="bg-gruetering-anthracite border border-gruetering-stone p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4 hover:border-gruetering-gold/50 transition-colors">
            {/* Time & Table */}
            <div className="flex items-center space-x-6 min-w-[150px]">
              <div className="text-center">
                <span className="block text-2xl font-light text-white">{res.time}</span>
                <span className="text-xs text-gruetering-muted">{res.durationMinutes} min</span>
              </div>
              <div className="h-10 w-px bg-gruetering-stone"></div>
              <div>
                 <span className="block text-xs text-gruetering-muted uppercase">Table</span>
                 <span className="text-gruetering-gold font-serif text-lg">{res.tableId ? `T${res.tableId}` : 'Auto'}</span>
              </div>
            </div>

            {/* Guest Info */}
            <div className="flex-grow text-center md:text-left flex flex-col justify-center gap-2">
              <div>
                <h3 className="text-lg font-medium text-white">{res.customerName}</h3>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-gruetering-muted mt-1">
                  <span className="flex items-center"><UsersIcon size={12} className="mr-1" /> {res.partySize} Guests</span>
                  <span className="flex items-center"><PhoneIcon size={12} className="mr-1" /> {res.customerPhone}</span>
                </div>
              </div>
              
              {res.notes && (
                <div className="mt-1 bg-yellow-500/10 border border-yellow-500/30 p-2 rounded-sm text-xs text-yellow-200 flex items-start justify-center md:justify-start">
                   <AlertIcon size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                   <span className="font-medium text-left">{res.notes}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-[10px] uppercase tracking-wider border rounded-sm ${getStatusColor(res.status)}`}>
                {res.status}
              </span>

              {/* Edit Button */}
              {(res.status !== 'cancelled' && res.status !== 'finished') && (
                <button 
                  onClick={() => setEditModal({ open: true, reservation: res })} 
                  className="p-2 bg-gruetering-stone hover:bg-gruetering-gold hover:text-gruetering-black text-white rounded-full transition-colors" 
                  title="Edit Reservation"
                >
                  <Edit2 size={16} />
                </button>
              )}
              
              {res.status === 'confirmed' && (
                <button onClick={() => handleStatusChange(res.id, 'seated')} className="p-2 bg-gruetering-stone hover:bg-green-700 text-white rounded-full transition-colors" title="Check In">
                  <CheckCircle size={18} />
                </button>
              )}
              {res.status === 'seated' && (
                <button onClick={() => handleStatusChange(res.id, 'finished')} className="p-2 bg-gruetering-stone hover:bg-blue-700 text-white rounded-full transition-colors" title="Finish">
                  <LogOut size={18} />
                </button>
              )}
              {(res.status === 'pending' || res.status === 'confirmed') && (
                <button onClick={() => handleStatusChange(res.id, 'cancelled')} className="p-2 bg-gruetering-stone hover:bg-red-700 text-white rounded-full transition-colors" title="Cancel">
                  <XCircle size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PinConfirmModal 
        isOpen={pinModal.open} 
        onClose={() => setPinModal({ ...pinModal, open: false })}
        onConfirm={(pin) => pinModal.action && pinModal.action(pin)}
      />

      <EditReservationModal 
        isOpen={editModal.open}
        onClose={() => setEditModal({ ...editModal, open: false })}
        reservation={editModal.reservation}
        onSave={handleEditSave}
        tables={tables}
      />
    </div>
  );
};

// --- Guest Directory & History ---

interface GroupedGuest {
  name: string;
  phone: string;
  email?: string;
  visits: number;
  lastVisit: string;
  reservations: Reservation[];
}

const GuestDirectory = () => {
  const { reservations, deleteCustomerData } = useSystem();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<GroupedGuest | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean, phone: string | null }>({ open: false, phone: null });

  // Group reservations by Phone Number to simulate "User Profiles"
  const guests = useMemo(() => {
    const map = new Map<string, GroupedGuest>();
    
    reservations.forEach(r => {
      // Skip already deleted/anonymized users
      if (r.customerPhone === 'Deleted') return;

      const key = r.customerPhone;
      if (!map.has(key)) {
        map.set(key, {
          name: r.customerName,
          phone: r.customerPhone,
          email: r.customerEmail,
          visits: 0,
          lastVisit: r.date,
          reservations: []
        });
      }
      
      const entry = map.get(key)!;
      entry.visits += 1;
      // Update name to latest if changed
      entry.name = r.customerName; 
      if (r.date > entry.lastVisit) entry.lastVisit = r.date;
      entry.reservations.push(r);
    });

    // Sort reservations for each guest by date desc
    map.forEach(guest => {
      guest.reservations.sort((a, b) => b.date.localeCompare(a.date));
    });

    return Array.from(map.values());
  }, [reservations]);

  const filteredGuests = useMemo(() => {
    if (!searchTerm) return guests;
    const lower = searchTerm.toLowerCase();
    return guests.filter(g => g.name.toLowerCase().includes(lower) || g.phone.includes(searchTerm));
  }, [guests, searchTerm]);

  const handleDelete = (pin: string) => {
    if (deleteModal.phone) {
      const success = deleteCustomerData(deleteModal.phone, pin);
      if (!success) {
        alert("Action failed. Check PIN.");
      } else {
        setSelectedGuest(null);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-2xl font-serif text-gruetering-text">Guest Directory</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gruetering-muted" size={16} />
          <input 
            type="text" 
            placeholder="Search Name or Phone..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-gruetering-anthracite border border-gruetering-stone pl-10 pr-4 py-2 rounded-sm text-sm text-white focus:border-gruetering-gold focus:outline-none w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow overflow-hidden">
        
        {/* Guest List */}
        <div className="bg-gruetering-anthracite border border-gruetering-stone rounded-sm overflow-y-auto pr-1">
          {filteredGuests.length === 0 && <p className="text-center text-gruetering-muted py-8 text-sm">No guests found.</p>}
          {filteredGuests.map((guest) => (
            <div 
              key={guest.phone}
              onClick={() => setSelectedGuest(guest)}
              className={`p-4 border-b border-gruetering-stone cursor-pointer transition-colors hover:bg-gruetering-stone/30 ${selectedGuest?.phone === guest.phone ? 'bg-gruetering-stone/50 border-l-2 border-l-gruetering-gold' : ''}`}
            >
               <h4 className="text-white font-medium">{guest.name}</h4>
               <p className="text-xs text-gruetering-muted mt-1 flex justify-between">
                 <span>{guest.phone}</span>
                 <span>{guest.visits} Visits</span>
               </p>
            </div>
          ))}
        </div>

        {/* Guest Details */}
        <div className="md:col-span-2 bg-gruetering-anthracite/50 border border-gruetering-stone rounded-sm p-6 overflow-y-auto">
          {selectedGuest ? (
            <div className="space-y-8 animate-fade-in">
              
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-3xl font-serif text-gruetering-gold">{selectedGuest.name}</h3>
                   <div className="flex items-center space-x-4 mt-2 text-sm text-gruetering-muted">
                      <span className="flex items-center"><PhoneIcon size={14} className="mr-1"/> {selectedGuest.phone}</span>
                      {selectedGuest.email && <span className="flex items-center">@ {selectedGuest.email}</span>}
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-2xl font-light text-white">{selectedGuest.visits}</div>
                   <div className="text-[10px] uppercase tracking-widest text-gruetering-muted">Total Visits</div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 border-y border-gruetering-stone py-4">
                  <div>
                    <span className="block text-xs text-gruetering-muted uppercase">First Visit</span>
                    <span className="text-white">{selectedGuest.reservations[selectedGuest.reservations.length-1].date}</span>
                  </div>
                   <div>
                    <span className="block text-xs text-gruetering-muted uppercase">Last Visit</span>
                    <span className="text-white">{selectedGuest.lastVisit}</span>
                  </div>
                   <div>
                    <span className="block text-xs text-gruetering-muted uppercase">No-Shows</span>
                    <span className={`text-white ${selectedGuest.reservations.filter(r => r.status === 'no-show').length > 0 ? 'text-red-400' : ''}`}>
                      {selectedGuest.reservations.filter(r => r.status === 'no-show').length}
                    </span>
                  </div>
              </div>

              {/* History Timeline */}
              <div>
                <h4 className="text-sm font-medium text-gruetering-muted mb-4 flex items-center"><History size={16} className="mr-2"/> Reservation History</h4>
                <div className="space-y-4">
                   {selectedGuest.reservations.map(res => (
                     <div key={res.id} className="relative pl-6 border-l border-gruetering-stone pb-4 last:pb-0 last:border-0">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-gruetering-gold"></div>
                        <div className="bg-gruetering-black p-3 rounded-sm border border-gruetering-stone/50 flex justify-between items-start">
                           <div>
                              <div className="text-white font-medium">{res.date} <span className="text-gruetering-muted font-normal text-xs ml-2">{res.time}</span></div>
                              <div className="text-xs text-gruetering-muted mt-1">{res.partySize} Guests • Table {res.tableId || 'Auto'}</div>
                              {res.notes && (
                                <div className="mt-2 text-xs text-yellow-500 bg-yellow-900/10 p-1 inline-block rounded-sm">
                                  Note: {res.notes}
                                </div>
                              )}
                           </div>
                           <span className={`text-[10px] uppercase px-2 py-1 rounded-sm border ${
                             res.status === 'finished' ? 'border-green-900 text-green-500' : 
                             res.status === 'no-show' ? 'border-red-900 text-red-500' : 
                             res.status === 'cancelled' ? 'border-red-900/50 text-red-400/50' : 'border-gruetering-stone text-gruetering-muted'
                           }`}>
                             {res.status}
                           </span>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* GDPR Action */}
              <div className="pt-8 border-t border-gruetering-stone mt-auto">
                 <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center"><ShieldAlert size={14} className="mr-2"/> Data Privacy Zone</h4>
                 <p className="text-xs text-gruetering-muted mb-4">
                   Permanently anonymize all personal data for this customer (GDPR Request). 
                   Reservation statistics will remain for business reporting.
                 </p>
                 <button 
                   onClick={() => setDeleteModal({ open: true, phone: selectedGuest.phone })}
                   className="flex items-center space-x-2 px-4 py-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 rounded-sm text-xs uppercase tracking-widest transition-colors"
                 >
                   <Trash2 size={14} /> <span>Forget Customer</span>
                 </button>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gruetering-muted space-y-4">
               <Users size={48} className="opacity-20" />
               <p>Select a guest to view history</p>
            </div>
          )}
        </div>
      </div>

      <PinConfirmModal 
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ ...deleteModal, open: false })}
        onConfirm={handleDelete}
        title="GDPR Deletion"
        message="This action cannot be undone. Enter PIN to confirm deletion of personal data."
        confirmLabel="DELETE DATA"
        isDestructive={true}
      />
    </div>
  );
};

// --- Table Editor ---

const TableEditor = () => {
  const { tables, updateTable, updateTablePlan } = useSystem();
  
  // Simple visual editor: A grid 4x4
  // If we click a cell, we toggle a table or create one
  
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-gruetering-text">Table Plan</h2>
        <p className="text-xs text-gruetering-muted">Visual Representation</p>
      </div>

      <div className="bg-gruetering-stone/20 p-8 rounded-sm overflow-x-auto">
        <div className="grid grid-cols-4 gap-8 w-[800px] mx-auto min-h-[400px] relative bg-gruetering-black border border-gruetering-stone">
           {tables.map(table => (
             <div 
                key={table.id}
                className={`
                  relative border-2 rounded-sm flex flex-col items-center justify-center p-4 cursor-pointer transition-all hover:scale-105
                  ${table.isActive ? 'border-gruetering-gold bg-gruetering-anthracite' : 'border-dashed border-gruetering-stone opacity-50'}
                `}
                style={{ 
                   gridColumnStart: (table.x || 0) + 1,
                   gridRowStart: (table.y || 0) + 1,
                }}
                onClick={() => updateTable({...table, isActive: !table.isActive})}
             >
                <span className="font-serif text-xl text-white">{table.name}</span>
                <span className="text-xs text-gruetering-muted">{table.capacity} Pax</span>
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${table.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map(t => (
          <div key={t.id} className="bg-gruetering-anthracite p-4 border border-gruetering-stone rounded-sm flex justify-between items-center">
             <div>
               <h4 className="text-white">{t.name}</h4>
               <p className="text-xs text-gruetering-muted">{t.area} • {t.capacity} Seats</p>
             </div>
             <input 
               type="checkbox" 
               checked={t.isActive} 
               onChange={() => updateTable({...t, isActive: !t.isActive})}
               className="accent-gruetering-gold w-5 h-5"
             />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Audit Log ---

const AuditLog = () => {
  const { logs } = useSystem();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-serif text-gruetering-text">Audit Log</h2>
      <div className="space-y-2">
        {logs.length === 0 && <p className="text-gruetering-muted">No activities recorded yet.</p>}
        {logs.map(log => (
          <div key={log.id} className="flex space-x-4 text-sm border-b border-gruetering-stone pb-2 last:border-0">
             <span className="text-gruetering-muted font-mono w-32 shrink-0">{new Date(log.timestamp).toLocaleTimeString()}</span>
             <span className="text-gruetering-gold font-bold w-32 shrink-0">{log.user}</span>
             <div className="text-white">
                <span className="text-xs uppercase bg-gruetering-stone px-1 rounded mr-2">{log.action}</span>
                {log.details}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Layout for Staff ---

const StaffLayout = () => {
  const { currentUser } = useSystem();
  if (!currentUser) return <Navigate to="/staff/login" replace />;

  return (
    <div className="min-h-screen bg-gruetering-black text-gruetering-text font-sans">
      <StaffNav />
      <div className="animate-fade-in">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="guests" element={<GuestDirectory />} />
          <Route path="tables" element={<TableEditor />} />
          <Route path="audit" element={<AuditLog />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

// --- Root Component for /staff/* ---

const Staff = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginScreen />} />
      <Route path="*" element={<StaffLayout />} />
    </Routes>
  );
};

// Simple Icons
const UsersIcon = ({size, className}: {size:number, className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const PhoneIcon = ({size, className}: {size:number, className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const AlertIcon = ({size, className}: {size:number, className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

export default Staff;