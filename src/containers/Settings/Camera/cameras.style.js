
import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../../settings/withDirection';

const CameraStyleWrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
justify-content: center;
padding: 20px 10px;
//align-items: center;
position: relative;
background-color: ${palette("background", 5)};
.Camera_wrapper{
    padding: 10px;
    .page_header {
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        padding-bottom: 24px;
        padding-left: 10px;
        padding-right: 10px;
        h4 {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
        }
        span {
            font-size: 14px;
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
        span{    
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
            min-height: 200px;
            position: relative;
        }
        .dropdown{
            padding: 10px 20px 35px;
            position: relative;
            .camera{
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
    .box_{
        margin: 10px 20px 35px;
        background-color: #ffffff;
        margin-top: 0px;
        position: relative;
        label{
            padding: 12px;
            display: block;
            font-size: 18px;
            background-color:${palette("background", 4)};
            color: #ffffff;
        }
        .selected_data{
            padding: 12px;
            display: block;
            font-size: 18px;
            height: 57px;
            &.editable{
                background-color: #ffffff;
                border: 2px solid ${palette("primary", 0)};
                border-radius: 0px;
                color: ${palette("primary", 0)};
                .ant-select-selection{
                    background-color: #ffffff;
                    color: ${palette("primary", 0)};
                }
            }
            &[disabled]{
                color: #595959 !important;
                background-color: #eaeaea;
            }
            &.ant-select{
                // border: 1px solid #eaeaea;
                // border-radius: 4px;
            }
            &.ant-select-disabled{
                background-color: #eaeaea;
                cursor: not-allowed;
                .ant-select-selection{
                    color: #595959 !important;
                    background-color: #eaeaea;
                    cursor: not-allowed;
                }
            }
            .ant-select{
                border: none !important;
                &-selection__rendered{
                    margin: 0px;
                }
                &-selection--single{
                   height: auto;
                   border: none !important;
                   box-shadow: none !important;
                }
            }
        }
        span.selected_data{
            padding-top: 15px;
            padding-bottom: 15px;
        }
        .error_message{
            font-size: 14px;
            position: absolute;
            left: 0;
            color: #f46a6a;
        }
    }
    .btn_Wrapper{
        display: flex;
        margin:10px 20px 4px;
        min-height: 35px;
        justify-content: flex-end;
        .ant-btn{
            width: 92px;
            &:first-child{
                margin-right: 10px;
            }
        }
    }
    
    .new_form_popup{
        max-width: 767px;
        width: 100%;
        margin: auto;
        // top: calc((100vh - 410px)/2);
        position: relative;
        background: #ffffff;
        text-align: center;
        padding: 20px 15px 29px 20px;
        font-size: 13px;
        color: ${palette('text', 3)};
        line-height: 1.5;
        border-radius: 9px;
        @media only screen and (max-width: 767px) { 
            // top: calc((100vh - 496px)/2);   
            border-radius: 0px;
        }
        @media only screen and (max-width: 480px) { 
            top:0px;
            border-radius: 0px;
        }
        .address_popup_header{
            font-size:16px;
            color: ${palette('gray', 9)};
            font-weight: 600;
            border-bottom: 1px solid #eaeaea;
            margin-bottom: 35px;
            h1{
                text-align:center;
                font-size: 18px;
                text-transform: uppercase;
                color: #888888;
                margin-bottom: 10px;
            }
            span{
                position: absolute;
                right: 17px;
                top: 19px;
                font-size: 19px;
                cursor:pointer;
                &:before{
                    content: "\\292C";
                    position:relative;
                    bottom:4px;
                    left: 3px;
                    color: gray;
                }
            }
        }
        .actionBtnWrapper{
            display: flex;
            justify-content: flex-end;
            .ant-btn{
                font-size: 18px;
                width: 150px;
                height: 46px;
            }
            .cancel_btn{
                span{
                    color:#4482FF !important;
                }
                background-color: #ffffff !important;
                margin-right: 10px;
                transition: all .3s;
                &:hover{
                    background-color: #f5f5f5 !important;
                }
                @media only screen and (max-width: 480px) { 
                    margin-bottom: 10px;
                }
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

export default WithDirection(CameraStyleWrapper);