
import IsoWidgetsWrapper from "../Widgets/widgets-wrapper";
import StickerWidget from "../Widgets/sticker/sticker-widget";
import React, { Component } from "react";
import ZonesIcon from "../../image/zones_white.png";
import Violation10minIcon from "../../image/vio_10min_white.png";
import ViolationTodayIcon from "../../image/vio_today_white.png";
import { Row, Col } from "antd";
import appManager from "../appManager";
import { store } from "../../redux/store";
import basicStyle from "../../settings/basicStyle";
import { connect } from "react-redux";
import Select, { SelectOption } from '../../components/uielements/select';
import SummaryBlockStyleWrapper from './summary.style'


const Option = SelectOption;
var tempzoneName = '';
class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneOptions: []
    }
  }
  getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  }
  attachZoneDetails(zones) {
    const present_zoneId = window.location.href.split(':');
    var random = this.getRandom(0, zones.length - 1);
    if (zones.length > 0) {
      if (!present_zoneId[present_zoneId.length - 1].includes('/')) {
        this.dispatchToGlobalVar(present_zoneId[present_zoneId.length - 1]);
      }
      else {
        if (window.location.href.includes('home')) {
          this.dispatchToGlobalVar(zones[0].zone_id);
        }
        else {
          this.dispatchToGlobalVar(zones[0].zone_id);
        }
      }
    }
  }

  componentDidMount() {
    this.getDashboardAnalytics();
    var storedZoneList = this.props.zone_list;
    if (storedZoneList == undefined || storedZoneList.length <= 0) {
      appManager.getZoneList().then((data) => {
        this.setState({
          zoneOptions: data
        }, () => {
          this.attachZoneDetails(data);
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
        zoneOptions: storedZoneList
      }, () => {
        this.attachZoneDetails(storedZoneList);
      })
    }
  }
  onSelectChange = (e) => {
    this.dispatchToGlobalVar(e.key);
    const { history } = this.props;
    history.history.push('/dashboard/analytics/:' + e.key);
  }
  dispatchToGlobalVar = (zone) => {
    store.dispatch({
      type: "SELECTED_ZONE",
      payload: {
        current_zone: zone,
        current_zoneName: this.state.zoneOptions.filter(zone_ => zone_.zone_id === zone)[0].zone_name,
        current_liveVideo: this.state.zoneOptions.filter(zone_ => zone_.zone_id === zone)[0].cameras.length > 0 ? this.state.zoneOptions.filter(zone_ => zone_.zone_id === zone)[0].cameras[0] : this.state.zoneOptions[0].cameras[0],
      },
    })
  }
  getDashboardAnalytics = () => {
    appManager.getDashboardAnalytics().then((data) => {
      store.dispatch({
        type: "DASHBOARD_ANALYTICS",
        payload: {
          dashboardAnalytics: data,
        },
      });
    });
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const {
      num_zones,
      num_cameras,
      num_people,
    } = this.props.dashboardAnalytics;
    return (
      <SummaryBlockStyleWrapper>
        <IsoWidgetsWrapper>
          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number={
                    <span>{this.state.zoneOptions.length}</span>
                  }
                  height={this.props.height}
                  text={
                    this.props.parent === 'home' ? <Select placeholder="Zones" >
                      {this.state.zoneOptions.length > 0 && this.state.zoneOptions.map(zone => {
                        const { zone_id, zone_name } = zone;
                        return (
                          <Option onClick={this.onSelectChange} key={zone_id} >{zone_name}</Option>
                        )
                      })}
                    </Select>
                      :
                      <Select value={this.props.current_zone}>
                        {this.state.zoneOptions.length > 0 && this.state.zoneOptions.map(zone => {
                          const { zone_id, zone_name } = zone;
                          return (
                            <Option onClick={this.onSelectChange} key={zone_id} >{zone_name}</Option>
                          )
                        })}
                      </Select>}
                  icon={ZonesIcon}
                  fontColor="#ffffff"
                  bgColor="#7266BA"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number={
                    this.props.violations_10min
                  }
                  height={this.props.height}
                  text={<div><h3>Violations&nbsp;</h3><span>10 minutes</span></div>}
                  icon={Violation10minIcon}
                  fontColor="#ffffff"
                  bgColor="#7ED320"
                />
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number={
                    this.props.total_violation_today
                  }
                  height={this.props.height}
                  text={<div><h3>Violations&nbsp;</h3><span>net today</span></div>}
                  icon={ViolationTodayIcon}
                  fontColor="#ffffff"
                  bgColor="#F75D81"
                />
              </IsoWidgetsWrapper>
            </Col>
          </Row>
        </IsoWidgetsWrapper>
      </SummaryBlockStyleWrapper>
    )
  }
}

function mapStateToProps(state) {
  const { dashboardAnalytics, total_violation_today, violations_10min
  } = state.DashboardAnalyticsReducer;
  const { zone_list, current_zone } = state.ZonesReducer;
  return {
    dashboardAnalytics, total_violation_today, violations_10min, zone_list, current_zone
  };
}
export default connect(mapStateToProps)(Blocks);