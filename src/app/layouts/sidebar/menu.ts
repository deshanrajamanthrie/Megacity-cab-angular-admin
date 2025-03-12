import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'pocket',
    link: '/',
  },
  {
    id: 3,
    label: 'Vehicle',
    icon: 'pocket',
    link: '/vehicle',
  },
  {
    id: 4,
    label: 'Driver',
    icon: 'pocket',
    link: '/driver',
  },
  {
    id: 5,
    label: 'Booking',
    icon: 'pocket',
    link: '/booking',
  },

];
