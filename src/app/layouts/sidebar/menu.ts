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
    label: 'Ads',
    icon: 'assets/images/sidebar/browser.png',
    link: '/activities',
  },
  // {
  //   id: 4,
  //   label: 'Student History',
  //   icon: 'assets/images/sidebar/Student-history.png',
  //   link: '/student-registered',
  // },
  // {
  //   id: 5,
  //   label: 'Progress Summary',
  //   icon: 'assets/images/sidebar/Progress-summary.png',
  //   link: '/progress-summary',
  // },
  // {
  //   id: 6,
  //   label: 'Attendance',
  //   icon: 'assets/images/sidebar/Attendance.png',
  //   link: '/',
  // },
  // {
  //   id: 7,
  //   label: 'Vendors (Super Admin Access)',
  //   icon: 'assets/images/sidebar/user-pen.png',
  //   link: '/vendors',
  // },
  // {
  //   id: 4,
  //   label: 'Users',
  //   icon: 'assets/images/sidebar/Student-history.png',
  //   link: '/users',
  // },
    {
    id: 8,
    label: 'Masters',
    icon: 'assets/images/sidebar/ballot.png',
    //link: '/',
    subItems: [
        {
    id: 1,
    parentId: 8,
    label: 'Categories',
    icon: 'assets/images/sidebar/Activity 3.png',
    link: '/masters/categories',
  },
          {
    id: 2,
    parentId: 9,
    label: 'sub categories',
    icon: 'assets/images/sidebar/Activity 3.png',
    link: '/masters/sub-categories',
  },
    ]
  },
  {
    id: 9,
    label: 'Terms & Conditions',
    icon: 'assets/images/sidebar/Document--menu-dark.png',
    link: '/terms-and-policies/terms-and-conditions',
  },
  {
    id: 10,
    label: 'Privacy Policy',
    icon: 'assets/images/sidebar/Document--menu-dark.png',
    link: '/terms-and-policies/privacy-policies',
  },
 
];
