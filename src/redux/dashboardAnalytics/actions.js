const actions = {
  DASHBOARD_ANALYTICS: "DASHBOARD_ANALYTICS",
  USER_NAME: 'USER_NAME',
  CURRENT_TIME: 'CURRENT_TIME',
  SELECTEDSTAT: 'SELECTEDSTAT',
  VIDEO_LINKS: 'VIDEO_LINKS',
  SETANALYTICSLOADER: 'SETANALYTICSLOADER',
  TOTAL_VIOLATIONS: 'TOTAL_VIOLATIONS',
  TEN_MINS_VIOLATIONS: 'TEN_MINS_VIOLATIONS',
  dashboaredAnalytics: (dashboardAnalytics) => {
    return {
      type: actions.DASHBOARD_ANALYTICS,
      payload: dashboardAnalytics,
    };
  },
  updateUserName: (name, persona) => ({
    type: actions.USER_NAME,
    payload: { 
      name, persona 
    },
  }),
  updateTodayCurrentTime: (current_time) => ({
    type: actions.CURRENT_TIME,
    payload: { 
      current_time 
    },
  }),
  updateVideoLinks: (video_links) => ({
    type: actions.VIDEO_LINKS,
    payload: { 
      video_links 
    },
  }),
  updateAnalyticsLoader:(analytics_loader) => ({
    type: actions.SETANALYTICSLOADER,
    payload: { 
      analytics_loader 
    },
  }),
  updateSelectedDetails: (people, violations, crossings, video) => ({
    type: actions.SELECTEDSTAT,
    payload: { 
      people,
      violations, 
      crossings,
      video
    },
  }),
  updateTotalViolationsToday:(total_violation_today) =>({
    type: actions.TOTAL_VIOLATIONS,
    payload: {
      total_violation_today
    }
  }),
  updateTenMinsViolations:(violations_10min) =>({
    type: actions.TEN_MINS_VIOLATIONS,
    payload: {
      violations_10min
    }
  })
};
export default actions;
