import styled from 'styled-components'

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
    }
`

function ProgressBar() {

    return (
        <WrapperDiv>
            <div className="non-highlighted">
                <div className="highlighted" />
            </div>
        </WrapperDiv>
    );
}

export default ProgressBar;
