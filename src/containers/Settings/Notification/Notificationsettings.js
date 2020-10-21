import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/uielements/button";
import Spin from "../../../helpers/spin.style";
import NotificationSettingsStyleWrapper from "./Notificationsettings.style";
import "react-rangeslider/lib/index.css";
import { Row, Col } from "antd";
import basicStyle from "../../../settings/basicStyle";
import appManager from "../../appManager";
import Select, { SelectOption } from "../../../components/uielements/select";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import SMS from "../../../image/sms_black.png";
import Telegram from "../../../image/Telegram.png";
import PopconfirmWrapper from "../../Feedback/Popconfirm/popconfirm.style";
import Popconfirms from "../../../components/feedback/popconfirm";
import Modals from "../../../components/feedback/modal";
import ModalStyle, { ModalContent } from "../../Feedback/Modal/modal.style";
import WithDirection from "../../../settings/withDirection";
import "./Notificationsettings.css";
import { CheckboxGroup } from '../../../components/uielements/checkbox';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Option = SelectOption;
const NotificationOptions = [
  [SMS, "SMS"],
  [Telegram, "telegram"],
];
var NotificationAlertOptions = [];
for (let i = 0; i < NotificationOptions.length; i++) {
  NotificationAlertOptions.push(
    <Option key={NotificationOptions[i][1]}>
      <img width="32px" src={NotificationOptions[i][0]} />
    </Option>
  );
}

const Popconfirm = (props) => (
  <PopconfirmWrapper>
    <Popconfirms {...props} />
  </PopconfirmWrapper>
);

