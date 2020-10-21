import CoverageStyleWrapper from "./coverage.style";
import React, { Component } from 'react';
import Button from "../../components/uielements/button";
import ZoneMap from '../../image/floorMap.png';
import basicStyle from '../../settings/basicStyle';
import { Row, Col } from 'antd';
import OpenSeaDragon from "../openseadragon";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <CoverageStyleWrapper>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <div className="box">
              <div className="header">
                <h3>Coverage</h3>
                <div>
                  <Button type="primary" size="small">
                    Zones
                        </Button>
                  <Button type="default" size="small">
                    Cameras
                        </Button>
                </div>
              </div>
              <div className="container">
                <div className="app">
                  <OpenSeaDragon image={ZoneMap} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CoverageStyleWrapper>
    )
  }
}