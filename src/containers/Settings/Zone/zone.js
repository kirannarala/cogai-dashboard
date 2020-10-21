import React, { Component } from "react";
import { Row, Col } from "antd";

import Slider from "react-rangeslider";
import { connect } from "react-redux";
import "react-rangeslider/lib/index.css";

import basicStyle from "../../../settings/basicStyle";
import Card from "../../Uielements/Card/card.style";
import ZoneStyleWrapper from "./zone.style";
import Spin from "../../../helpers/spin.style";
import Input from "../../../components/uielements/input";
import { notification } from "../../../components";
import Form from '../../../components/uielements/form';
import VideoPlayer from "../../../components/VideoPlayer/videoPlayer";
import { store } from "../../../redux/store";
import violations from '../../../redux/social-distance/actions';
import appManager from "../../appManager";
import Button from "../../../components/uielements/button";
import Add from "../../../image/add.svg";
import PopconfirmWrapper from '../../Feedback/Popconfirm/popconfirm.style';
import Popconfirms from '../../../components/feedback/popconfirm';
import Modals from "../../../components/feedback/modal";
import WithDirection from "../../../settings/withDirection";
import ModalStyle from "../../Feedback/Modal/modal.style";
import "./custommodal.css";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);


const {
  violationDistance
} = violations;

const Popconfirm = props => (
  <PopconfirmWrapper>
    <Popconfirms {...props} />
  </PopconfirmWrapper>
);