const notificationDefaultSettings = {
  user_id: "",
  filters: { min: 10, max: 40 },
  action: "SMS",
  zones: {}
};
var editable = false;
var user_ = '';
var user_name = '';
// const { dashboaredAnalytics } = actions;
class Notificationsettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usersList: [],
      notificationsettingsList: [],
      newSettings: [],
      camerasList: [],
      newcameraList: [],
      selectedCameras: '',
      newselectedCameras: '',
      zoneList: [],
      zone: '',
      loader: false,
      visible: false,
      cameraListLoader: false,
      newCameraListLoader: false,
      notificationDefaultSettings: notificationDefaultSettings,
      newSelectedZone: '',
      formEditable: false,
      selectUserError: false
    };
  }
  componentDidMount() {
    editable = localStorage.getItem('persona') ? (localStorage.getItem('persona')).toLowerCase().includes('admin') : false;
    user_ = localStorage.getItem('id_');
    user_name = localStorage.getItem('name');
    this.setState({
      loader: true,
    });
    this.getZoneList();
    if(!editable) {
      let list = this.state.notificationDefaultSettings;
      list.user_id = user_;
      this.setState({
        notificationDefaultSettings: list,
      });
    }
  }
  getZoneList = () => {
    this.setState({
      parentLoader: true
    })
    if (this.props.zone_list.length > 0) {
      this.setState({
        zoneList: this.props.zone_list,
        zone: this.props.zone_list[0].zone_id,
        newSelectedZone: this.props.zone_list[0].zone_id
      })
      if (this.props.users_list.length > 0) {
        this.getSettings();
      } else {
        appManager.getUserList().then((data) => {
          this.setState({
            usersList: data,
          });
          this.getSettings();
        });
      }
      // this.getCameraListByZone(this.props.zone_list[0].zone_id);
    }
    else {
      appManager.getZoneList().then(zones => {
        this.setState({
          zoneList: zones,
          zone: zones[0].zone_id,
          newSelectedZone: zones[0].zone_id,
        })
        if (this.props.users_list.length > 0) {
          this.getSettings();
        } else {
          appManager.getUserList().then((data) => {
            this.setState({
              usersList: data,
            });
            this.getSettings();
          });
        }
      })
    }
  }
  onZoneChange = (e, _id) => {
    this.getCameraListByZone(e, '', _id);
    const list = [...this.state.notificationsettingsList];
    list.filter((setting_) => setting_.notification_settings_id === _id)[0]["selectedZone"] = e;
    // list.selectedZone = e;
    this.setInputList(list);
  }
  onNewFormZoneChange = (e) => {
    this.getCameraListByZone(e, 'new');
    this.setState({
      newSelectedZone: e,
      // disable: true
    })
  }
  getCameraListByZone = (id, task, notification_id) => {
    appManager.getCameraList(id).then(cameras => {
      var formattedCamera = [];
      cameras.length > 0 && cameras.map(camera => {
        formattedCamera.push({ "label": camera.camera_name, "value": camera.camera_id });
      })
      if (task == "new") {
        this.setState({
          newcameraList: formattedCamera,
          newcameraListLoader: false
        })
      }
      else {
        const list = [...this.state.notificationsettingsList];
        if (notification_id) {
          list.filter((setting_) => setting_.notification_settings_id === notification_id)[0]["selectedCamerasbyZone"] = formattedCamera;
        }
        else {
          list.filter((setting_) => setting_["selectedCamerasbyZone"] = formattedCamera);
        }
        this.setInputList(list);
        this.setState({
          newcameraList: formattedCamera,
          camerasList: formattedCamera,
          cameraListLoader: false,
          newcameraListLoader: false
        })
      }
      // this.getCameraDetails(cameras[0].camera_id)
    })
  }
  getSettings = () => {
    appManager.getNotificationSettingsList().then((data) => {
      var notification = [];
      if (editable) {
        notification = data;
        notification.filter((setting_) => setting_["selectedZone"] = this.state.zone);
        notification.filter((setting_) => setting_["formEditable"] = false);
      }
      else {
        const filteredNotification = data.find(notification_ => notification_.user_id === user_);
        if(filteredNotification !== undefined){
          notification.push(filteredNotification );
          notification[0]["selectedZone"] = this.state.zone;
          notification[0]["formEditable"] = false;
        }
      }
      // notification.filter((setting_) => setting_.notification_settings_id === _id)[0]["selectedZone"] = e;
      // notification["selectedZone"] = this.state.zone;
      this.setState({
        notificationsettingsList: notification,
        loader: false,
      });
      this.getCameraListByZone(this.state.zoneList[0].zone_id);
    });
  };

  setSliderValue = (id, value) => {
    const list = [...this.state.notificationsettingsList];
    list.filter((setting_) => setting_._id === id)[0].filters[
      "min_num_of_violations"
    ] = value.min;
    list.filter((setting_) => setting_._id === id)[0].filters[
      "max_num_of_violations"
    ] = value.max;

    const newList = [...this.state.newSettings];
    const exists = newList.filter(
      (list) => list.notification_settings_id === id
    );
    if (exists.length > 0) {
      newList.filter(
        (setting) => setting.notification_settings_id === id
      )[0].data["max"] = value;
    } else {
      const array = {
        notification_settings_id: id,
        data: {
          max: value,
        },
      };
      newList.push(array);
    }
    this.setNewList(newList);
    this.setInputList(list);
  };
  setNewList = (newList) => {
    this.setState({
      newSettings: newList,
    });
  };
  setInputList = (list_) => {
    this.setState({
      notificationsettingsList: list_,
    });
  };
  onSelectChange = (id, value) => {
    const list = [...this.state.notificationsettingsList];
    list.filter((setting_) => setting_._id === id)[0]["action"] = value;
    const newList = [...this.state.newSettings];
    const exists = newList.filter(
      (list) => list.notification_settings_id === id
    );
    if (exists.length > 0) {
      newList.filter(
        (setting) => setting.notification_settings_id === id
      )[0].data["action"] = value;
    } else {
      const array = {
        notification_settings_id: id,
        data: {
          action: value,
        },
      };
      newList.push(array);
    }
    this.setInputList(list);
    this.setNewList(newList);
  };

  onUpdateHandler = (id, action, filters, zones) => {
    const list = [...this.state.notificationsettingsList];
    if(!(list.filter((setting_) => setting_.notification_settings_id === id)[0]["formEditable"])){
      list.filter((setting_) => setting_.notification_settings_id === id)[0]["formEditable"] = true;
    }
    else{
    this.setState({
      loader: true,
    });
    list.filter((setting_) => setting_.notification_settings_id === id)[0]["formEditable"] = false;
    appManager.updateNotificationSettings(id, action, filters, zones).then((data) => {
      if (data.status != 200) {
        console.log("something went wrong", data);
      }
      this.setState({
        loader: false,
      });
    });
    }
    this.setInputList(list);
  };

  onDeleteHandler = (id) => {
    console.log(id);
    this.setState({
      loader: true,
    });
    appManager.deleteNotificationSettings(id).then((data) => {
      if (data.status == 200) {
        var list = [...this.state.notificationsettingsList];
        list = list.filter((el) => el.notification_settings_id !== id);
        this.setState({
          notificationsettingsList: list,
        });
      }
      this.setState({
        loader: false,
      });
    });
  };

  onCreateHandler = () => {
    var self = this;
    let list = [...self.state.notificationsettingsList];
    if (self.state.notificationDefaultSettings.user_id) {
      this.setState({
        loader: true,
      });
      appManager
        .createNotificationSettings(self.state.notificationDefaultSettings)
        .then((data) => {
          if (data.status === 200) {
            data.data["selectedZone"] = self.state.zoneList[0].zone_id;
            self.getCameraListByZone(self.state.zoneList[0].zone_id, '', data.data.notification_settings_id);
            list.push(data.data);
          }
          self.setState({
            loader: false,
            notificationDefaultSettings: notificationDefaultSettings,
            visible: false,
            notificationsettingsList: list,
          });
        });
    }
    else{
      self.setState({
        selectUserError: true,
      })
    }
  };

  onCancelHandler = () => {
    const notificationResetDefaultSettings = {
      user_id: "",
      filters: { min: 10, max: 40 },
      action: "SMS",
      zones: {}
    };
    this.setState({
      visible: false,
      notificationDefaultSettings: notificationResetDefaultSettings
    });
  };

  handleSelectedCameras = (e, _id, zone_id) => {
    // this.setState({
    //   selectedCameras: e
    // })
    const list = [...this.state.notificationsettingsList];
    var zoneStatus = '';
    // Object.keys(list.filter(setting_ => setting_["notification_settings_id"] === _id)[0]["zones"]).map(key => key == zone_id ? list.filter(setting_ => setting_["notification_settings_id"] === _id)[0]["zones"][zone_id] = e : '');
    list.map((setting, index) => {
      if (setting["notification_settings_id"] === _id) {
        for (var i = 0; i < Object.keys(setting['zones']).length; i++) {
          if (Object.keys(setting['zones'])[i] == zone_id) {
            zoneStatus = "exists"
            break;
          } else {
            zoneStatus = "new"
          }
        }
      }
    })

    if (zoneStatus == "new") {
      list.filter(setting_ => setting_["notification_settings_id"] === _id ? setting_["zones"][zone_id] = e : '');
    }
    else {
      Object.keys(list.filter(setting_ => setting_["notification_settings_id"] === _id)[0]["zones"]).map(key => key == zone_id ? list.filter(setting_ => setting_["notification_settings_id"] === _id)[0]["zones"][zone_id] = e : '');
    }

    this.setInputList(list);
    // this.setNewList(newList);
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { notificationsettingsList, usersList, camerasList, newcameraList, zoneList, cameraListLoader, newcameraListLoader } = this.state;
    return (
      <NotificationSettingsStyleWrapper>
        <div className="_wrapper" style={{ width: "100%" }}>
          <Spin spinning={this.state.loader} size="large">
            <div className="page_header">
              <h4>Notifications Settings</h4>
              <span>CogAi / notification</span>
            </div>
            <Row style={rowStyle} gutter={0} justify="start">
              <Col lg={24} style={colStyle}>
                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 10px",
                    }}
                  >
                    <div className="header_">
                      <h2>Notifications</h2>
                      <p>Trigger at number of violations</p>
                    </div>
                    {editable && <Button
                      className="primary"
                      onClick={() => this.setState({ visible: true })}
                    >
                      Add
                  </Button>}
                  </div>
                </Col>
                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  {/* <Box subtitle={configs.MixBarChart.title}> */}
                  <div className="NotificationsSettings_wrapper">
                    <div className="body">
                      {notificationsettingsList &&
                        notificationsettingsList.map((setting) => {var cameras = [];
                          //   Object.keys(setting.zones).map((key, index) => {
                          //     // var seperateCameras = [];
                          //     setting.zones[key].length > 1 ? setting.zones[key].map(_id => cameras.push(_id)) : cameras.push(setting.zones[key][0]);

                          // })
                          const {
                            filters,
                            user_id,
                            action,
                            _id,
                            notification_settings_id,
                            zones,
                            selectedCamerasbyZone,
                            formEditable
                          } = setting;
                          const first_name =
                            usersList.length > 0
                              ? usersList.filter((user) => user.user_id === user_id).length > 0 ? usersList.filter((user) => user.user_id === user_id)[0].first_name : ''
                              : "";
                          const last_name =
                            usersList.length > 0
                              ? usersList.filter(
                                (user) => user.user_id === user_id).length > 0 ? usersList.filter((user) => user.user_id === user_id)[0].last_name : ''
                              : "";
                          const persona =
                            usersList.length > 0
                              ? usersList.filter(
                                (user) => user.user_id === user_id).length > 0 ? usersList.filter((user) => user.user_id === user_id)[0].persona : ''
                              : "";
                          const mobile_number =
                            usersList.length > 0
                              ? usersList.filter(
                                (user) => user.user_id === user_id).length > 0 ? usersList.filter((user) => user.user_id === user_id)[0].mobile_number : ''
                              : "";
                          const sliderValue = {
                            min: filters ? filters.min_num_of_violations : 10,
                            max: filters ? filters.max_num_of_violations : 40,
                          };
                          return (
                          usersList.filter((user) => user.user_id === user_id).length > 0 ? 
                            <div className="box_" key={user_id}>
                              <div className="title">
                                <div>
                                  <h3>{first_name + " " + last_name}</h3>
                                  <p>{persona}</p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    maxWidth: "200px",
                                    alignSelf: 'flex-start'
                                  }}
                                >
                                  <Button
                                    type="primary"
                                    style={{ marginRight: '5px' }}
                                    onClick={() =>
                                      this.onUpdateHandler(
                                        notification_settings_id,
                                        action,
                                        filters,
                                        zones
                                      )
                                    }
                                  >
                                    {formEditable ? 'Update' : 'Edit'}
                                </Button>

                                  <Popconfirm
                                    title="Are you sure, you want to delete this notification settings?"
                                    // trigger="click"
                                    placement="left"
                                    okText="Yes"
                                    cancelText="cancel"
                                    onConfirm={() =>
                                      this.onDeleteHandler(
                                        notification_settings_id
                                      )
                                    }
                                  >
                                    <Button type="danger">Delete</Button>
                                  </Popconfirm>
                                </div>
                              </div>
                              <div className="content">
                                <div>
                                  <InputRange
                                    maxValue={200}
                                    minValue={0}
                                    value={sliderValue}
                                    onChange={(value) => {
                                      this.setSliderValue(_id, value);
                                    }}
                                  />
                                </div>
                                <div>
                                  <label>Notification mode</label>
                                  <div style={{ display: "flex", marginTop: '10px' }}>
                                    <Select
                                      value={action}
                                      onChange={(e) => this.onSelectChange(_id, e)}
                                    >
                                      {NotificationAlertOptions}
                                    </Select>
                                    {editable && <span>
                                      Go to User Summary to edit phone number
                                  </span>}
                                  </div>
                                </div>
                                <div className="dropDown_wrapper">
                                  <div>
                                    <Select className="zone_dropdown" value={setting.selectedZone} name="zones" placeholder="Zones" onChange={(e) => this.onZoneChange(e, notification_settings_id)}>
                                      {zoneList.length > 0 && zoneList.map((zone, index) => {
                                        return (
                                          <Option key={zone.zone_id}>{zone.zone_name}</Option>
                                        )
                                      }
                                      )}
                                    </Select>
                                  </div>
                                  <Spin spinning={cameraListLoader}>
                                    <div className="dropdown_wrapper">
                                      <div className="dropdown">

                                        {setting.zones && selectedCamerasbyZone && selectedCamerasbyZone.length > 0 && <CheckboxGroup
                                          options={selectedCamerasbyZone}
                                          value={setting.zones[setting.selectedZone]}
                                          onChange={(e) => this.handleSelectedCameras(e, notification_settings_id, setting.selectedZone)}
                                        />}
                                        {selectedCamerasbyZone && selectedCamerasbyZone.length == 0 && <div className="camera"></div>}
                                      </div>
                                    </div>
                                  </Spin>
                                </div>
                                {!formEditable && <div className="overlay_"></div>}
                              </div>
                            </div>
                           : ''
                          )
                        })}
                      {notificationsettingsList.length === 0 && (
                        <div className="no_data_block"><Button type="primary"
                        onClick={() => this.setState({ visible: true})}
                      >
                        Add
                    </Button></div>
                      )}
                    </div>
                  </div>
                  {/* </Box> */}
                </Col>

                <Modal
                  className="notificationSettingsModel"
                  visible={this.state.visible}
                  title="Create Notification"
                  //onOk={this.oncCreateHandler}
                  onCancel={this.onCancelHandler}
                  footer={[
                    <Button
                      key="back"
                      size="large"
                      onClick={this.onCancelHandler}
                    >
                      Return
                  </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      size="large"
                      loading={this.state.loading}
                      onClick={this.onCreateHandler}
                    >
                      Submit
                  </Button>,
                  ]}
                >
                  <div className="notificationSettingsModel__body">
                    <div className="notificationSettingsModel__fields">
                      <label>{editable ? 'Select User' : <b>{user_name}</b>}</label>
                      {editable && <Select
                        className="selected_data"
                        value={this.state.notificationDefaultSettings.user_id}
                        placeholder="Select User"
                        onChange={
                          (e) => {
                            console.log("e >>>>", e);
                            var state = {
                              ...this.state.notificationDefaultSettings,
                            };
                            state.user_id = e;
                            this.setState({
                              selectUserError: false,
                              notificationDefaultSettings: state,
                            });
                          }
                          // this.hangleNotificationdropDownUpdate("cameraType", e)
                        }
                      >
                        {usersList.length > 0 &&
                          usersList.map((user, index) => {
                            return (
                              <Option
                                key={user.user_id}
                                name={user.first_name + " " + user.last_name}
                              >
                                {user.first_name + " " + user.last_name}
                              </Option>
                            );
                          })}
                      </Select>}
                      {this.state.selectUserError && <span className="errorMessage">please select user</span>}
                    </div>
                    <div className="notificationSettingsModel__fields">
                      <label>Select Range</label>
                      <InputRange
                        maxValue={200}
                        minValue={0}
                        value={this.state.notificationDefaultSettings.filters}
                        onChange={(value) => {
                          var state = {
                            ...this.state.notificationDefaultSettings,
                          };
                          state.filters = value;
                          this.setState({
                            notificationDefaultSettings: state,
                          });
                        }}
                      />
                    </div>
                    <div className="notificationSettingsModel__fields">
                      <label>Select Notification Mode</label>
                      <Select
                        className="selectAction"
                        value={this.state.notificationDefaultSettings.action}
                        onChange={
                          (e) => {
                            var state = {
                              ...this.state.notificationDefaultSettings,
                            };
                            state.action = e;
                            this.setState({
                              notificationDefaultSettings: state,
                            });
                          }
                          //(e) => this.onSelectChange(_id, e)
                        }
                      >
                        {NotificationAlertOptions}
                      </Select>
                    </div>
                    <div className="dropDown_wrapper">
                      <div>
                        <Select className="zone_dropdown" value={this.state.newSelectedZone} name="zones" placeholder="Zones" onChange={this.onNewFormZoneChange}>
                          {zoneList.length > 0 && zoneList.map((zone, index) => {
                            return (
                              <Option key={zone.zone_id}>{zone.zone_name}</Option>
                            )
                          }
                          )}
                        </Select>
                      </div>
                      <Spin spinning={newcameraListLoader}>
                        <div className="dropdown_wrapper">
                          <div className="dropdown">

                            <CheckboxGroup
                              options={newcameraList}
                              value={this.state.notificationDefaultSettings.zones[this.state.newSelectedZone]}
                              onChange={(value) => {
                                var state = {
                                  ...this.state.notificationDefaultSettings,
                                };
                                state.zones[this.state.newSelectedZone] = value;
                                this.setState({
                                  notificationDefaultSettings: state,
                                });
                              }
                              }
                            />
                            {newcameraList.length == 0 && <div className="camera"></div>}
                          </div>
                        </div>
                      </Spin>
                    </div>
                  </div>
                </Modal>

                {/* {this.state.visible && <div className="ant-modal-mask"></div>}
              {this.state.visible && (
                <div
                  style={{
                    position: "fixed",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    zIndex: "999999",
                    left: "0",
                    top: "0",
                    overflow: "auto",
                  }}
                >
                  <div className="new_form_popup">
                    <div className="address_popup_header">
                      <h1>Add a new camera</h1>{" "}
                      <span onClick={this.close_popup}></span>
                    </div>
                    <Row style={rowStyle} gutter={0} justify="start">
                      <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                        <div className="box_">
                          <label>Type of Camera</label>
                          <Select
                            className="selected_data"
                            onChange={(e) =>
                              this.dropDownUpdate("cameraType", e)
                            }
                          >
                            <Option key="Bullet">Bullet</Option>
                            <Option key="Wireless">Wireless</Option>
                            <Option key="Dome">Dome</Option>
                          </Select>
                          
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )} */}
              </Col>

              {/* <Col lg={8} md={24} sm={24} xs={24} style={colStyle}>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  <div className="header_">
                  </div>
                </Col>
              </Col> */}
            </Row>
          </Spin>
        </div>
      </NotificationSettingsStyleWrapper>
    );
  }
}
function mapStateToProps(state) {
  const { users_list, zone_list } = state.ZonesReducer;
  return {
    users_list,
    zone_list
    // crossings
  };
}
export default connect(mapStateToProps)(Notificationsettings);
