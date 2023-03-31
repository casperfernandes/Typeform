import styled from 'styled-components';

const StyledHeader = styled.header`
    position: fixed;
    z-index: 30;
    padding: 14px 16px 10px;
    pointer-events: none;

    img {
        max-height: 40px;
        max-width: 96px;
        margin: 0;
    }
`

function Header() {
    return (
        <StyledHeader>
            <img src="../images/logo.png" alt="logo" />
        </StyledHeader>
    );
}

export default Header;
