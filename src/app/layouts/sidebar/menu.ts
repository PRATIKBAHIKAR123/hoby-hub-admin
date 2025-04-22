import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  // {
  //   id: 1,
  //   label: 'MENUITEMS.MENU.TEXT',
  //   isTitle: true
  // },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'assets/images/sidebar/Activity 3.png',
    link: '/',
  },
  {
    id: 3,
    label: 'Programs Registered',
    icon: 'assets/images/sidebar/Document--menu-dark.png',
    link: '/programs-registered',
  },
  {
    id: 4,
    label: 'Student History',
    icon: 'assets/images/sidebar/Student-history.png',
    link: '/student-registered',
  },
  {
    id: 5,
    label: 'Progress Summary',
    icon: 'assets/images/sidebar/Progress-summary.png',
    link: '/progress-summary',
  },
  {
    id: 6,
    label: 'Attendance',
    icon: 'assets/images/sidebar/Attendance.png',
    link: '/',
  },
  {
    id: 7,
    label: 'Vendors (Super Admin Access)',
    icon: 'assets/images/sidebar/Attendance.png',
    link: '/vendors',
  },
 
];
