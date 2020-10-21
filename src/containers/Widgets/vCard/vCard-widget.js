import React, { Component } from 'react';
import { VCardWidgetWrapper } from './style';
import authAction from '../../../redux/auth/actions';
import appManager from "../../appManager";
import { connect } from "react-redux";
// import userpic from '../../../image/profileimage.png';

class VCardWidget extends Component {
  render() {
    const { src, alt, title, description, children, style, name, persona } = this.props;
    return (
      <VCardWidgetWrapper className="isoVCardWidgetWrapper" style={style}>
        <div className={src !== '' ? "isoVCardImage" : "isoVCardImage initials_wrapper"}>
          {/* {src !== '' ? <img src={src} alt={alt} /> :  */}
            <span className="initials">{appManager.getInitials(this.props.name)}</span>
          {/* } */}
          {/* <img src={userpic} alt={alt} />  */}
        </div>

        <div className="isoVCardBody">
          <h3 className="isoName">{name}</h3>
          <span className="isoDesgTitle">{persona}</span>

          {/* <p className="isoDescription">{description}</p>

          <div className="isoWidgetSocial">{children}</div> */}
        </div>
      </VCardWidgetWrapper>
    );
  }
}
function mapStateToProps(state) {
  const { name, persona } = state.DashboardAnalyticsReducer;
  return {
    name, persona
  };
}
export default connect(mapStateToProps)(VCardWidget);