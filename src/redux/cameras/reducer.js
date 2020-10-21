import actions from "./actions";

const initialState = {
  current_camera:'',
  current_cameraName: '',
  camera_list:[]
  }

const CamerasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ZONE_LIST:
      state = {
        ...state,
        camera_list: action.payload.camera_list,
      };
      break;
    case actions.SELECTED_CAMERA:
      state = {
        ...state,
        current_camera: action.payload.current_camera,
        current_cameraName: action.payload.current_cameraName
        // persona: action.payload.persona
      };
      return state;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default CamerasReducer;
