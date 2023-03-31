import { useState } from 'react';
import styled from 'styled-components';

import ProgressBar from './components/ProgressBar';
import Header from './components/Header';

import Form from './form';

const WrapperDiv = styled.div`
  padding: 0px 40px;
  background-color: black;

  .singleField {
    display: grid;
    place-content: center;
    max-width: 720px;
    margin: 0px auto;
    height: 100vh;
    border: 1px solid red;
    transition: transform 600ms ease 0s, opacity 300ms ease 0s;
    transform: ${props => (props.nextFieldIndex ? `translateY(${-100 * props.nextFieldIndex}vh)` : undefined)};
  }
`;

function App() {
  const [nextFieldIndex, setNextFieldIndex] = useState(0);

  const formContent = Form();

  return (
    <>
      <Header />

      <ProgressBar />

      <WrapperDiv nextFieldIndex={nextFieldIndex}>
        {formContent.map((item, index) => (
          <div key={index} id={`content_${index}`} className="singleField"></div>
        ))}
      </WrapperDiv>
    </>
  );
}

export default App;
