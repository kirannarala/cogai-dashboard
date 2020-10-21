import React, { Component } from "react";
import HomeStyleWrapper from "./home.style";
import { Row, Col } from "antd";
import Box from "../../components/utility/box";
import ContentHolder from "../../components/utility/contentHolder";
import basicStyle from "../../settings/basicStyle";
import appManager from "../appManager";
import Blocks from '../Summary/summary';
import * as configs from "../Charts/recharts/config";
import ApexChart from "../Analytics/ApexChart";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { rowStyle, colStyle, gutter } = basicStyle;
        return (
            <HomeStyleWrapper>
                <div className="home_wrapper" style={{ width: '100%' }}>
                    <div className="page_header">
                        <h4>Home</h4>
                        <span>CogAi / Home</span>
                    </div>
                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={24} md={24} sm={24} xs={24} style={colStyle} className="blocks_" >
                            <Blocks history={this.props} parent="home" height="54px"/>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                            <Box subtitle={configs.MixBarChart.title}>
                                <ContentHolder>
                                    <ApexChart />
                                </ContentHolder>
                            </Box>
                        </Col>
                    </Row>
                </div>
            </HomeStyleWrapper>
        )
    }
}
export default Home;