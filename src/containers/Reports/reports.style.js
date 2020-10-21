import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const ReportsStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  //align-items: center;
  padding: 20px 10px;
  position: relative;
  background-color: ${palette("background", 5)};
  >div{
        padding: 10px 20px;
        .page_header{
            display: flex;
            justify-content: space-between;
            color: #ffffff;
            padding-bottom: 24px;
            h4{
                text-transform: uppercase;
                font-weight: 600;
                font-size: 16px;
                color: #ffffff;
            }
            span{
                font-size: 14px;
            }
        }
        .body_{
            .date_componentWrapper{
                display: flex;
                justify-content: space-between;
                padding: 0px 10px;
                .ant-calendar-picker{
                    margin-right: 15px;
                    &:hover {
                        .ant-calendar-picker-clear{
                            display: none;
                        }
                    }
                }
                .zone_dropdown{
                    width: 150px;
                }
            }
            .date_text{
                font-size: 14px;
                color: #ffffff;
            }
            .graph_header{
                padding: 30px 0px 10px;
                font-size: 20px;
                color: #ffffff;
                font-weight: 500;
                text-align: center;
            }
            .apexcharts-canvas{
                .apexcharts-legend-text{
                    color: #bfc8e2 !important;
                }
                .apexcharts-menu{
                    .exportCSV{
                        display: none;
                    }
                }
            }
        }
    }
`;
export default WithDirection(ReportsStyleWrapper);