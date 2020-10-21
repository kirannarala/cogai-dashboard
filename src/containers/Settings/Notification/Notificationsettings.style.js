import styled from "styled-components";
import { palette } from "styled-theme";
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from "../../../settings/withDirection";

const NotificationSettingsStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  //align-items: center;
  position: relative;
  background-color: ${palette("background", 5)};
  ._wrapper {
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
    .card {
      width: 100%;
      background-color: ${palette("background", 1)};
      border: 0px;
      color: #ffffff;
      &:hover {
        border: 0px !important;
      }
      .violationDistance {
        border: 1px solid #888888;
        padding: 1em;
        margin-bottom: 15px;
        h3 {
          color: #ffffff;
          font-size: 21px;
          font-weight: 400;
          span {
            display: block;
            font-size: 16px;
          }
        }
      }
    }
    .rangeslider__fill {
      background-color: #556ee6 !important;
    }
    .stRange {
      margin-top: -10px;
      float: left;
      color: #a6b0cf;
    }
    .enRange {
      margin-top: -10px;
      float: right;
      color: #a6b0cf;
    }
    .header_ {
      margin-bottom: 20px;
      height: 52px;
      h2 {
        color: #ffffff;
      }
      p {
        color: #ffffff;
      }
    }
    .NotificationsSettings_wrapper {
      //   width: 90%;
      //   margin-left: auto;
      padding: 0 10px;
      .body {
        padding: 24px;
        background-color: ${palette("background", 2)};
        min-height: 500px;
        position: relative;
        .no_data_block{
          display: flex;
          width: 100%;
          height: 100%;
          position: absolute;
          justify-content: center;
          align-items: center;
          .ant-btn{
            width: 125px;
            height: 47px;
            font-size: 18px;
          }
        }
        .box_ {
          border: 1px solid #888888;
          padding: 10px 15px;
          margin-bottom: 15px;
          .title {
            color: #ffffff;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            > div {
              width: 50%;
            }
            h3 {
              font-size: 18px;
              font-weight: 400;
              color: #ffffff;
            }
          }
          label {
            width: 50%;
            vertical-align: bottom;
            font-size: 14px;
            color: #ffffff;
            // padding: 0 40px;
          }
          .content {
            display: flex;
            align-items: center;
            padding: 20px 0;
            position: relative;
            > div {
              display: inline-block;
              width: 40%;
              padding: 0px 20px;
              vertical-align: top;
              position: relative;
              // label{
              //     font-size: 14px;
              //     color: #a6b0cf;
              // }
              .ant-select {
                // position: absolute;
                // right: 20px;
                min-width: 60px;
                margin-right: 10px;
                &-selection {
                  border-left: none !important;
                  height: 32px;
                  img {
                    width: 23px;
                    // margin-left: 5px;
                  }
                  &-selected-value {
                    padding: 0px;
                  }
                  &__rendered {
                    // margin-left: 3px;
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
            }
            span {
              font-size: 13px;
              color: #a6b0cf;
              display: inline-block;
            }
            .dropDown_wrapper{
              // margin-top: 20px;
              // width: 90%;
              padding: 0px 0px 0px 20px;
              width: 20%;
              min-width: 195px;
              >div:first-child{
                background-color: ${palette("background", 5)}
                color: #ffffff;
                display: flex;
                justify-content: center;
                padding: 0px 5px 0px;
                font-size: 18px;
                .ion-android-camera{
                    margin-right: 15px;
                }
              }
              .ant-select{
                width: 100%;
                &-selection{
                  background-color: transparent !important;
                  border: none !important;
                  &__placeholder, &-selected-value{
                    color: #ffffff;
                    font-size: 14px;
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
                  // right: 70px !important;
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
                min-height: 100px;
                max-height: 100px;
                overflow-y: auto;
              }
              .dropdown{
                padding: 10px 20px 10px;
                position: relative;
                .camera{
                  padding: 10px 10px;
                  cursor: pointer;
                  font-size: 16px;
                  // // &:hover{
                  // //   background-color: #e3eff9;
                  // // }
                  // // &.active{
                  // //   background-color:#cad7e2;
                  // // }
                  // // .ant-input{
                  // //   width: calc(100% - 56px);
                  // // }
                  // // .ant-input:disabled{
                  // //   font-size: 16px;
                  // //   border: none;
                  // //   cursor: pointer;
                  // //   background-color: transparent;
                  // //   color: #888888;
                  // // }
                  // .edit_img{
                  //   margin-left: 10px;
                  // }
                  // .remove_img{    
                  //   margin-left: 14px;
                  //   width: 14px;
                  // }
                }
                .ant-checkbox-group{
                  width: 100%;
                  &-item{
                    display: block;
                    font-size: 16px;
                    padding: 0px;
                    position: relative;
                    margin: 0px;  
                    width: 100%;
                    .ant-checkbox{
                      position: absolute;
                      right: 10px;
                      top: 4px;
                      &-inner{
                        border-color: ${palette("primary", 0)};
                      }
                    }
                    span{
                      padding: 0px;
                      color: #888888;
                    }
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
            .overlay_{
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 1;
              background-color: #000000;
              opacity: 0.2;
            }
          }
          // .rangeslider__handle-label {
          //   font-size: 13px;
          //   font-weight: 500;
          //   margin-top: 4px;
          //   text-align: center;
          // }
          // .rangeslider-horizontal .rangeslider__handle:after {
          //   display: none;
          // }
        }
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
    .new_form_popup {
      max-width: 767px;
      width: 100%;
      margin: auto;
      // top: calc((100vh - 410px)/2);
      position: relative;
      background: #ffffff;
      text-align: center;
      padding: 20px 15px 29px 20px;
      font-size: 13px;
      color: ${palette("text", 3)};
      line-height: 1.5;
      border-radius: 9px;
      @media only screen and (max-width: 767px) {
        // top: calc((100vh - 496px)/2);
        border-radius: 0px;
      }
      @media only screen and (max-width: 480px) {
        top: 0px;
        border-radius: 0px;
      }
      .address_popup_header {
        font-size: 16px;
        color: ${palette("gray", 9)};
        font-weight: 600;
        border-bottom: 1px solid #eaeaea;
        margin-bottom: 35px;
        h1 {
          text-align: center;
          font-size: 18px;
          text-transform: uppercase;
          color: #888888;
          margin-bottom: 10px;
        }
        span {
          position: absolute;
          right: 17px;
          top: 19px;
          font-size: 19px;
          cursor: pointer;
          &:before {
            content: "\\292C";
            position: relative;
            bottom: 4px;
            left: 3px;
            color: gray;
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
`;

export default WithDirection(NotificationSettingsStyleWrapper);
