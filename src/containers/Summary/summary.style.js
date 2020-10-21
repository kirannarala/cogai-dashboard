import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../settings/withDirection';

const SummaryBlockStyleWrapper = styled.div`
    .isoContentWrapper{
        padding-left: 15px;
        padding-bottom: 25px;
        .ant-select{
            width: 100%;
            color: #ffffff;
            &-open{
                .ant-select-selection{
                    border:none !important;
                    box-shadow: none !important;
                }
            }
            &-selection{
                background-color:transparent;
                border:none !important;
                box-shadow: none !important;
                &--single{
                    height: auto !important;
                }
                &__rendered{
                    margin-left: 0px !important;
                }
                &__placeholder{
                    color: #ffffff;
                    font-size: 24px;
                }
            }
            &-arrow{
                &-icon{
                    color: #ffffff;
                }
            }
        }   
        .isoLabel{
            height: 33px;
            >div{
                position: relative;
                h3{
                    font-size: 16px;
                    color: #ffffff;
                    // display: inline-block;
                }
                span{
                    font-size: 13px;
                    font-weight: 400;
                    // position: absolute;
                    // left: 35px;
                    // bottom: -18px;
                }
            }
        }
    }
`;

export default WithDirection(SummaryBlockStyleWrapper);