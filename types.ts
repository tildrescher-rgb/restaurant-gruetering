export interface MenuItem {
  category: string;
  items: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
}

export interface EventItem {
  date: string;
  title: string;
  description: string;
}

export enum Page {
  HOME = '/',
  RESERVATION = '/reservation',
  MENU = '/menu',
  LOCATION = '/location',
  EVENTS = '/events',
  IMPRINT = '/imprint',
  TERMS = '/terms',
  STAFF = '/staff'
}

// --- Reservation System Types ---

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'finished' | 'cancelled' | 'no-show';
export type TableArea = 'main' | 'window' | 'garden' | 'bar';

export interface Table {
  id: string;
  name: string;
  capacity: number;
  minCapacity: number;
  area: TableArea;
  isActive: boolean;
  x?: number; // For visual editor
  y?: number; // For visual editor
}

export interface Reservation {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  partySize: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  status: ReservationStatus;
  tableId?: string; // Assigned table
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export interface StaffUser {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'service';
  pin: string; // Hashed in real app, plain for demo
}

export interface SystemState {
  reservations: Reservation[];
  tables: Table[];
  logs: AuditLogEntry[];
  currentUser: StaffUser | null;
}
