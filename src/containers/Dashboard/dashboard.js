import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardStyleWrapper from "./dashboard.style";
import { Row, Col } from "antd";
import Box from "../../components/utility/box";
import ContentHolder from "../../components/utility/contentHolder";
import basicStyle from "../../settings/basicStyle";
import Card from "../Uielements/Card/card.style";
import Feature from "../../image/dashboard_feature.png";
import HumanPosture from "../../image/human_posture.png";
import appManager from "../appManager";
import { store } from "../../redux/store";
import Blocks from '../Summary/summary';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      showError: false,
      loader: false,
    };
  }

  componentDidMount() {
    this.getDashboardAnalytics();
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
      <DashboardStyleWrapper>
        <div style={{ width: "100%" }}>
          <div className="main_">
            <Col md={12} sm={24} xs={24} style={colStyle}>
              <div className="main_header">
                <h1>Cog-Ai Employee Health Monitoring System</h1>
                <p>
                  Provides analytics and KPI on the Health of Manufacturing
                  facility employees
                </p>
              </div>
            </Col>
            <div className="card_wrapper">
              <Col md={18} sm={12} xs={24} style={colStyle}>
                <Box title={<span>Violations Analytics</span>}>
                  <div className="card_body">
                    <h5>Social Distance </h5>
                    <div className="time_wrapper">
                      <div className="row_">
                        <div className="box">
                          4<span>Days</span>
                        </div>
                        <div className="box">
                          17<span>Hours</span>
                        </div>
                        <div className="box">
                          58<span>Minutes</span>
                        </div>
                        <div className="box">
                          21<span>Seconds</span>
                        </div>
                      </div>
                    </div>
                    <div className="btn_wrapper">
                      <a href="/dashboard/dashboards">Get Violations</a>
                    </div>
                  </div>
                </Box>
              </Col>
            </div>
          </div>
          <div className="section" style={{ paddingTop: "0px" }}>
            <Blocks />
          </div>
          <div className="section">
            <div>
              <div className="section_header">
                <div className="title">About us</div>
                <h4>What is Cog-Ai HMS?</h4>
              </div>
              <div className="body">
                <div className="left_col">
                  <div>
                    <h4>Platform providing Employee health indicators</h4>
                    <p>
                      EH Indicator Platform will enable data driven decisions
                      for the better welfare of the employees. Computer Vision
                      algorithms to track the health of the system.
                    </p>
                  </div>
                </div>
                <div className="right_col">
                  <Row>
                    <ContentHolder style={{ overflow: "hidden" }}>
                      <Col md={11} sm={12} xs={24} style={{ padding: "0 8px" }}>
                        <Card title={<span>Social Distancing</span>}>
                          {<span>Social Distancing Violation Reports</span>}
                        </Card>
                      </Col>
                      <Col md={11} sm={12} xs={24} style={{ padding: "0 8px" }}>
                        <Card title={<span>Human Posture Recognition</span>}>
                          {<span>Social Distancing Violation Reports</span>}
                        </Card>
                      </Col>
                    </ContentHolder>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div className="section section_">
            <div>
              <div className="section_header">
                <div className="title">Features</div>
                <h4>Key features of the product</h4>
              </div>
              <div className="body">
                <div className="left_col">
                  <img src={Feature} />
                </div>
                <div className="right_col">
                  <div>
                    <h4>Platform providing Employee health indicators</h4>
                    <p>
                      EH Indicator Platform will enable data driven decisions
                      for the better welfare of the employees. Computer Vision
                      algorithms to track the health of the system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section section_">
            <div>
              <div className="body">
                <div className="left_col">
                  <div>
                    <h4>Human Posture Recognition</h4>
                    <p>
                      We combine several image processing techniques with the
                      depth images captured by various cameras to successfully
                      recognize the five distinct human postures of sitting,
                      standing, stooping, kneeling, and lying.
                    </p>
                    <div className="list">
                      <p>
                        <i className="dot"></i>Fatigue Level Indicators
                      </p>
                      <p>
                        <i className="dot"></i>Productivity &amp; Performance
                        Indicators
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right_col">
                  <img src={HumanPosture} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { dashboardAnalytics } = state.DashboardAnalyticsReducer;
  return {
    dashboardAnalytics,
  };
}
export default connect(mapStateToProps)(Dashboard);
