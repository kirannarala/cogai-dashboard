import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../../components/uielements/input";
import Button from "../../../components/uielements/button";
import Spin from "../../../helpers/spin.style";
import CameraStyleWrapper from "./cameras.style";
import { Row, Col } from "antd";
import basicStyle from "../../../settings/basicStyle";
import appManager from "../../appManager";
import Select, { SelectOption } from '../../../components/uielements/select';
import Add from "../../../image/add.svg";
import PopconfirmWrapper from '../../Feedback/Popconfirm/popconfirm.style';
import Popconfirms from '../../../components/feedback/popconfirm';
import { notification } from "../../../components";
import Modals from "../../../components/feedback/modal";

import WithDirection from "../../../settings/withDirection";
import ModalStyle, { ModalContent } from "../../Feedback/Modal/modal.style";
import "./custommodal.css";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const Popconfirm = props => (
    <PopconfirmWrapper>
        <Popconfirms {...props} />
    </PopconfirmWrapper>
);
const Option = SelectOption;
const camerasettings = {
    distance: 10,
    duration: 10,
    initialize: 50,
    motion: 1,
};

const zonesettings = {
    zone: 0,
};
const hours_difference = 2;
const interval = 60
var count = 0;
var total = 1;
var editable = false;
class Cameras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            zone: '',
            zoneList: [],
            camerasList: [],
            disable: true,
            parentLoader: false,
            detailsLoader: false,
            cameraListLoader: false,
            selectedCamera_name: '',
            selectedCamera_zone: '',
            selectedCamera_ipaddress: '',
            selectedCamera_cameratype: '',
            selectedCamera_resolution: '',
            selectedCamera_id: '',
            newCamera_ipaddress: '',
            newCamera_name: '',
            newCamera_cameratype: "Bullet",
            newCamera_zone: '',
            newCamera_resolution: '720p',
            previouszone: '',
            confirmationPopup: false,
            cameraNameError: false,
            cameraIpaddressError: false,
            searchValue: '',
            noDataText: ''
        }
        this.UpdateCameraDetails = this.UpdateCameraDetails.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        editable = localStorage.getItem('persona') ? (localStorage.getItem('persona')).toLowerCase().includes('admin') : false;
        if (this.props.location.state === undefined) {
            this.getZoneList("default");
        }
        else {
            this.getZoneList("selected", this.props.location.state.camera_id, this.props.location.state.zone_id);
        }
    }
    getZoneList = (status, cameraId, zoneId) => {
        this.setState({
            parentLoader: true
        })
        if (this.props.zone_list.length > 0) {
            this.setState({
                zoneList: this.props.zone_list,
                zone: status === "default" ? this.props.zone_list[0].zone_id : zoneId
            })
            this.getCameraListByZone(status === "default" ? this.props.zone_list[0].zone_id : zoneId, cameraId);
        }
        else {
            appManager.getZoneList().then(zones => {
                this.setState({
                    zoneList: zones,
                    zone: status === "default" ? zones[0].zone_id : zoneId
                })
                this.getCameraListByZone(status === "default" ? zones[0].zone_id : zoneId, cameraId);
            })
        }
    }
    onZoneChange = (e) => {
        this.getCameraListByZone(e);
        this.setState({
            zone: e,
            cameraListLoader: true,
            disable: true
        })
    }
    getCameraListByZone = (id, camera_id) => {
        count = 0;
        total = 1;
        this.setState({
            newCamera_zone: id
        })
        appManager.getCameraList(id).then(cameras => {
            this.setState({
                camerasList: cameras,
                cameraListLoader: false,
                noDataText: 'No cameras'
            })
            if(cameras.length > 0)
            this.getCameraDetails(camera_id === undefined ? cameras[0].camera_id : camera_id);
            else{
                this.setState({
                    selectedCamera_id: '',
                    selectedCamera_name: '',
                    selectedCamera_zone: id,
                    previouszone: id,
                    selectedCamera_ipaddress: '',
                    selectedCamera_cameratype: 'Bullet',
                    selectedCamera_resolution: '720p',
                    detailsLoader: false,
                    parentLoader: false
                })
            }
        })
    }
    onSelectCamera = (id) => {
        this.setState({ detailsLoader: true, disable: true });
        this.getCameraDetails(id);
    }
    getCameraDetails = (id) => {
        appManager.getCameraDetails(id).then(cameraDetails => {
            this.setState({
                selectedCamera_id: cameraDetails[0].camera_id,
                selectedCamera_name: cameraDetails[0].camera_name,
                selectedCamera_zone: cameraDetails[0].zone.zone_id,
                previouszone: cameraDetails[0].zone.zone_id,
                selectedCamera_ipaddress: cameraDetails[0].raw_camera_link,
                selectedCamera_cameratype: cameraDetails[0].camera_type,
                selectedCamera_resolution: cameraDetails[0].resolution,
                detailsLoader: false,
                parentLoader: false
            })
        })
    }
    handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'camera_name':
                this.setState({
                    selectedCamera_name: value
                })
                break;
            case 'ip_address':
                this.setState({
                    selectedCamera_ipaddress: value
                })
                break;
            case 'new_camera_name':
                this.setState({
                    newCamera_name: value,
                    cameraNameError: false
                })
                break;
            case 'new_ip_address':
                this.setState({
                    newCamera_ipaddress: value,
                    cameraIpaddressError: false
                })
                break;
            default: break;
        }
    }
    dropDownUpdate = (name, e) => {
        switch (name) {
            case 'zone':
                this.setState({ selectedCamera_zone: e });
                break;
            case 'resolution':
                this.setState({ selectedCamera_resolution: e });
                break;
            case 'cameraType':
                this.setState({ selectedCamera_cameratype: e });
                break;
            case 'new_zone':
                this.setState({ newCamera_zone: e });
                break;
            case 'new_resolution':
                this.setState({ newCamera_resolution: e });
                break;
            case 'new_cameraType':
                this.setState({ newCamera_cameratype: e });
                break;
                break;
            default: break;
        }
    }
    handleCameraSettings = () => {
        if (this.state.disable) {
            this.setState({
                disable: false
            })
        }
        else {
            this.UpdateCameraDetails();
        }
    }
    updateZone = (id, cameras) => {
        var data_ = {
            "zone_id": id,
            "data": {
                "cameras": cameras
            }
        }
        appManager.updateZoneDetails(data_).then(result => {
            this.setState({
                parentLoader: false,
                disable: true
            })
            count++;
            if (total === count) {
                this.getZoneList('default');
            }
        })
    }
    createCamera = () => {
        const { newCamera_name, newCamera_ipaddress, newCamera_resolution, newCamera_cameratype, newCamera_zone } = this.state;
        if (newCamera_name.length == 0 || newCamera_ipaddress.length == 0) {
            if (newCamera_name.length === 0) {
                this.setState({
                    cameraNameError: true
                })
            }
            if (newCamera_ipaddress.length === 0) {
                this.setState({
                    cameraIpaddressError: true
                })
            }
        }
        else {
            this.setState({ parentLoader: true });
            var camera_obj = {
                "camera_name": newCamera_name,
                "raw_camera_link": newCamera_ipaddress,
                "resolution": newCamera_resolution,
                "camera_type": newCamera_cameratype
            }
            this.close_popup();
            appManager.createCamera(camera_obj).then(result => {
                if (result.status === 200) {
                    if (result.data) {
                        notification('success', 'Camera is Added');
                        this.getZoneDetailstoUpdate(newCamera_zone, result.data.camera_id);
                    }
                }
            })
        }
    }
    UpdateCameraDetails = () => {
        this.setState({ parentLoader: true });
        var camera_obj = {
            "camera_id": this.state.selectedCamera_id,
            "data": {
                "camera_name": this.state.selectedCamera_name,
                "raw_camera_link": this.state.selectedCamera_ipaddress,
                "resolution": this.state.selectedCamera_resolution,
                "camera_type": this.state.selectedCamera_cameratype
            }
        }
        appManager.updateCameraDetails(camera_obj).then(result => {
            this.setState({
                disable: true
            })
        })
        notification('success', 'Camera is updated');
        if (this.state.previouszone !== this.state.selectedCamera_zone) {
            total = 2;
            appManager.getZoneDetails(this.state.previouszone).then(zonedetails => {
                var cameras = [];
                var cameras_obj = zonedetails[0].cameras !== undefined ? zonedetails[0].cameras.filter(zonecameras => zonecameras.camera_id !== this.state.selectedCamera_id) : '';
                if (cameras_obj !== undefined) {
                    cameras_obj.map(camera => {
                        cameras.push(camera.camera_id);
                    })
                }
                this.updateZone(this.state.previouszone, cameras);
            })
        }
        this.getZoneDetailstoUpdate(this.state.selectedCamera_zone, this.state.selectedCamera_id);

    }
    getZoneDetailstoUpdate = (zone_id, camera_id) => {
        appManager.getZoneDetails(zone_id).then(zone => {
            var cameras = [];
            if (zone[0].cameras !== undefined) {
                zone[0].cameras.map(camera => {
                    cameras.push(camera.camera_id);
                })
            }
            cameras.push(camera_id);
            this.updateZone(zone_id, cameras);
        })
    }
    handleDelete = (e) => {
        this.setState({
            parentLoader: true
        })
        var self = this;
        appManager.deleteCamera(this.state.selectedCamera_id).then(zone => {
            notification('success', 'Camera is deleted');
            self.getZoneList('default');
        })
    }
    close_popup = () => {
        this.setState({
            visible: false,
            newCamera_ipaddress: '',
            newCamera_name: '',
            newCamera_cameratype: "Bullet",
            newCamera_zone: this.state.zone,
            newCamera_resolution: '720p',
        })
    }
    onSearchTextChange = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    searchByCameraName = () => {
        const self = this;
        if (self.state.searchValue.length > 0) {
            this.setState({ cameraListLoader: true })
            appManager.getListOfCamerasByName(self.state.searchValue).then(cameras => {
                this.setState({
                    cameraListLoader: false,
                    camerasList: cameras.filter(camera => camera.zone ? camera.zone.zone_id === self.state.zone : ''),
                    noDataText: "No results found"
                })
            }).catch((error) => {
                this.setState({
                    cameraListLoader: false,
                    noDataText: "No results found"
                })
            });
        }
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const {
            camerasList, zoneList, disable, parentLoader, detailsLoader, cameraListLoader,
            selectedCamera_zone, selectedCamera_name, selectedCamera_ipaddress, selectedCamera_id,
            selectedCamera_cameratype, selectedCamera_resolution, newCamera_name, newCamera_ipaddress,
            newCamera_cameratype, newCamera_zone, newCamera_resolution, cameraIpaddressError, cameraNameError, noDataText
        } = this.state;
        return (
            <CameraStyleWrapper>
                <div className="Camera_wrapper" style={{ width: '100%' }}>
                    <Spin spinning={parentLoader} size="large">
                        <div className="page_header">
                            <h4>Cameras</h4>
                            <span>CogAi / Cameras</span>
                        </div>
                        <Row style={rowStyle} gutter={0} justify="start">
                            <Col lg={8} md={24} sm={24} xs={24} style={colStyle}>
                                <div className="Search_bar_wrapper">
                                    <Input onChange={this.onSearchTextChange} value={this.state.searchValue} placeholder="Search" />
                                    <span onClick={this.searchByCameraName}>Search</span>
                                </div>
                                <div className="dropDown_wrapper">
                                    <div>
                                        <Select className="zone_dropdown" value={this.state.zone} name="zones" placeholder="Zones" onChange={this.onZoneChange}>
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
                                                {camerasList.length > 0 && camerasList.map((x, i) => {
                                                    return (
                                                        <div onClick={() => this.onSelectCamera(x.camera_id)} className={x.camera_id === selectedCamera_id ? "camera active" : "camera"}>
                                                            <div>
                                                                {x.camera_name}
                                                            </div>
                                                        </div>

                                                    );
                                                })}
                                                {camerasList.length > 0 && editable && <span> <img className="add_img" onClick={() => this.setState({ visible: true })} src={Add} /></span>}
                                            </div>

                                            {camerasList.length == 0 && <div className="no_data_text">{noDataText}</div>}
                                        </div>
                                    </Spin>
                                </div>
                            </Col>
                            <Col lg={16} md={24} sm={24} xs={24} style={colStyle}>
                                <Spin spinning={detailsLoader}>
                                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                        <div className="btn_Wrapper">
                                            {camerasList.length == 0 && editable && <Button type="primary" onClick={() => this.setState({ visible: true })}>Add</Button>}
                                            {camerasList.length > 0 && editable && <Button type="primary" onClick={this.handleCameraSettings}>{disable ? 'Edit' : 'Save'}</Button>}
                                            {camerasList.length > 0 && editable && <Popconfirm
                                                title="Are you sure, you want to delete this zone?"
                                                placement="left"
                                                okText="Yes"
                                                cancelText="cancel"
                                                onConfirm={this.handleDelete}>
                                                <Button type="danger">Delete</Button>
                                            </Popconfirm>}
                                        </div>
                                    </Col>
                                    <Row style={rowStyle} gutter={0} justify="start">
                                        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                                            <div className="box_">
                                                <label>Camera Name</label>
                                                <Input disabled={disable} name="camera_name" className={disable ? "selected_data" : "selected_data editable"} value={selectedCamera_name} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="box_">
                                                <label>IP Address</label>
                                                <Input disabled={disable} name="ip_address" className={disable ? "selected_data" : "selected_data editable"} value={selectedCamera_ipaddress} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="box_">
                                                <label>Type of Camera</label>
                                                <Select disabled={disable} className={disable ? "selected_data" : "selected_data editable"} value={selectedCamera_cameratype} onChange={(e) => this.dropDownUpdate('cameraType', e)}>
                                                    <Option key="Bullet">Bullet</Option>
                                                    <Option key="Wireless">Wireless</Option>
                                                    <Option key="Dome">Dome</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>

                                            <div className="box_">
                                                <label>Zone</label>
                                                <Select disabled={disable} className={disable ? "selected_data" : "selected_data editable"} value={selectedCamera_zone} onChange={(e) => this.dropDownUpdate('zone', e)}>
                                                    {zoneList.length > 0 && zoneList.map((zone, index) => {
                                                        return (
                                                            <Option key={zone.zone_id}>{zone.zone_name}</Option>
                                                        )
                                                    }
                                                    )}
                                                </Select>
                                            </div>
                                            <div className="box_">
                                                <label>Resolution</label>
                                                <Select disabled={disable} className={disable ? "selected_data" : "selected_data editable"} value={selectedCamera_resolution} onChange={(e) => this.dropDownUpdate('resolution', e)}>
                                                    <Option key="1020p">1020p</Option>
                                                    <Option key="720p">720p</Option>
                                                </Select>
                                            </div>
                                        </Col>
                                    </Row>
                                </Spin>
                                {/* </Box> */}
                                <Modal
                                    visible={this.state.visible}
                                    title="Add a new camera"
                                    onCancel={this.close_popup}
                                    className="_popup"
                                    width={720}
                                    footer={[
                                        <Button key="back" size="large" onClick={this.close_popup}>
                                            Cancel
                                </Button>,
                                        <Button
                                            key="submit"
                                            type="primary"
                                            size="large"
                                            onClick={this.createCamera}
                                        >
                                            Save
                                </Button>,
                                    ]}
                                >
                                    <div className="new_form_popup">
                                        <Row style={rowStyle} gutter={0} justify="start">
                                            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                                                <div className="box_">
                                                    <label>Camera Name</label>
                                                    <Input name="new_camera_name" placeholder="Enter camera name" className="selected_data" value={newCamera_name} onChange={this.handleInputChange} />
                                                    {cameraNameError && <span className="error_message">Enter camera name</span>}
                                                </div>
                                                <div className="box_">
                                                    <label>IP Address</label>
                                                    <Input name="new_ip_address" placeholder="Enter ip address" className="selected_data" value={newCamera_ipaddress} onChange={this.handleInputChange} />
                                                    {cameraIpaddressError && <span className="error_message">Enter camera Ip address</span>}
                                                </div>
                                                <div className="box_">
                                                    <label>Type of Camera</label>
                                                    <Select className="selected_data" value={newCamera_cameratype} onChange={(e) => this.dropDownUpdate('new_cameraType', e)}>
                                                        <Option key="Bullet">Bullet</Option>
                                                        <Option key="Wireless">Wireless</Option>
                                                        <Option key="Dome">Dome</Option>
                                                    </Select>
                                                </div>
                                            </Col>
                                            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>

                                                <div className="box_">
                                                    <label>Zone</label>
                                                    <Select className="selected_data" value={newCamera_zone} onChange={(e) => this.dropDownUpdate('new_zone', e)}>
                                                        {zoneList.length > 0 && zoneList.map((zone, index) => {
                                                            return (
                                                                <Option key={zone.zone_id}>{zone.zone_name}</Option>
                                                            )
                                                        }
                                                        )}
                                                    </Select>
                                                </div>
                                                <div className="box_">
                                                    <label>Resolution</label>
                                                    <Select className="selected_data" value={newCamera_resolution} onChange={(e) => this.dropDownUpdate('new_resolution', e)}>
                                                        <Option key="1020p">1020p</Option>
                                                        <Option key="720p">720p</Option>
                                                    </Select>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                    </Spin>
                </div>
            </CameraStyleWrapper>
        )
    }
}

function mapStateToProps(state) {
    const { zone_list } = state.ZonesReducer;
    const { camera_list } = state.CamerasReducer;
    return {
        zone_list,
        camera_list
    };
}
export default connect(mapStateToProps)(Cameras);					