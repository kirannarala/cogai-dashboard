const actions = {
    CAMERA_LIST: "CAMERA_LIST",
    SELECTED_CAMERA: 'SELECTED_CAMERA',
    cameraList: (camera_list) => {
      return {
        type: actions.CAMERA_LIST,
        payload: camera_list,
      };
    },
    updateZone: (current_camera,current_cameraName) => ({
      type: actions.SELECTED_CAMERA,
      payload: { 
        current_camera , current_cameraName
      },
    }),
  };
  export default actions;
  