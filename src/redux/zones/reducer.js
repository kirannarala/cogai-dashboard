import actions from "./actions";

const initialState = {
  current_zone:'8085e255-8998-475c-8b09-5781f46c2092',
  current_zoneName: 'Main Entrance',
  zone_list:[],
  users_list:[],
  current_liveVideo: '',
  }

const ZonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ZONE_LIST:
      state = {
        ...state,
        zone_list: action.payload.zone_list,
      };
      break;
    case actions.SELECTED_ZONE:
      state = {
        ...state,
        current_zone: action.payload.current_zone,
        current_zoneName: action.payload.current_zoneName,
        current_liveVideo: action.payload.current_liveVideo,
        // persona: action.payload.persona
      };
      return state;
      case actions.USERS_LIST:
        state = {
          ...state,
          users_list: action.payload.users_list,
        };
        break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ZonesReducer;
