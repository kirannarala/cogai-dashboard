import styled from 'styled-components';
import { palette } from 'styled-theme';
// import bgImage from '../../image/Background.jpg';
// import BackgroundImageForMobile from '../../image/mobile_Background.jpg';
import WithDirection from '../../settings/withDirection';

const VideoStyleWrapper = styled.div`
    .camera{
        h3{
            color: #ffffff;
            margin-bottom: 0.5em;
            text-transform: capitalize;
            &.non_editable{
                cursor: default;
            } 
            &.editable{
                cursor: pointer;
            }
            i{
                margin-left: 10px;
            }
        }
        .responsiveIFrame{
            position: relative;
            display: block;
            width: 100%;
            padding: 0;
            height: 200px;
            overflow: hidden;
            &::before{
                display: block;
                content: "";
                // padding-top: 56.25%;
            }
            .video-js{
                max-width: 400px;
                width: 100%;
                height: 100%;
                margin: 0 auto;
            }
        }
        .embed-responsive-item{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 0;
        }
    }
`
export default WithDirection(VideoStyleWrapper);