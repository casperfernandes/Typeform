import styled from 'styled-components';

const StyledLoader = styled.div`
  border: 5px solid #9f9f9f;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  color: grey;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Loader() {
  return <StyledLoader />;
}

export default Loader;
