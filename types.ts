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
  TERMS = '/terms'
}