var editable = false;
const present_zoneId = window.location.href.split(':');
class Zone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      violation_Distance: 30,
      violationDuration: 10,
      motion: 0.1,
      initializein: 2,
      cameras: [],
      // zoneId: this.props.match.params.id.replace(':', ''),
      zoneId: '',
      selectedZone_id: '',
      selectedZone_name: '',
      selectedViolationDuration: 0,
      selectedViolationDistance: 0,
      externalData: null,
      ZoneName: '',
      zonesList: [],
      searchedZoneList: [],
      showSearchList: false,
      loader: false,
      detailsLoader: false,
      disable: true,
      zonesListLoader: false,
      newZone_name: '',
      newZone_violationDuration: 0,
      newZone_violationDistance: 0,
      zoneNameError: '',
      searchValue: '',
      noDataText: ''
    };
  }
  getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  }
  componentDidMount() {
    editable = localStorage.getItem('persona') ? (localStorage.getItem('persona')).toLowerCase().includes('admin') : false;
    this.getZoneList();
  }
  close_popup = () => {
    this.setState({
      visible: false,
      newZone_name: '',
      newZone_violationDistance: '',
      newZone_violationDuration: ''
    })
  }
  getZoneList = (mode) => {
    var storedZoneList = this.props.zone_list;
    this.setState({
      loader: true
    })
    if (mode == "fresh") {
      appManager.getZoneList().then((data) => {
        this.setState({
          zonesList: data,
          noDataText: "No zones"
        }, () => {
          if (data.length > 0) {
            var random = this.getRandom(0, data.length - 1);
            if (!present_zoneId[present_zoneId.length - 1].includes('/')) {
              this.getZoneDetails(present_zoneId[present_zoneId.length - 1]);
            }
            else {
              this.getZoneDetails(data[0].zone_id);
            }
          }
        })
        store.dispatch({
          type: "ZONE_LIST",
          payload: {
            zone_list: data
          },
        })
      });
    }
    else {
      if (storedZoneList == undefined || storedZoneList.length <= 0) {
        appManager.getZoneList().then((data) => {
          this.setState({
            zonesList: data,
          }, () => {
            if (data.length > 0) {
              var random = this.getRandom(0, data.length - 1);
              if (!present_zoneId[present_zoneId.length - 1].includes('/')) {
                this.getZoneDetails(present_zoneId[present_zoneId.length - 1]);
              }
              else {
                this.getZoneDetails(data[0].zone_id);
              }
            }
          })
          store.dispatch({
            type: "ZONE_LIST",
            payload: {
              zone_list: data
            },
          })
        });
      }
      else {
        this.setState({
          zonesList: storedZoneList,
        }, () => {
          if (storedZoneList.length > 0) {
            var random = this.getRandom(0, storedZoneList.length - 1);
            if (!present_zoneId[present_zoneId.length - 1].includes('/')) {
              this.getZoneDetails(present_zoneId[present_zoneId.length - 1]);
            }
            else {
              this.getZoneDetails(storedZoneList[0].zone_id);
            }
          }
        })
      }
    }
  }
  getZoneDetails = (id) => {
    appManager.getZoneDetails(id).then((data) => {
      const settings = (data.length > 0 && data[0].settings) ? data[0].settings : '';
      this.setState({
        selectedZone_id: id,
        selectedZone_name: data.length > 0 ? data[0].zone_name : '',
        selectedViolationDistance: settings ? settings.violation_distance ? settings.violation_distance : 0 : 0,
        selectedViolationDuration: settings ? settings.violation_duration ? settings.violation_duration : 0 : 0,
        zoneId: id,
        violation_Distance: settings ? settings.violation_distance ? settings.violation_distance : 0 : 0,
        violationDuration: settings ? settings.violation_duration ? settings.violation_duration : 0 : 0,
        motion: settings ? settings.motion ? settings.motion : 0 : 0,
        initializein: settings ? settings.initialize_in ? settings.initialize_in : 0 : 0,
        cameras: data.length > 0 && data[0].cameras ? data[0].cameras : [],
        ZoneName: data.length > 0 ? data[0].zone_name : '',
        detailsLoader: false,
        loader: false
      })
    });

  }
  handleZoneNameChange = (e) => {
    this.setState({ selectedZone_name: e.target.value });
  }
  handleNewZoneNameChange = (e) => {
    this.setState({ newZone_name: e.target.value });
  }
  onSelectZone = (id) => {
    this.setState({ detailsLoader: true, disable: true, selectedZone_id: id });
    this.getZoneDetails(id);
    // this.getCameraDetails(id);
  }
  handleZoneSettings = () => {
    if (this.state.disable) {
      this.setState({
        disable: false
      })
    }
    else {
      this.UpdateZoneDetails_();
    }
  }


  UpdateZoneDetails_ = () => {
    this.setState({ loader: true });
    var zone_obj = {
      "zone_id": this.state.selectedZone_id,
      "data": {
        "zone_name": this.state.selectedZone_name,
        "settings": {
          "violation_distance": this.state.selectedViolationDistance,
          "violation_duration": this.state.selectedViolationDuration,
        }
      }
    };
    appManager.updateZoneDetails(zone_obj).then(result => {
      this.setState({
        disable: true,
        loader: false
      })
      this.getZoneList('fresh');
      notification('success', 'Zone is updated');
    })
  }

  createZone = () => {
    const { newZone_name, newZone_violationDistance, newZone_violationDuration } = this.state;
    if (newZone_name.length == 0) {
      this.setState({
        zoneNameError: true
      })
    }
    else {
      this.setState({ loader: true });
      var zone_obj = {
        "zone_name": newZone_name,
        "settings": {
          "violation_distance": newZone_violationDistance,
          "violation_duration": newZone_violationDuration
        }
      }
      this.close_popup();
      appManager.createZone(zone_obj).then(result => {
        if (result.status === 200) {
          if (result.data) {
            notification('success', 'Zone is Added');
            this.getZoneList('fresh');
          }
        }
      })
    }
  }
  handleDelete = () => {
    this.setState({
      loader: true
    })
    var self = this;
    appManager.deleteZone(self.state.selectedZone_id).then(zone => {
      notification('success', 'Zone is deleted');
      self.getZoneList('fresh');
    })
  }
  onSearchTextChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  searchByZoneName = (e) => {
    e.preventDefault();
    const self = this;
    if (self.state.searchValue.length > 0) {
      this.setState({ zonesListLoader: true })
      appManager.getListOfZonesByName(self.state.searchValue).then(zones => {
        self.setState({
          zonesListLoader: false,
          showSearchList: true,
          searchedZoneList: zones,
          noDataText: "No results found"
        })
      }).catch((error) => {
          this.setState({
            zonesListLoader: false,
            noDataText: "No results found"
          })
        });
    }
    else{
      this.setState({
        showSearchList: false
      })
    }
  }
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { violation_Distance, violationDuration, motion, initializein, ZoneName, zonesList, searchedZoneList, showSearchList, selectedZone_id,
      selectedViolationDistance, selectedViolationDuration, selectedZone_name, detailsLoader, disable,
      newZone_name, newZone_violationDistance, newZone_violationDuration, zoneNameError, zonesListLoader, noDataText } = this.state;
    const {
      distance
    } = this.props;
    const list = showSearchList ? searchedZoneList : zonesList;
    return (
      <ZoneStyleWrapper>
        <div style={{ width: "100%" }}>
          <Spin spinning={this.state.loader} size="large">
            <div className="page_header">
              <h4>{ZoneName}</h4>
              <span>CogAi / Zones</span>
            </div>
            <div className="ant-section entance">
              <Row type="flex" gutter={0} justify="space-between">
                <Col lg={8} md={24} sm={24} xs={24} style={colStyle}>
                  <div className="Search_bar_wrapper">
                    <Form onSubmit={(e) => this.searchByZoneName(e)}>
                      <Input onChange={this.onSearchTextChange} value={this.state.searchValue} placeholder="Search" />
                      <Button htmlType="submit">Search</Button>
                    </Form>
                  </div>
                  <div className="dropDown_wrapper">
                    <div>
                      Zones
                    </div>
                    <Spin spinning={zonesListLoader}>
                      <div className="dropdown_wrapper">
                        <div className="dropdown">
                          {list.length > 0 && list.map((x, i) => {
                            return (
                              <div onClick={() => this.onSelectZone(x.zone_id)} className={x.zone_id === selectedZone_id ? "zone_wrapper active" : "zone_wrapper"}>
                                <div>
                                  {x.zone_name}
                                </div>
                              </div>

                            );
                          })}
                          {list.length > 0 && editable && <span> <img className="add_img" onClick={() => this.setState({ visible: true })} src={Add} /></span>}

                        </div>
                        {list.length == 0 && <div className="no_data_text">{noDataText}</div>}
                      </div>
                    </Spin>
                  </div>
                </Col>
                <Col lg={16}>

                  <Spin spinning={detailsLoader}>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                      <div className="btn_Wrapper">
                        {editable && <div className="inputWrapper"><Input disabled={disable} value={selectedZone_name} onChange={this.handleZoneNameChange} /><span>Name: </span></div>}
                        {editable && <div>
                          <Button type="primary" onClick={this.handleZoneSettings}>{disable ? 'Edit' : 'Save'}</Button>
                          <Popconfirm
                            title="Are you sure, you want to delete this zone?"
                            placement="left"
                            okText="Yes"
                            cancelText="cancel"
                            onConfirm={this.handleDelete}>
                            <Button type="danger">Delete</Button>
                          </Popconfirm>
                        </div>}
                      </div>
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                      <Card className="card">
                        <div className="violationDistance">
                          {disable && <div className={editable ? "overlay_" : "overlay_ pointer"}></div>}
                          <h3>Violations distance, in meters</h3>

                          <Slider
                            value={selectedViolationDistance}
                            max={3}
                            min={0}
                            step={0.1}
                            orientation="horizontal"
                            tooltip={true}
                            handleLabel={''+selectedViolationDistance}
                            onChange={(value) => {
                              this.setState({
                                selectedViolationDistance: value.toFixed(1),
                              });
                            }}
                          />
                          <span className="stRange">0</span>
                          <span className="enRange">3</span>
                        </div>

                        <div className="violationDistance">
                          {disable && <div className={editable ? "overlay_" : "overlay_ pointer"}></div>}
                          <h3>Violation duration, in secs</h3>

                          <Slider
                            value={selectedViolationDuration}
                            max={60}
                            min={0}
                            step={1}
                            orientation="horizontal"
                            tooltip={true}
                            handleLabel={''+selectedViolationDuration}
                            onChange={(value) => {
                              this.setState({
                                selectedViolationDuration: value,
                              });
                            }}
                          />
                          <span className="stRange">0</span>
                          <span className="enRange">50</span>
                        </div>
                      </Card>
                    </Col>
                    <Col lg={24} md={16} sm={16} xs={24} style={colStyle}>
                      <Row type="flex" gutter={20} justify="space-between">
                        {this.state.cameras && this.state.cameras.map((camera, index) => {
                          const { camera_link, camera_name, camera_id } = camera;
                          return (
                            <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
                              <Card className="card">
                                <VideoPlayer key={JSON.stringify(camera_id)} history={this.props.history} title={camera_name} parent={"zone"} video={camera_link} id={camera_id} zone_id={selectedZone_id} disable={disable} />
                              </Card>
                            </Col>
                          )
                        })}
                      </Row>
                    </Col>
                    <Modal
                      visible={this.state.visible}
                      title="Add a new Zone"
                      onCancel={this.close_popup}
                      className="zone_popup"
                      width={450}
                      footer={[
                        <Button key="back" size="large" onClick={this.close_popup}>
                          Cancel
                          </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          size="large"
                          onClick={this.createZone}
                        >
                          Save
                          </Button>,
                      ]}
                    >
                      <div className="new_form_popup">
                        <Row style={rowStyle} gutter={0} justify="start">
                          <Col lg={24} md={12} sm={24} xs={24} style={colStyle}>
                            <div className="box_">
                              <label>Zone Name</label>
                              <Input name="new_zone_name" placeholder="Enter zone name" className="inputFieldWrapper" value={newZone_name} onChange={this.handleNewZoneNameChange} />
                              {zoneNameError && <span className="error_message">Enter zone name</span>}
                            </div>
                            <div className="violationDistance">
                              <h3>Violations distance, in feet</h3>

                              <Slider
                                value={newZone_violationDistance}
                                max={3}
                                min={0}
                                step={0.1}
                                orientation="horizontal"
                                tooltip={true}
                                handleLabel={''+newZone_violationDistance}
                                onChange={(value) => {
                                  this.setState({
                                    newZone_violationDistance: value.toFixed(1),
                                  });
                                }}
                              />
                              <span className="stRange">0</span>
                              <span className="enRange">3</span>
                            </div>

                            <div className="violationDistance">
                              <h3>Violation duration, in secs</h3>

                              <Slider
                                value={newZone_violationDuration}
                                max={60}
                                min={0}
                                step={1}
                                orientation="horizontal"
                                tooltip={true}
                                handleLabel={''+newZone_violationDuration}
                                onChange={(value) => {
                                  this.setState({
                                    newZone_violationDuration: value,
                                  });
                                }}
                              />
                              <span className="stRange">0</span>
                              <span className="enRange">50</span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Modal>
                  </Spin>
                </Col>
              </Row>
            </div>
          </Spin>
        </div>
      </ZoneStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  const {
    distance
  } = state.CameraSettingsReducer;
  const { zone_list } = state.ZonesReducer
  return {
    distance, zone_list
  };
}
export default connect(mapStateToProps, {
  violations,
})(Zone);
