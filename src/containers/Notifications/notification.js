import React, { Component } from 'react';
import Input from '../../components/uielements/input';
import Form from '../../components/uielements/form';
import Spin from '../../helpers/spin.style';
import NotificationStyleWrapper from './notification.style';
import ContentHolder from '../../components/utility/contentHolder';
import basicStyle from '../../settings/basicStyle';
import Popconfirms from '../../components/feedback/popconfirm';
import appManager from "../appManager";
import PopconfirmWrapper from '../Feedback/Popconfirm/popconfirm.style';
import { connect } from "react-redux";
import Modals from "../../components/feedback/modal";
import ViolationIcon from "../../image/violations_red.png";
import ZonesIcon from "../../image/zones_white.png";
import CameraIcon from "../../image/cam_white.png";
import Pagination from '../../components/uielements/pagination';
import ModalStyle, { ModalContent } from "../Feedback/Modal/modal.style";
import WithDirection from "../../settings/withDirection";
import Telegram from "../../image/Telegram.png";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const confirm = Modals.confirm;

const Popconfirm = props => (
    <PopconfirmWrapper>
        <Popconfirms {...props} />
    </PopconfirmWrapper>
);
class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zonesList: [],
            cameraList: [],
            usersList: [],
            notificationList: [],
            loader: false,
            limit: 20,
            currentPage: 1,
            total: 80,
            offset: 0,
        }
    }
    componentDidMount() {
        this.setState({
            loader: true
        })
        const { limit, offset } = this.state;
        if (this.props.zone_list.length > 0) {
            this.setState({
                zonesList: this.props.zone_list
            })
            if (this.props.camera_list.length > 0) {
                if (this.props.users_list.length > 0) {
                    this.getNotifications(limit, offset);
                }
                else {
                    appManager.getUserList()
                        .then(data => {
                            this.setState({
                                usersList: data
                            })
                            this.getNotifications(limit, offset);
                        })
                }
            }
            else {
                appManager.getCameraList().then(cameras => {
                    this.setState({
                        cameraList: cameras
                    })
                    if (this.props.users_list.length > 0) {
                        this.getNotifications(limit, offset);
                    }
                    else {
                        appManager.getUserList()
                            .then(data => {
                                this.setState({
                                    usersList: data
                                })
                                this.getNotifications(limit, offset);
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
                        this.getNotifications(limit, offset);
                    }
                    else {
                        appManager.getUserList()
                            .then(data => {
                                this.setState({
                                    usersList: data
                                })
                                this.getNotifications(limit, offset);
                            })
                    }
                }
                else {
                    appManager.getCameraList().then(cameras => {
                        this.setState({
                            cameraList: cameras
                        })
                        if (this.props.users_list.length > 0) {
                            this.getNotifications(limit, offset);
                        }
                        else {
                            appManager.getUserList()
                                .then(data => {
                                    this.setState({
                                        usersList: data
                                    })
                                    this.getNotifications(limit, offset);
                                })
                        }
                    })
                }
            })
        }
    }
    getNotifications = (limit, offset) => {
        appManager.getNotificationsList(limit, offset)
            .then(notifications => {
                this.setState({
                    notificationList: notifications,
                    loader: false
                })
            })
    }
    redirect_ = (link) => {
        const { history } = this.props;
        history.push('zone/:' + link);
    }

    onPaginationChange = page => {
        const offset = (parseInt(page) * this.state.limit) - this.state.limit;
        this.setState({
            currentPage: page,
            loader: true
        });
        this.getNotifications(this.state.limit, offset);
    };


    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        const { zonesList, notificationList, cameraList, usersList } = this.state;
        return (
            <NotificationStyleWrapper>
                <div style={{ width: '100%' }}>
                    <Spin spinning={this.state.loader} size="large">
                        <div className="page_header">
                            <h4>Notifications</h4>
                            <span>CogAi / Notifications</span>
                        </div>
                        <div className="Search_bar_wrapper">
                            <Input placeholder="Search" />
                            <span>Search</span>
                        </div>
                        <div className="body_">
                            <div className="notifications_wrapper">
                                {notificationList && notificationList.map(notification => {
                                    const { violation_count, zone_id, camera_id, notification_sent_at, user_id, notification_action } = notification;
                                    const zone_name = zonesList.length > 0 ? zonesList.filter(zone_ => zone_.zone_id === zone_id)[0].zone_name : '';
                                    const camera_name = cameraList.length > 0 ? cameraList.filter(camera_ => camera_.camera_id === camera_id).length > 0 ? cameraList.filter(camera_ => camera_.camera_id === camera_id)[0].camera_name : '' : '';
                                    const user_name = usersList.length > 0 ? usersList.filter(user_ => user_.user_id === user_id).length > 0 ? usersList.filter(user_ => user_.user_id === user_id)[0].first_name + ' ' + usersList.filter(user_ => user_.user_id === user_id)[0].last_name : '' : '';
                                    const sent_time = notification_sent_at ? appManager.getNotificationSentTime(notification_sent_at) : '';
                                    return (
                                        <div className="notification_">
                                            {user_name !== "" && <div className="user_wrapper"><span>To:&nbsp;</span><span>{user_name}</span>
                                            </div>}
                                            <div className="avatar_">
                                                <span>
                                                    <img src={ViolationIcon} /></span>
                                            </div>
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
                                                <p className="notification_time"><i></i>{sent_time} </p>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                                {notificationList.length === 0 && <div className="no_data_block"></div>}
                            </div>
                        </div>
                    </Spin>
                </div>
            </NotificationStyleWrapper>
        );
    }
}

function mapStateToProps(state) {
    const { zone_list, users_list } = state.ZonesReducer;
    const { camera_list } = state.CamerasReducer;
    return {
        zone_list,
        users_list,
        camera_list
    };
}
export default connect(mapStateToProps)(Notifications);