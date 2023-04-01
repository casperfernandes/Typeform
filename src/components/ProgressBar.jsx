import { useContext } from 'react';
import styled from 'styled-components'

import { appContext } from '../appContext/AppProvider';

const WrapperDiv = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 30;

    .non-highlighted {
        height: 4px;
        background-color: #0077ff4d;
    }

    .highlighted {
        height: 100%;
        background-color: #0077ff;

        ${props => `
        width: ${props.percentCompleted || 0}%;
        `};
    }
`

function ProgressBar() {
    const {
        state: { fieldsViewedWithValue, totalFields }
    } = useContext(appContext);

    const percentCompleted = (fieldsViewedWithValue / totalFields * 100) || 0;

    return (
        <WrapperDiv percentCompleted={percentCompleted}>
            <div className="non-highlighted">
                <div className="highlighted" />
            </div>
        </WrapperDiv>
    );
}

export default ProgressBar;
