import actions from "./actions";

const initialState = {
  dashboardAnalytics: {
    num_zones: 0,
    num_cameras: 0,
    num_people: 0,
  },
  video_links:[],
  analytics_loader: "false",
  video:'https://cog-ai.s3.amazonaws.com/shop_1.mp4',
  people:'--',
  violations: '--',
  total_violation_today: '0',
  violations_10min: '0',
  crossings: 32,
  current_time:new Date(),
  name: localStorage.getItem('name') && localStorage.getItem('name') !== "undefined" ? localStorage.getItem('name') : '',
  persona: localStorage.getItem('persona') ? localStorage.getItem('persona') : '',
};

const DashboardAnalyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DASHBOARD_ANALYTICS:
      state = {
        ...state,
        dashboardAnalytics: action.payload.dashboardAnalytics,
      };
      break;
      case actions.USER_NAME:
      state = {
        ...state,
        name: action.payload.name,
        persona: action.payload.persona
      };
      return state;
      // case actions.SELECTED_VIDEO:
      // state = {
      //   ...state,
      //   video: action.payload.video,
      //   // persona: action.payload.persona
      // };
      return state;
      case actions.CURRENT_TIME:
      state = {
        ...state,
        current_time: action.payload.current_time,
        // persona: action.payload.persona
      };
      return state;
    case actions.SELECTEDSTAT:
      state = {
        ...state,
        people: action.payload.people,
        violations: action.payload.violations,
        crossings: action.payload.crossings,
        video: action.payload.video
        // persona: action.payload.persona
      };
      return state;
    case actions.VIDEO_LINKS:
      state = {
        ...state,
        video_links: action.payload.video_links,
        // persona: action.payload.persona
      };
      return state;
    case actions.SETANALYTICSLOADER:
        state = {
          ...state,
          analytics_loader: action.payload.analytics_loader,
          // persona: action.payload.persona
        };
        return state;
        case actions.TOTAL_VIOLATIONS:
        state = {
          ...state,
          total_violation_today: action.payload.total_violation_today,
          // persona: action.payload.persona
        };
        return state;
        case actions.TEN_MINS_VIOLATIONS:
        state = {
          ...state,
          violations_10min: action.payload.violations_10min
          // persona: action.payload.persona
        };
        return state;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default DashboardAnalyticsReducer;
