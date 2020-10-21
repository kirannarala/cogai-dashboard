
import styled from 'styled-components';
import { palette } from 'styled-theme';

const ZoneStyleWrapper = styled.div`
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
        .addZone_card{
            background-color: ${palette("background", 1)};
            border: 0px;
            color: #ffffff;
            max-width: 400px;
            margin: 3rem auto 0 auto;
            text-align: center;
            &:hover{
                border: 0px !important;
            }
            h2{
                color: #ffffff;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            p{
                color: #bfc8e2!important;
                max-width: 286px;
                margin: 0 auto 1rem auto;
            }
        }
        .entance{
            width: 100%;
            .card{
                width: 100%;
                background-color: ${palette("background", 1)};
                border: 0px;
                position: relative;
                color: #ffffff;
                margin-top: 4px;
                &:hover{
                    border: 0px !important;
                }
                .overlay_{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    z-index: 9;
                    cursor: not-allowed;
                    top: 0px;
                    left: 0px;
                    background: black;
                    &.pointer{
                        cursor: default !important;
                    }
                }
                .violationDistance{
                    position: relative;
                    padding: 1em;
                    h3{
                        color: #ffffff;
                    }
                    .rangeslider__fill {
                        background-color: #556ee6 !important;
                    }
                    .stRange{
                        margin-top: -10px;
                        float: left;
                        color: #a6b0cf;
                    }
                    .enRange{
                        margin-top: -10px;
                        float: right;
                        color: #a6b0cf;
                    }
                    .rangeslider__handle-label {
                        font-size: 13px;
                        font-weight: 500;
                        margin-top: 4px;
                        text-align: center;
                        color: #000;
                    }
                    .rangeslider-horizontal .rangeslider__handle:after {
                        display: none;
                    }
                }
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
                    padding-bottom: 5px;
                    padding-top: 15px;
                    border-bottom: 1px solid gray;
                    &:last-child{
                        border: none;
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
                        h6{
                            font-size: 15px;
                            margin-bottom: 8px;
                            color: #ffffff;
                        }
                        p{
                            font-size: 14px;
                            margin-bottom: 8px;
                            color: #ffffff;
                        }
                        .notification_time{
                            font-size: 12px;
                        }
                    }
                }
            }
        }
        .Search_bar_wrapper{
            // width: 90%;
            height: 45px;
            padding: 0 20px;
            position: relative;
            .ant-input{
                width: 100%;
                padding-right: 110px;
                font-size: 16px;
                height: 45px;
            }
            .ant-btn{    
                position: absolute;
                right: 20px;
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
                border: none !important;
            }
        }
        .dropDown_wrapper{
            margin-top: 20px;
            // width: 90%;
            padding: 0px 20px;
            >div:first-child{
                background-color: ${palette("background", 4)}
                color: #ffffff;
                display: flex;
                justify-content: center;
                padding: 10px 10px 6px;
                font-size: 18px;
                .ion-android-camera{
                margin-right: 15px;
                }
            }
            .ant-select{
                width: 100%;
                &-selection{
                    background-color: transparent;
                    border: none !important;
                    &__placeholder, &-selected-value{
                        color: #ffffff;
                        font-size: 16px;
                        float: none !important;
                        text-align: center;
                    }
                    &__rendered{
                        text-align: center;
                    }
                }
                &-arrow{
                    font-size: 14px;
                    top: 15px;
                    right: 70px !important;
                    .anticon{
                        color: #ffffff;
                    }
                }
                &.ant-select-focused {
                    .ant-select-selection {
                        &:focus,
                        &:active {
                            border: none;
                            outline: 0;
                            box-shadow: none;
                        }
                    }
                }
                &.ant-select-open {
                    .ant-select-selection {
                        border: none;
                        outline: 0;
                        box-shadow: none;
                    }
                }
            }
            .dropdown_wrapper{
                background-color: #ffffff;
                position: relative;
                min-height: 200px;
            }
            .dropdown{
                padding: 10px 20px 35px;
                position: relative;
                .zone_wrapper{
                    padding: 10px 10px;
                    cursor: pointer;
                    font-size: 16px;
                    &:hover{
                        background-color: #e3eff9;
                    }
                    &.active{
                        background-color:#cad7e2;
                    }
                    .ant-input{
                        width: calc(100% - 56px);
                    }
                    .ant-input:disabled{
                        font-size: 16px;
                        border: none;
                        cursor: pointer;
                        background-color: transparent;
                        color: #888888;
                    }
                    .edit_img{
                        margin-left: 10px;
                    }
                    .remove_img{    
                        margin-left: 14px;
                        width: 14px;
                    }
                }
                >span{
                    position: absolute;
                    bottom: 7px;
                    right: 18px;
                    img{
                        width: 22px;
                        cursor: pointer;
                    }
                }
            }
        }
        .btn_Wrapper{
            display: flex;
            // margin:10px 20px 4px;
            min-height: 45px;
            justify-content: space-between;
            align-items: center;
            .ant-btn{
                width: 92px;
                &:first-child{
                    margin-right: 10px;
                }
            }
            .inputWrapper{
                position: relative;
                .ant-input{
                    max-width: 220px;
                    padding-left: 60px;
                    font-size: 16px;
                    // background-color: #e3eff9;
                    border: 2px solid ${palette("primary", 0)};
                    color:${palette("primary", 0)};
                    height: 45px;
                    &[disabled]{
                        border: 1px solid #888;
                        color: #9c9898;
                        background-color: #eaeaea;
                    }
                }
                span{
                    position: absolute;
                    left: 10px;
                    top: 11px;
                    font-size: 15px;
                    font-weight: 600;
                }
            }
        }
    }
    .no_data_text{
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        top: 0px;
        left: 0px;
    }
`;

export default ZoneStyleWrapper;