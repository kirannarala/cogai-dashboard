
const violations = {
  VIOLATIONS_DISTANCE : "VIOLATIONS_DISTANCE",
  VIOLATIONS_DURATION : "VIOLATIONS_DURATION",
  MOTION : "MOTION",
  INTIALIZE_IN : "INTIALIZE_IN",
  SELECTED_CAMERA : "SELECTED_CAMERA",
  SELECTED_ZONE : "SELECTED_ZONE",
  violationDistance : distance => {
    return {
      type: violations.VIOLATIONS_DISTANCE,
      payload: distance
    };
  },
  violationDuration : duration => {
    return {
      type: violations.VIOLATIONS_DURATION,
      payload: duration
    };
  },
  motion : motionvalue => {
    return {
      type: violations.MOTION,
      payload: motionvalue
    };
  },
  intializeIn : intialize => {
    return {
      type: violations.INTIALIZE_IN,
      payload: intialize
    };
  }
}
export default violations;
