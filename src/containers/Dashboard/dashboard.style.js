import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const DashboardStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  //align-items: center;
  position: relative;
  background-color: ${palette("background", 3)};
  .main_{
    width: 100%;
    padding-bottom: 80px;
    &header{
        margin-top: 25px;
        padding: 10px;
        width: 80%;
        text-align: left;
        margin-left: auto;
        margin-right: auto;
        h1{
            font-size: 36px;
            margin-bottom: 16px;
            color: #ffffff;
            font-weight: 600;
        }
        p{
            font-size: 15px;
            color: #ffffff80;
        }
    }
    .card_wrapper{
        display: flex;
        width: 50%;
        justify-content: center;
        margin-top: 10px;
        @media only screen and (max-width : 767px){
            width: 100%;
        }
        .isoBoxWrapper{
            padding:0px;
            padding-bottom: 20px;
            background-color: ${palette("background", 2)};
            border-color: ${palette("background", 2)};
            .isoBoxTitle{
                background-color: ${palette("background", 4)};
                color: #ffffff;
                text-align: center;
                padding:.75rem 1.25rem;
                font-size: 16px;
            }
        }
        .card_body{
            text-align: center;
            padding: 1.25rem;
            h5{
                color: #ffffff;
                margin-bottom: 8px;
                font-size: 16px;
            }
            .row_{
                font-size: 22px;
                margin-right: -12px;
                margin-left: -12px;
                font-weight: 600;
                justify-content: center;
                margin-top: 25px;
                display: flex;
                .box{
                    margin-right: 5px;
                    margin-left: 5px;
                    border: ${palette("secondary", 11)};
                    border-radius: 4px;
                    padding: 8px;
                    background-color: ${palette("background", 1)};
                    width: 25%;
                    color:#a6b0cf;
                    span{
                        display: block;
                        background-color: ${palette("secondary", 11)};
                        font-size: 12px;
                        padding: 4px;
                        margin-top: 8px;
                    }
                }
            }
            .btn_wrapper{
                margin-top: 25px;
                a{
                    background-color: ${palette("primary", 16)};
                    color: #ffffff;
                    padding:.47rem .75rem;
                    font-size: 14px;
                    font-weight: 400;
                    border-radius: 4px;
                    text-align: center;
                    text-transform: capitalize;
                }
            }
        }
    }
}
.section, .section_{
    background-color: ${palette("background", 5)};
    padding-top: 40px;
    .ant-row{
        justify-content: center;
        bottom: 28px;
        position: relative;
    }
    &_header{
        text-align: center;
        margin-bottom: 3rem;
        .title{
            color: #c3cbe4;
            margin-bottom: 8px;
        }
        h4{
            font-size:18px;
            color: #ffffff;
            margin-bottom: 8px;
        }
    }
    .isoContentWrapper .isoLabel, .ant-select-selection-selected-value{
        font-size:21px;
        font-weight: 500;
    }
    .body{
        padding-bottom: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media only screen and (max-width : 767px){
            display: block;
        }
        >div{
            width: 50%;
            display: inline-block;
            text-align: center;
            @media only screen and (max-width : 767px){
                width: 100%;
            }
            img{
                width: 80%;
            }
            h4{
                font-size:18px;
                color: #ffffff;
                margin-bottom: 8px;
            }
            p{
                font-size: 14px;
                color: #ffffff;
                margin-bottom: 16px;
            }
            &.left_col{
                div{
                    width: 80%;
                    text-align: left;
                    margin-left: auto;
                    margin-right: auto;
                }
                .list{
                    margin-top: 1.5rem;
                    p{
                        margin-bottom: 8px;
                        i{
                            color: ${palette("primary", 16)};
                            &::before{
                                content: "\\F09DE";
                                display: inline-block;
                            }
                        }
                    }
                }
            }
            &.right_col{
                margin-top: 2rem;
                text-align:left;
                .ant-row, >div{
                    width: 80%;
                    margin-left: auto;
                    margin-right: auto;
                }
                .ant-card-bordered{
                    background-color:${palette("background", 2)};
                    border-color:${palette("secondary", 11)};
                    color: #ffffff;
                    .ant-card-head{
                        background-color:${palette("background", 4)};
                        color: #ffffff;
                        &-title{
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }
}
.section_{
    background-color:${palette("background", 1)};
}
`;

export default WithDirection(DashboardStyleWrapper);
