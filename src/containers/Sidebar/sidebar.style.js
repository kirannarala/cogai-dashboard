import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../settings/style-util';
import Logo from '../../image/cogAI_white.png';
import ShortLogo from '../../image/cogAI_white.png';
import WithDirection from '../../settings/withDirection';
import Home from '../../image/home_grey.png';
import HomeWhite from '../../image/home_white.png';
import Analytics from '../../image/analytics_grey.png';
import AnalyticsWhite from '../../image/analytics_white.png';
import Notification from '../../image/notifications_grey.png';
import NotificationWhite from '../../image/notifications_white.png';
import Settings from '../../image/settings_grey.png';
import SettingsWhite from '../../image/settings_white.png';
import UserSummary from '../../image/useradmin_grey.png';
import UserSummaryWhite from '../../image/useradmin_white.png';

const SidebarWrapper = styled.div`
  .isomorphicSidebar {
    z-index: 1000;
    background: ${palette('secondary', 0)};
    width: 280px;
    flex: 0 0 280px;
    .scroll-content{
      height: inherit;
      >div{
        height: inherit;
      }
    }
    .scrollarea {
      height: calc(100vh - 70px);
    }
    .logo{
      width: 134px;
      height: 43px;
      background-image: url(${Logo});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display:block;
      cursor:pointer;
      margin: 0 auto;
    }
    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
      .logo{
        background-image: url(${ShortLogo});
        width: 40px;
        height: 35px; 
        margin: auto;
        background-size: cover;
        background-position-x: left;
        @media only screen and (max-width: 767px) {
          width:0px;
        }
      }
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 70px;
      background: rgba(0, 0, 0, 0.3);
      margin: 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      ${borderRadius()};

      h3 {
        a {
          font-size: 21px;
          font-weight: 300;
          line-height: 70px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${palette('grayscale', 6)};
          display: block;
          text-decoration: none;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .isoLogoWrapper {
        padding: 0;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 10px;
      padding-bottom: 15px;
      background: transparent;
      a {
        text-decoration: none;
        font-weight: 400;
      }

      >.ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 24px;
        margin: 0;
        &:last-child{
          bottom: 100px;
          position: absolute;
          border-top: 1px solid #888888;
          padding-top: 15px;
          padding-bottom: 15px;
        }
        &:hover, &-selected{
          .home{
            background-image: url(${HomeWhite});
          }
          .analytics{
            background-image: url(${AnalyticsWhite});
          }
          .notifications{
            background-image: url(${NotificationWhite});
          }
          .settings{
            background-image: url(${SettingsWhite});
          }
          .userSummary{
            background-image: url(${UserSummaryWhite});
          }
        }
      }
      .ant-menu-submenu-open, .ant-menu-submenu-active{
        .settings{
          background-image: url(${SettingsWhite});
        }
      }
      .home{
        background-image: url(${Home});
      }
      .analytics{
        background-image: url(${Analytics});
      }
      .notifications{
        background-image: url(${Notification});
      }
      .settings{
        background-image: url(${Settings});
      }
      .userSummary{
        background-image: url(${UserSummary});
      }
      .isoMenuHolder {
        display: flex;
        align-items: center;
        .custom_icon{
          margin: 0px 10px 0px 0px;
          img{
            height: 20px;
          }
        }
        i {
          font-size: 19px;
          color: inherit;
          margin: ${props =>
            props['data-rtl'] === 'rtl' ? '0 0 0 30px' : '0 12px 0 0'};
          width: 22px;
          ${transition()};
          background-repeat:no-repeat;
          background-size:contain;
          background-position-y: center;
          height: 20px;
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 18px;
        color: inherit;
        font-weight: 400;
        ${transition()};
      }

      .ant-menu-item-selected {
        background-color: rgba(0, 0, 0, 0.4) !important;
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff;
        }
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: #ffffff;
          }
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 5)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : 'auto')};
          right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '25px')};

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${'' /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            ${transition()};
          } */};
        }

        &:hover {
          .ant-menu-submenu-arrow {
            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: ${props =>
            props['data-rtl'] === 'rtl' ? '0px !important' : '74px !important'};
          padding-right: ${props =>
            props['data-rtl'] === 'rtl' ? '74px !important' : '0px !important'};
          font-size: 16px;
          font-weight: 400;
          margin: 0;
          color: inherit;
          ${transition()};

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline >  {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default WithDirection(SidebarWrapper);
