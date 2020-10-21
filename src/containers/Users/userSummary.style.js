import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const UserSummaryStyleWrapper = styled.div`
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
            background-color: ${palette("background", 1)};
            .userSummary{
                background-color:${palette("background", 2)};
                border-color: ${palette("secondary", 11)};
                .table_head{
                    background-color: ${palette("secondary", 11)};
                    display: flex;
                    padding: 10px 20px;
                    .header_row{
                        width: calc(100% - 300px);
                        display: flex;
                        justify-content: space-between
                        &.fullWidth{
                            width: 100%;
                        }
                        div{
                            padding: 5px 10px;
                            color: #ffffff;    
                            min-width: 100px;
                            width: 100%;
                            text-align: left;
                            &.fixed{
                                min-width: 200px;
                            }
                        }
                    }
                    .btnWrapper{
                        width: 300px;
                        display: inline-block;
                        text-align: right;
                        padding-left: 20px;
                        .ant-btn{
                            width: 100px;
                        }
                    }
                }
                .body{
                    padding-top: 15px;
                    min-height: 400px;
                    .row_{
                        display: flex;
                        padding: 10px 20px;
                        &content{
                            width: calc(100% - 300px);
                            display: flex;
                            justify-content: space-between
                            &.fullWidth{
                                width: 100%;
                            }
                            div{
                                padding: 5px 10px;
                                color: #ffffff;
                                text-align: center;
                                word-break: break-all;
                                min-width: 100px;
                                width: 100%;
                                text-align: left;
                                &.fixed{
                                    min-width: 200px;
                                }
                            }
                        }
                        .btnWrapper{
                            width: 300px;
                            display: inline-block;
                            text-align: right;
                            padding-left: 20px;
                            .ant-btn{
                                width: 100px;
                                &:first-child{
                                    margin-right: 10px;
                                }
                                &:last-child{
                                    background-color:${palette("error", 2)};
                                    color: #ffffff;
                                    &:hover{
                                        border-width: 1px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .special-label{
        font-size: 14px;
    }
    .phone_input_container{
        height: 43px;
        width: 100%;
        padding:4px 10px;
        color:#595959;
        border:1px solid #e9e9e9;
        marginTop: 5px;
    }
    // .errorMessage{
    //     font-size: 12px;
    //     color: #f46a6a;
    //     position:absolute;
    //     left: 0;
    //     bottom:-16px;
    //     //color:#ffffff;
    // }
`;

export default WithDirection(UserSummaryStyleWrapper);
