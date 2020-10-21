import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const NotificationStyleWrapper = styled.div`
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
        .Search_bar_wrapper{
            width: 100%;
            // height: 50px;
            position: relative;
            margin-bottom: 15px;
            .ant-input{
                width: 100%;
                padding-right: 110px;
                font-size: 16px;
                height: 50px;
            }
            span{    
                position: absolute;
                right: 0px;
                height: 100%;
                top: 0;
                cursor: pointer;
                background-color: ${palette("background", 0)};
                width: 110px;
                display: flex;
                border-radius: 0px 4px 4px 0px;
                justify-content: center;
                align-items: center;
                font-size: 16px;
                color: #000000;
            }
        }
        .body_{
            background-color: ${palette("background", 1)};
            padding: 18px;
            border-radius: 6px;
            .title{
                font-size: 15px;
                margin: 0 0 7px;
                font-weight: 600;
                color: #ffffff;
            }
            .notifications_wrapper{
                padding: .75rem 1rem;
                .notification_{
                    padding-bottom: 15px;
                    padding-top: 30px;
                    border-bottom: 1px solid gray;
                    position: relative;
                    &:last-child{
                        border: none;
                    }
                    .user_wrapper{
                        position: absolute;
                        top: 6px;
                        // left: 47px;
                        right: 0px;
                        >span{
                            font-size: 18px;
                            color:${palette("primary", 15)};
                            &:first-child{
                            }
                            &:last-child{
                            }
                        }
                        img{
                            width: 30px;
                            margin-left: 10px;
                        }
                    }
                    .avatar_{
                        display: inline-block;
                        width: 50px;
                        vertical-align: top;
                        img{
                            width: 32px;
                            margin-right: auto;
                        }
                    }
                    .notification_body{
                        display: inline-block;
                        width: calc(100% - 50px);
                        .left_wrapper{    
                            display: inline-block;
                            width: calc(100% - 140px);
                            span{
                                color: #ffffff;
                                font-size: 14px;
                            }
                            >div{
                                display: inline-block;
                                vertical-align: top;
                                margin-right: 20px;
                                img, .ion-android-camera{
                                    width: 12px;
                                    margin-right: 5px;
                                }
                                h6{
                                    font-size: 18px;
                                    margin-bottom: 8px;
                                    color: #ffffff;
                                    span{
                                        display: inline-block;
                                        font-weight: 400;
                                        margin-bottom: 0px;
                                    }
                                    &.danger{
                                        color: red;
                                    }
                                }
                                span{
                                    display: block;
                                    margin-bottom: 5px;
                                }
                                .pointer_{
                                    cursor: pointer;
                                    font-weight: 400;
                                    &:hover{
                                        font-weight: 600;
                                    }
                                }
                            }
                        }
                        // p{
                        //     font-size: 14px;
                        //     margin-bottom: 8px;
                        //     color: #ffffff;
                        // }
                        .notification_time{
                            font-size: 12px;
                            width: 140px;
                            display: inline-block;
                            vertical-align: bottom;
                            color: #ffffff;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
    .no_data_block{
        min-height: 480px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        color:  ${palette("primary", 15)};
    }
`;

export default WithDirection(NotificationStyleWrapper);
