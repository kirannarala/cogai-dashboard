import React, { Component } from 'react';
import { Popover } from 'antd';
import { connect } from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import appManager from "../appManager";
import ZonesIcon from "../../image/zones_grey.png";
import CameraIcon from "../../image/cam_grey.png";
import notificationWhite from '../../image/notifications_white.png';

// const popupNotifications = [
//   {
//     id: 1,
//     name: 'David Doe',
//     notification:
//       'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
//   },
//   {
//     id: 2,
//     name: 'Navis Doe',
//     notification:
//       'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
//   },
//   {
//     id: 3,
//     name: 'Emanual Doe',
//     notification:
//       'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
//   },
//   {
//     id: 4,
//     name: 'Dowain Doe',
//     notification:
//       'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner',
//   },
// ];

var user_id = '';
var lastReadTime = '';
class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
      popupNotifications: [],
      zonesList: [],
      cameraList: [],
    };
  }
  getUnreadNotification =() => {
    appManager.getUnreadNotifications(user_id, lastReadTime)
    .then(data => {
        this.setState({
            popupNotifications: data
        })
    })
    const interval = setInterval(() => {
      appManager.getUnreadNotifications(user_id, lastReadTime)
      .then(data => {
          this.setState({
              popupNotifications: data
          })
      })
    }, 60 * 1000);
    return () => clearInterval(interval);
  }
  componentDidMount() {
    user_id = localStorage.getItem('id_');
    lastReadTime = localStorage.getItem('lastreadTime');
    if (this.props.zone_list.length > 0) {
      this.setState({
        zonesList: this.props.zone_list
      })
      if (this.props.camera_list.length > 0) {
        if (this.props.users_list.length > 0) {
          this.getUnreadNotification();
        }
        else {
          appManager.getUserList()
            .then(data => {
              this.setState({
                usersList: data
              })
              this.getUnreadNotification();
            })
        }
      }
      else {
        appManager.getCameraList().then(cameras => {
          this.setState({
            cameraList: cameras
          })
          if (this.props.users_list.length > 0) {
            this.getUnreadNotification();
          }
          else {
            appManager.getUserList()
              .then(data => {
                this.setState({
                  usersList: data
                })
                this.getUnreadNotification();
              })
          }
        })
      }
    }
    else {
      appManager.getZoneList().then(zones => {
        this.setState({
          zonesList: zones
        })
        if (this.props.camera_list.length > 0) {
          if (this.props.users_list.length > 0) {
            this.getUnreadNotification();
          }
          else {
            appManager.getUserList()
              .then(data => {
                this.setState({
                  usersList: data
                })
                this.getUnreadNotification();
              })
          }
        }
        else {
          appManager.getCameraList().then(cameras => {
            this.setState({
              cameraList: cameras
            })
            if (this.props.users_list.length > 0) {
              this.getUnreadNotification();
            }
            else {
              appManager.getUserList()
                .then(data => {
                  this.setState({
                    usersList: data
                  })
                  this.getUnreadNotification();
                })
            }
          })
        }
      })
    }
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
    var readTime = {
      'user_id': user_id,
      'data':{
        notification_popup_read_time: (new Date()).toISOString()
      }
    }
    localStorage.setItem('lastreadTime', (new Date()).toISOString());
    appManager.updateUser(readTime, "update_popup_notification_time")
      .then(data => {
      })
  }
  render() {
    const { customizedTheme } = this.props;
    const { popupNotifications, cameraList, zonesList } = this.state;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.notification" />
          </h3>
        </div>
        <div className="isoDropdownBody">
          {popupNotifications.map((notification, index) => {
            if(index < 20){
              const { violation_count, zone_id, camera_id, notification_sent_at, user_id, notification_action } = notification;
              const zone_name = zonesList.length > 0 ? zonesList.filter(zone_ => zone_.zone_id === zone_id)[0].zone_name : '';
              const camera_name = cameraList.length > 0 ? cameraList.filter(camera_ => camera_.camera_id === camera_id).length > 0 ? cameraList.filter(camera_ => camera_.camera_id === camera_id)[0].camera_name : '' : '';
              // const user_name = usersList.length > 0 ? usersList.filter(user_ => user_.user_id === user_id).length > 0 ? usersList.filter(user_ => user_.user_id === user_id)[0].first_name +' '+usersList.filter(user_ => user_.user_id === user_id)[0].last_name : '' : '';
              const sent_time = notification_sent_at ? appManager.getNotificationSentTime(notification_sent_at) : '';
              return (
                <div className="notification_body">
                  <div className="left_wrapper">
                    <div>
                      <h6>Violations</h6>
                      <span><img src={ZonesIcon} />Zone</span>
                      <span><img src={CameraIcon} />Camera</span>
                    </div>
                    <div>
                      <h6 className="danger">{violation_count}&nbsp;<span > in 10 seconds</span></h6>
                      <span className="pointer_" onClick={() => this.redirect_(zone_id)}>{zone_name}</span>
                      <span>{camera_name}</span>
                    </div>
                  </div>
                  {/* <p className="notification_text">Lady in black dress at Entrance coming close to person infront of her.</p> */}
                  <p className="notification_time"><i></i>{sent_time} </p>
                </div>)
            }
          }
          )}
          {popupNotifications.length == 0 && <div className="nodata_text">No new notification</div>}
        </div>
        <a className="isoViewAllBtn" href="/dashboard/Notification">
          <IntlMessages id="topbar.viewAll" />
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <img src={notificationWhite} className="notification_icon" />
          {popupNotifications.length > 0 && <span>{popupNotifications.length}</span>}
        </div>
      </Popover>
    );
  }
}

// export default connect(state => ({
// }))(TopbarNotification);


function mapStateToProps(state) {
  const {zone_list, users_list} = state.ZonesReducer;
  const {camera_list} = state.CamerasReducer;
  return {
    zone_list,
    users_list,
    camera_list,
    ...state.App,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
    // crossings
  };
}
export default connect(mapStateToProps)(TopbarNotification);