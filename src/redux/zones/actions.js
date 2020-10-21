const actions = {
    ZONE_LIST: "ZONE_LIST",
    SELECTED_ZONE: 'SELECTED_ZONE',
    USERS_LIST: "USERS_LIST",
    zoneList: (zone_list) => {
      return {
        type: actions.ZONE_LIST,
        payload: zone_list,
      };
    },
    updateZone: (current_zone, current_zoneName, current_liveVideo) => ({
      type: actions.SELECTED_ZONE,
      payload: { 
        current_zone , current_zoneName, current_liveVideo
      },
    }),
    userList: (users_list) => {
      return {
        type: actions.USERS_LIST,
        payload: users_list,
      };
    },
  };
  export default actions;
  