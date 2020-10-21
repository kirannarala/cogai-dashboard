import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const HomeStyleWrapper = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
justify-content: center;
padding: 20px 10px;
//align-items: center;
position: relative;
background-color: ${palette("background", 5)};
.home_wrapper{
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
    .previous_date_Wrappper{
      padding-left: 0px;
    }
    .isoWidgetsWrapper{
        margin:0px;
        .isoWidgetsWrapper{{
            margin: 0px 10px;
        }
    }
    .isoStatNumber{
      margin-bottom: 0px;
      padding-bottom: 5px;
      font-size: 46px;
      height: 56px;
      border-bottom: 1px solid #fbfbfb;
      .title{
        font-size: 30px;
        margin-left: 10px;
      }
    }
    .isoContentWrapper .isoLabel, .ant-select-selection-selected-value{
        font-size:21px;
        font-weight: 500;
    }
    .isoLabel{
      h3{
        font-size: 24px;
      }
      span{
        font-size: 18px;
      }
    }
}
/*chart styles */

.isoBoxWrapper {
    width: 100%;
    margin: 0 auto;
    border-radius: 4px;
    height: auto;
    background-color: ${palette("background", 2)};
    border-color: ${palette("secondary", 11)};
    .isoBoxTitle {
      color: #ffffff;
    }
}
.apexcharts-legend-text {
    color: #c3cbe4 !important;
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
    background-color: #556ee6;
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
      }
    }
}
.blocks_{
  .ant-row .ant-col{
    &:first-child{
      .isoWidgetsWrapper{
        margin-left: 0px;
      }
    }
    &:last-child{
      .isoWidgetsWrapper{
        margin-right: 0px;
      }
    }
  }
}
.ant-spin-container, .ant-spin-blur{
  min-height: 450px;
}
`;

export default WithDirection(HomeStyleWrapper);