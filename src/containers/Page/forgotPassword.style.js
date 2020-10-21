import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../settings/withDirection';
// import BackgroundImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';

const ForgotPasswordStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
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

  .isoFormContentWrapper {
    width: 38.6%;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
    margin: 0 auto;
    margin-top: 136px;
    @media only screen and (max-width : 1024px){
      width:100%;
      max-width: 395px;
    }
  }

  .isoFormContent {
    min-height: 100%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
   // padding: 70px 50px;
   padding-bottom: 10px;
    position: relative;
    // background-color: #ffffff;
    background-color: ${palette("background", 1)};
    @media only screen and (max-width: 395px) {
      //padding:10px 20px 10px 20px;
      border-radius: 0px;
    }
    .header_{
      background-color: ${palette("background", 0)};
      color:${palette("primary", 14)};
      padding:15px 32px;
      border-radius: 6px 6px 0px 0px;
      h5{
        font-size:1.5rem;
        display: block;
        margin-bottom: 5px;
        color:${palette("primary", 14)};
      }
    }
    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 70px;
      justify-content: center;

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${palette('secondary', 2)};
      }
    }

    .isoFormHeadText {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      justify-content: center;

      h3 {
        font-size: 24px;
        font-weight: 500;
        line-height: 1.2;
        text-align:center;
        margin: 0 0 20px;
        color: ${palette('gray', 9)};
      }

      p {
        font-size: 13px;
        font-weight: 400;
        line-height: 1.2;
        margin: 0;
        color: ${palette('text', 2)};
      }
    }

    .isoForgotPassForm {
      width: 100%;
      max-width: 680px;
      padding:40px 32px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 25px;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }
        label{
          margin-bottom: 5px;
          color:${palette('primary', 15)};
        }

        input {
          height: 47px !important;
          font-size: 16px;  
          margin-top: 15px;
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

        button {
          height: 42px;
          width: 100%;
          font-weight: 500;
          font-size: 13px;
          padding: 0px;
        }
      }
      .errorMessage{
        font-size: 12px;
        color: #f46a6a;
        position:absolute;
        left: 0;
        bottom:-16px;
        //color:#ffffff;
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
`;

export default WithDirection(ForgotPasswordStyleWrapper);
