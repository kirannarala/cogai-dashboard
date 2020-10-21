import styled from "styled-components";
import { palette } from "styled-theme";
// import bgImage from "../../image/Background.jpg";
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from "../../settings/withDirection";

const SignInStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  //align-items: center;
  position: relative;
  // 
  background-size: cover;
  background-color: ${palette("gray", 1)};
  background-position-y: top;
    // @media only screen and (max-width : 1024px){
    //   
    //   background-size: cover;
    // }

  // &:before {
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   //background-color: rgba(0, 0, 0, 0.6);
  //   position: absolute;
  //   z-index: 1;
  //   top: 0;
  //   left: ${props => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
  //   right: ${props => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
  // }

  .isoLoginContentWrapper {
    //width: 787px;
    width: 38.6%;
    //height: auto;
    //overflow-y: auto;
    z-index: 10;
    position: relative;
    margin-top: 134px;
    opacity: .95;
    margin-bottom: 50px;
    min-width: 580px;
    @media only screen and (max-width : 580px){
      width: 100%;
      min-width: 320px;
    }
    .header_{
      background-color: ${palette("background", 0)};
      color:${palette("primary", 14)};
      padding:15px 32px 50px;
      border-radius: 6px 6px 0px 0px;
      position: relative;
      h5{
        font-size:1.5rem;
        display: block;
        margin-bottom: 5px;
        color:${palette("primary", 14)};
      }
      .logo_wrapper{
        position: absolute;
        bottom: -35px;
        left: 15px;
        // padding: 10px 5px;
        border-radius: 50%;
        background-color:#32394e!important    
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 60px;
        }
      }
    }
  }

  .isoLoginContent {
    display: flex;
    flex-direction: column;
    //padding: 38px 140px 23px;
    //padding: 60px 50px 49px;
    //padding-bottom: 10px;
    position: relative;
    box-shadow: 7px 8px 19px 0 rgba(0,0,0,0.04);
    background-color: ${palette("background", 1)};
    //box-shadow: 0px 2px 5px #eaeaea;
    border-radius: 12px;
    @media only screen and (max-width: 512px) {
      width: 100%;
      //padding: 70px 20px;
      border-radius: 0px;
    }

    .ant-spin-blur{
      opacity: 0.4;
      &::after{
        opacity: 0.1;
        border-radius: 6px;
      }
    }
    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 7px;
      justify-content: center;
      flex-shrink: 0;

      h2{
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: capitalize;
        color: ${palette("primary1", 2)};
        span{
          font-weight: bold;
          text-transform: uppercase;
        }
      }
    }

    .isoSignInForm {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 25px 32px 10px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      .ServerErrorWrapper{
        background-color: #e08577;
        border: 1px solid #dd3c10;
        color: #ffffff;
        margin-bottom: 15px;
        padding: 5px 10px;
        >div{
          &:first-child{
            font-size: 16px;
          }
          text-align: center;
        }
      }
      .isoInputWrapper{
          margin-bottom: 25px;
          position:relative;
          &:first-child{
            margin-bottom: 25px;
          }
          label{
            margin-bottom: 5px;
            color:${palette('primary', 15)};
          }
          .password_hint{
            position: absolute;
            top: 1px;
          }
          .errorMessage{
            font-size: 12px;
            color: #f46a6a;
            position:absolute;
            left: 0;
            bottom:-20px;
          }
          .error{
            border:1px solid red !important;
          }
          input {
            height: 47px !important;
            font-size: 16px;  
            margin-top: 10px;
            padding: 10px 20px !important;
            color: ${palette('primary', 15)} !important;
            background-color: ${palette('background', 2)} !important;
            border-radius: 6px;
            border-color: ${palette('secondary', 11)} !important;
            &:-webkit-autofill,
            &:-webkit-autofill:hover, 
            &:-webkit-autofill:focus, 
            &:-webkit-autofill:active  {
                -webkit-box-shadow: 0 0 0 30px #2e3548 inset !important;
                -webkit-text-fill-color:  ${palette('primary', 15)} !important;
            }
            &::-webkit-input-placeholder {
              color: ${palette('primary', 15)} !important;
            }

            &:-moz-placeholder {
              color: ${palette('primary', 15)} !important;
            }

            &::-moz-placeholder {
              color: ${palette('primary', 15)} !important;
            }
            &:-ms-input-placeholder {
              color: ${palette('primary', 15)} !important;
            }
          }
      }
      .isoLeftRightComponent{
        justify-content: flex-start;
        //padding-top: 20px;
        margin-bottom: 20px;
        span{
          font-size: 14px;
          color: ${palette('gray', 9)};
          &:last-child{
            vertical-align: middle;
          }
        }
        .ant-checkbox-wrapper{
          color: ${palette('primary', 15)};
        }
        .ant-checkbox-inner{
          background-color:  ${palette('background', 2)};
          border-color: ${palette('secondary', 11)} ;
        }
      }
      .isoSignInBtnWrapper{
        text-align: center;
        .ant-btn{
          width: 100%;
        }
      }
      .isoCenterComponent{
        width: 100%;
        text-align: center;
        a{
          color: ${palette("gray", 11)};
          text-decoration: underline;
        }
      }
      .isoHelperText {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        color: ${palette("gray", 1)};
        padding-left: ${props =>
          props["data-rtl"] === "rtl" ? "inherit" : "13px"};
        padding-right: ${props =>
          props["data-rtl"] === "rtl" ? "13px" : "inherit"};
        margin: 15px 0;
        position: relative;
        display: flex;
        align-items: center;

        &:before {
          content: "*";
          color: ${palette("error", 0)};
          padding-right: 3px;
          font-size: 14px;
          line-height: 1;
          position: absolute;
          top: 2px;
          left: ${props => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
          right: ${props => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
        }
      }

      .isoOtherLogin {
        padding-top: 40px;
        margin-top: 35px;
        border-top: 1px dashed ${palette("grayscale", 2)};

        > a {
          display: flex;
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .isoForgotPass {
        margin-top: 20px;
        text-align: center;
        display: block;
        color:  ${palette('primary', 15)};
        //text-decoration: underline;
        cursor: pointer;
        &:hover {
         // color: ${palette("primary", 0)};
        }
      }
      button {
        font-size: 16px;
        font-weight: 500 !important;
        text-transform: capitalize;
        padding: 5px 20px;
        border-radius: 5px;
        height: 47px;
        &:hover{
            border-color:${palette("primary1", 4)};
            background-color: ${palette("primary1", 4)};
        }
      }
    }
  }
  .isoHelperWrapper {
    margin-top: 17px;
    //flex-direction: column;
    text-align: center;
    div{
      font-size: 16px;
      color: ${palette('primary', 15)};
      display: inline-block;
    }
    span{
      font-size: 16px;
      color: ${palette("primary1", 4)} ;
      margin-left: 3px;
    }
  }
  .footer{
    color:${palette('primary', 15)};
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
  }
`;

export default WithDirection(SignInStyleWrapper);
