
import actions from './actions';


const initialState = {
  distance: 30,
  duration: 10,
  motion: 1,
  initialize: 50
};
const CameraSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VIOLATIONS_DISTANCE:
      state = {
        ...state,
        distance: action.payload.distance
      };
      break;
    case actions.VIOLATIONS_DURATION:
      state = {
        ...state,
        duration: action.payload.duration
      };
      break;
    case actions.MOTION:
      state = { ...state, motion: action.payload.motion };
      break;
    case actions.INTIALIZE_IN:
      state = { ...state, initalize: action.payload.initialize };
      break;
    case actions.SELECTED_CAMERA:
      state = { ...state, selectedCamera: action.payload.selectedCamera };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default CameraSettingsReducer;
