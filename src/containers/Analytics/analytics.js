import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/uielements/input";
import { connect } from "react-redux";
import Button from "../../components/uielements/button";
import IntlMessages from "../../components/utility/intlMessages";
import Spin from "../../helpers/spin.style";
import IsoWidgetsWrapper from "../Widgets/widgets-wrapper";
import StickerWidget from "../Widgets/sticker/sticker-widget";
import AnalyticsStyleWrapper from "./analytics.style";
import { Row, Col } from "antd";
import Box from "../../components/utility/box";
import ContentHolder from "../../components/utility/contentHolder";
import basicStyle from "../../settings/basicStyle";
import Card from "../Uielements/Card/card.style";
import VCardWidget from "../Widgets/vCard/vCard-widget";
import * as configs from "../Charts/recharts/config";
import VideoPlayer from "../../components/VideoPlayer/videoPlayer";
import ApexChart from "./ApexChart";
import Coverage from "../Coverage/coverage";
import appManager from "../appManager";
import actions from "../../redux/dashboardAnalytics/actions";
import Blocks from '../Summary/summary';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      stats: [],
      showLiveVideo: localStorage.getItem('persona') ? (localStorage.getItem('persona')).toLowerCase().includes('security') : false
    };
  }
  componentDidMount() {

  }
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <AnalyticsStyleWrapper>
        <div style={{ width: "100%" }}>
          <Spin spinning={this.props.zone_list.length <= 0} size="large">
            <div className="page_header">
              <h4>Analytics</h4>
              <span>CogAi / Analytics</span>
            </div>
            <div>
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={8} md={8} sm={24} xs={24} style={colStyle} className="profile_block">
                  <IsoWidgetsWrapper>
                    <VCardWidget
                      style={{ height: "285px" }}
                      src={''}
                      alt="Jhon"
                      name={<IntlMessages id="widget.vcardwidget.name" />}
                      description={
                        <IntlMessages id="widget.vcardwidget.description" />
                      }
                    />
                  </IsoWidgetsWrapper>
                </Col>

                <Col lg={16} md={16} sm={24} xs={24} style={colStyle} className="stats_block">
                  <Blocks history={this.props} parent="analytics" height ={"44px"}/>
                </Col>
              </Row>
              <div className="Zone_title">{this.props.current_zoneName}</div>
              <Row style={rowStyle} gutter={0} justify="start">
                <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
                  <Card className="card live_video_wrapper" style={{ margin: '0px 10px' }}>
                    <div className="cardtitle">
                      <div>Live Video Clip</div>
                      <span>{monthNames[(new Date()).getMonth()] + ' ' + (new Date()).getDate() + ', ' + (new Date()).getFullYear()}</span>
                    </div>
                    {this.state.showLiveVideo ?
                      <div className="live_video_block">
                        <img id="bg" src={"http://67.180.12.68:5000/video/" + this.props.current_liveVideo} height="100%" width="100%" />

                        <div className="apexcharts-legend apexcharts-align-center position-bottom">
                          <div className="apexcharts-legend-series">
                            <span className="apexcharts-legend-marker"></span>
                            <span className="apexcharts-legend-text">Violations</span>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="demand_btn_wrapper">
                        <div>
                          <h1>Live Video on On-demand for 30 secs</h1>
                          <Button type="primary" onClick={() => this.setState({ showLiveVideo: true })}>Re-load</Button>
                        </div>
                      </div>
                    }
                  </Card>
                </Col>
                <Col lg={16} md={12} sm={24} xs={24} style={colStyle}>
                  <Box subtitle={configs.MixBarChart.title}>
                    <ContentHolder>
                      <ApexChart key={this.props.current_zone} />
                    </ContentHolder>
                  </Box>
                </Col>
              </Row>

              <Row style={rowStyle} glutter={0} justify="start" >
                <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
                  <Coverage />
                </Col>
                <Col lg={16} md={12} sm={24} xs={24} style={colStyle}>
                  <Row style={rowStyle} gutter={0} justify="start" style={{ width: '97.5%', margin: '0px 0px 0px auto' }}>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                      <Card className="card">
                        <Row type="flex" style={rowStyle} gutter={0} justify="space-between" >
                          <Col lg={8} md={24} sm={24} xs={24} style={colStyle} style={{ marginBottom: '0px' }}>
                            <div className="Selected_information_wrapper">
                              <div>
                                <div>
                                  <label>Violations:</label>
                                  <span>{this.props.violations}</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col lg={16} md={24} sm={24} xs={24} style={colStyle} style={{ marginBottom: '0px', padding: '0px 10px' }}>

                            <div className="cardtitle">
                              <div style={{ textAlign: 'center' }}>Videos of selected Zone or Camera (s)</div>
                            </div>
                            <VideoPlayer key={JSON.stringify(this.props.video)} video={this.props.video} />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div></Spin>
        </div>
      </AnalyticsStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { video, people, violations, analytics_loader
  } = state.DashboardAnalyticsReducer;
  const { current_zoneName, current_zone, zone_list, current_liveVideo
  } = state.ZonesReducer;
  return {
    video,
    people,
    violations,
    current_zoneName,
    zone_list,
    analytics_loader,
    current_zone, current_liveVideo
  };
}
export default connect(mapStateToProps, {
  actions,
})(Analytics);