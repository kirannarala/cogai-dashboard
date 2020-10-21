import styled from "styled-components";
import { palette } from "styled-theme";
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from "../../settings/withDirection";

const AnalyticsStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  //align-items: center;
  position: relative;
  background-color: ${palette("background", 5)};
  > div {
    padding: 10px 20px;
    .page_header {
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      padding-bottom: 24px;
      // padding-left: 10px;
      // padding-right: 10px;
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
    .ant-select-selection-selected-value{
      font-size: 16px;
      font-weight: 500;
    }
    .isoVCardWidgetWrapper {
      background-color: ${palette("background", 2)};
      border-color: ${palette("secondary", 11)};
      border-radius: 4px;
      height: 111px !important;
      display: flex;
      flex-direction: unset;
      padding: 5px 20px;
      .isoVCardImage{
        margin-bottom: 0px;
        height:60px;
        width: 60px;
      }
      .isoVCardBody{
        margin-left: 20px;
        width: auto;
      }
      .isoName {
        color: #ffffff;
      }
    }
    .isoBoxWrapper {
      width: 100%;
      margin: 0 auto;
      border-radius: 0px 2px 2px 0px;
      height: auto;
      background-color: ${palette("background", 2)};
      border-color: ${palette("background", 2)};
      .isoBoxTitle {
        color: #ffffff;
      }
    }
    // .apexcharts-yaxis text,
    // .apexcharts-xaxis text {
    //   fill: #bfc8e2;
    // }
    .apexcharts-legend-text {
      color: #c3cbe4 !important;
    }
  }
  .profile_block{
    .isoWidgetsWrapper{
      margin: 0px;
    }
  }
  .stats_block{
    .isoWidgetsWrapper{
      margin-right: 0px;
    }
  }
  .cardtitle{
    div{
      text-align: left;
      color: #a6b0cf;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 31px;
    }
    span{
      text-align: left;
      color: #a6b0cf;
      margin-bottom: 16px;
      font-size: 16px;
    }
  }
  .isoBoxWrapper{
    > div:first-child{
      display: inline-block;
      .isoBoxTitle{
        font-size: 20px;
        font-weight: 600;
      }
      .isoBoxSubTitle{
        font-size: 14px;
        color: #ffffff;
        padding-left: 25px;
      }
    }
    .ant-select{
      display: inline-block;
      width: 100%;
      max-width: 128px;
      float: right;
      @media only screen and (max-width: 991px) {
        float: none;
        display: block;
        margin-left: auto;
      }
      @media only screen and (max-width: 767px) {
        float: right;
        display: inline-block;
      }
      @media only screen and (max-width: 510px) {
        float: none;
        display: block;
        margin-left: auto;
      }
    }
  }
  .Selected_information_wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
    >div{
      display: inline-block;
      border: 1px solid #a6b0cf;
      color: #ffffff;
      margin-bottom: 6px;
      padding: 30px;
      label{
        display: inline-block;    
        font-size: 19px;
        font-weight: 500;
        color:#a6b0cf;
      }
      span{
        display: inline-block;
        margin-left: 5px;    
        font-size: 28px;
      }
    }
  }
  .live_video_wrapper{
    border-radius: 2px 0px 0px 2px;
    height: 100%;
    position: relative;
    .demand_btn_wrapper{
      display: flex;
      height: 100%;
      position: absolute;
      top:0px;
      align-items: center;
      justify-content: center;
      >div{
        text-align: center;
        h1{
          font-size: 21px;
          color: #ffffff;
          margin-bottom: 10px;
          padding: 0px 10px;
        }
        .ant-btn{
          border-radius: 20px;
          font-size: 18px;
        }
      }
    }
    .live_video_block{
      height: 281px;
      margin-top: 82px;
    }
    img{
      max-height: 400px;
      // object-fit: contain;
      width: auto;
    }
    // .responsiveIFrame{
    //   height: 406px !important;
    //   .video-js{
    //     max-width: 406px;
    //   }
    // }
    .ant-card-body{
      height: 100%;
      padding-top: 22px;
    }
  }
  .ant-card{
    margin: 0px !important;  
    border-radius: 4px;
  }
  // .apexcharts-tooltip{
  //   &-series-group{
  //     &:last-child{
  //       display: none !important;
  //     }
  //   }
  // }
  .nav-item{
    display: inline-block;
  }
  .nav-link{
    display: block;
    padding: .5rem 1rem;
    color: #fff;
    &.active{
      color: #fff;
      background-color: #4482FF;
      border-radius: 4px;
    }
  }
  // .apexcharts-legend{
  //   &-series{
  //     &:last-child{
  //       display: none !important;
  //     }
  //   }
  // }
  .isoStatNumber{
    margin-bottom: 0px;
    height: 28px;
    padding-bottom: 5px;
    border-bottom: 1px solid #fbfbfb;
    .title{
      margin-left: 10px;
      font-size: 15px;
    }
  }
  .Zone_title{
    text-transform: uppercase;
    font-weight: 500;
    font-size: 16px;
    color: #ffffff;
  }
  
.ant-spin-container, .ant-spin-blur{
  min-height: 450px;
}
.chart_ ul{
  margin-left: 25px;
}
.openseadragon .openseadragon-overlay{
  border-radius: 50%;
  opacity: .5;
  background-color: #f98d79;
}
.apexcharts-legend{
  right: 0px; 
  position: absolute; 
  left: 0px; 
  top: auto; 
  bottom: 36px;
  text-align: center;
  &-series{
    margin: 2px 5px;
    display: inline-block;
  }
  &-marker{
    background: #FB4E4E; 
    color: #FB4E4E; 
    height: 12px; width: 12px; 
    left: 0px; 
    top: 0px; 
    border-width: 0px; 
    border-color: rgb(255, 255, 255); 
    border-radius: 2px;
    display: inline-block;
    margin-right: 5px;
  }
  &-text{
    color: rgb(55, 61, 63); 
    font-size: 12px; 
    font-weight: 400; 
    font-family: Helvetica, Arial, sans-serif;
  }
}
`;
  

export default WithDirection(AnalyticsStyleWrapper);
