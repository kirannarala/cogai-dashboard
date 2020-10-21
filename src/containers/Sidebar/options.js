
const options = [
  // {
  //   key: 'mailbox',
  //   label: 'sidebar.email',
  //   leftIcon: 'ion-android-mail',
  // },
  // {
  //   key: 'dashboards',
  //   label: 'sidebar.dashboards',
  //   // leftIcon: 'ion-chatbubbles',
  // },
  {
    key: 'home',
    label: 'sidebar.home',
    leftIcon: 'home',
  },
  {
    key: 'analytics',
    label: 'sidebar.analytics',
    leftIcon: 'analytics',
  },
  {
    key: 'Notification',
    label: 'sidebar.notifications',
    leftIcon: 'notifications',
  },
  {
    key: 'settings',
    label: 'sidebar.settings',
    leftIcon: 'settings',
    children: [
      {
        key: 'zone',
        label: 'sidebar.zones',
      },
      {
        key: 'cameras',
        label: 'sidebar.cameras',
      },
      {
        key: 'notificationsettings',
        label: 'sidebar.notifications',
        // leftIcon: 'ion-map',
      },
      // {
      //   key: 'archives',
      //   label: 'sidebar.archives',
      //   // leftIcon: 'ion-map',
      // },
      // {
      //   key: 'entrance',
      //   label: 'sidebar.entrance',
      // },
      // {
      //   key: 'cafeteria',
      //   label: 'sidebar.cafeteria',
      // },
      // {
      //   key: 'assembly',
      //   label: 'sidebar.assemblyZone',
      // },
    ],
  },
  {
    key: 'Reports',
    label: 'sidebar.reports',
    leftIcon: '',
  },
  {
    key: 'user_summary',
    label: 'sidebar.summary',
    leftIcon: 'userSummary',
  },
];
export default options;
