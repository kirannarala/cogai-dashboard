import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';
import { palette } from 'styled-theme';

const CoverageStyleWrapper = styled.div`
height: 100%;
.ant-row{
    height: 100%;
}
.box{
    background-color: #2e3548;
    border-color: #32394e;
    // margin:25px 10px 0px;
    padding: 20px;
    position: relative;
    border-radius: 4px;
    height: 100%;
        .header{
            display: flex;
            padding-bottom: 15px;
            justify-content: space-between;
            h3{
                color: #ffffff;
                font-weight: 500;
            }
            >div{
                .ant-btn{
                    &:first-child{
                        margin-right: 10px;
                    }
                    &-default{
                        background-color: transparent;
                        color: #ffffff;
                    }
                }
            }
        }
        img{
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
}
.svg-inline--fa{
    vertical-align: bottom;
}
`;

export default WithDirection(CoverageStyleWrapper);