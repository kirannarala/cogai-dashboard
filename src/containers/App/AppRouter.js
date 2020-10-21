import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  // {
  //   path: '',
  //   component: asyncComponent(() => import('../Widgets/index.js')),
  // },
  {
    path: '',
    component: asyncComponent(() => import('../Dashboard/dashboard')),
  },{
    path: 'Notification',
    component: asyncComponent(() => import('../Notifications/notification')),
  },{
    path: 'analytics',
    component: asyncComponent(() => import('../Analytics/analytics')),
  },
  {
    path: 'analytics/:id',
    component: asyncComponent(() => import('../Analytics/analytics')),
  },{
    path: 'user_summary',
    component: asyncComponent(() => import('../Users/userSummary')),
  },{
    path: 'cameras',
    component: asyncComponent(() => import('../Settings/Camera/cameras')),
  },{
    path: "cameras/:id",
    component: asyncComponent(() => import("../Settings/Camera/cameras")),
    exact: true,
  },{
    path: 'notificationsettings',
    component: asyncComponent(() => import('../Settings/Notification/Notificationsettings')),
  },
  {
    path: 'home',
    component: asyncComponent(() => import('../Home/home')),
  },
  {
    path: 'dashboards',
    component: asyncComponent(() => import('../Dashboard/dashboard')),
  },
  {
    path: "zone/:id",
    component: asyncComponent(() => import("../Settings/Zone/zone")),
    exact: true,
  },
  {
    path: "zone",
    component: asyncComponent(() => import("../Settings/Zone/zone")),
    exact: true,
  },
  {
    path: "reports",
    component: asyncComponent(() => import("../Reports/reports")),
    exact: true,
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
