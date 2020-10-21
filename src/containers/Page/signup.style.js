import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const SignUpStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  //align-items: center;
  position: relative;
  background-size: cover;
  background-position-y: top;
  background-color: ${palette("gray", 1)};
    // @media only screen and (max-width : 1024px){
    //   background-size: cover;
    // }
  // &:before {
  //   content: '';
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   background-color: rgba(0, 0, 0, 0.6);
  //   position: absolute;
  //   z-index: 1;
  //   top: 0;
  //   left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
  //   right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  // }

  .isoSignUpContentWrapper {
    //width: 787px;
    width: 38.6%;
    height: auto;
   // overflow-y: auto;
    z-index: 10;
    position: relative;
    margin-top: 134px;
    opacity: .95;
    margin-bottom: 73px;
    min-width:580px;
    @media only screen and (max-width : 580px){
      min-width:320px;
      width: 100%;
    }
  }

  .isoSignUpContent {
    //min-height: 100%;
    display: flex;
    flex-direction: column;
    //padding: 29px 141px 44px;
    //padding-bottom: 10px;
    position: relative;
    background-color: ${palette("background", 1)};
    border-radius: 12px;
    box-shadow: 7px 8px 19px 0 rgba(0,0,0,0.04);
    @media only screen and (max-width: 707px) {
      width: 100%;
      padding: 70px 40px;
      border-radius: 0px;
    }
    .ant-spin-blur{
      opacity: 0.4;
      &::after{
        opacity: 0.1;
        border-radius: 6px;
      }
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
    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      justify-content: center;
      flex-shrink: 0;

      h2{
        font-size: 24px;
        line-height: 1;
        text-transform: capitalize;
        color: ${palette("primary1", 2)};
        span{
          font-weight: bold;
          text-transform: uppercase;
        }
      }
    }

    .isoSignUpForm {
      width: 100%;
      flex-shrink: 0;
      padding:50px 32px 20px;
      display: flex;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 25px;  
        position:relative;
        .password_hint{
          font-size: 10px;
          font-weight: 500;
          display: block;
        }
        label{
          color:${palette('primary', 15)};
        }
        .ant-radio-wrapper{
          font-size: 16px;
          color: ${palette('gray', 9)};
          span{
            vertical-align: middle;
            font-size: 18px;
          }
          .ant-radio-inner:after{
            background-color:${palette("primary1", 2)};
          }
          .ant-radio-checked .ant-radio-inner{
              border-color:${palette("primary1", 2)};
          }
        }
        .required{
          position: absolute;
          font-size: 25px;
          left: -15px;
          top:18%;
          color: ${palette('gray', 9)};
        }
        .errorMessage{
          font-size: 12px;
          color: #f46a6a;
          position:absolute;
          left: 0;
          bottom:-16px;
          //color:#ffffff;
        }

        &:last-child {
          margin-bottom: 0;
          text-align:center;
        }
        .error{
          border:1px solid red !important;
        }
        input {
          height: 47px !important;
          margin-top: 15px;
          font-size: 16px;  
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
        .ant-select{
          color: ${palette('gray', 9)};
          &-selection__placeholder,
          &-arrow{
            color: ${palette('gray', 9)};
          }
          &-selection{
            border: 1px solid ${palette('gray', 8)};
            &-selected-value{
              padding-top:6px;
            }
          }
        }
        .visibility_btn{
          position: absolute;
          font-size: 12px;
          right: 0px;
          height: 26px;
          background: transparent;
          border: none !important;
          top: 42%;
          box-shadow: none !important;
          padding-right: 10px;
          padding-left: 10px;
          color:${palette("primary", 0)};
          &:hover{
            color:${palette("primary1", 4)};
          }
          &:focus{
            color:${palette("primary1", 4)};
          }
          span:after{
            border: none;
            box-shadow: none !important;
          }
        }
      }

      .conditions_wrapper{
        .ant-checkbox-inner{
          width: 18px;
          height: 18px;
          border: 1px solid ${palette("primary1", 4)};
          display: inline-block;
          border-radius: 4px;
          margin-right: 3px;
        }
        .ant-checkbox-checked .ant-checkbox-inner{
          background-color:${palette('primary1', 4)};
        }
      }
      .spaceForErrors{
        margin-bottom: 25px;
      }
      .hint{
        text-align: right;
        font-size: 14px;
        color: ${palette('gray', 9)};
        div{
          display:inline-block;
          position: relative;
          span{
            position: absolute;
            left: -10px;
            font-size: 20px;
            top: -5px;
          }
        }
      }
      .termsWrapper{
        font-size: 12px;
        padding-top: 10px;
        text-align: center;
        //display: none;
        > span{
          display: block;
        }
        a{
          color:${palette("primary1", 4)};
          transition: all 1s linear;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    .serverErrorMessage{
      text-align:center;
      color:${palette("primary1", 5)};
    }
  }
  .isoSignInBtnWrapper{
    text-align: center;
    padding-top: 20px;
    .ant-btn{
      width: 100%;
      font-size: 16px;
      height: 47px;
      font-weight: 500 !important;
      text-transform: capitalize;
      padding: 5px 20px;
      border-radius: 5px;
      &:hover{
          border-color:${palette("primary1", 4)};
          background-color: ${palette("primary1", 4)};
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
  }
  .ant-checkbox-checked .ant-checkbox-inner{
    background-color:${palette('primary1', 4)};
  }
  .ant-checkbox-inner{
      border-color:${palette('primary1', 4)} !important;
  }
`;

export default WithDirection(SignUpStyleWrapper);
