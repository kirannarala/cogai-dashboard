import {
    SELECTED_ZONE
} from "./actionTypes";

const initialState = {
    zone: 0,
};

const ZoneSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED_Zone:
            state = {
                ...state,
                zone: action.payload.zone
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
};

export default ZoneSettingsReducer;
