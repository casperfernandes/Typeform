import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { STORAGE_KEYS } from './constants/Miscellaneous';

import { getFromLocalStorage, setToLocalStorage } from './services/StorageService';

import ProgressBar from './components/ProgressBar';
import Header from './components/Header';

import FormElement from './containers/FormElement';
import Form from './form';
import { appContext } from './appContext/AppProvider';

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
  const { dispatch } = useContext(appContext);

  const [nextFieldIndex, setNextFieldIndex] = useState(0);

  const formContent = Form();

  useEffect(() => {
    // On page load, update local storage values with latest form structure
    const formValue = getFromLocalStorage(STORAGE_KEYS.form);
    const updatedFormValues = {};

    formContent.forEach(content => {
      const fieldName = content?.fieldName;

      if (fieldName) {
        updatedFormValues[fieldName] = formValue?.[fieldName] || content.defaultValue;
      }
    });

    setToLocalStorage(STORAGE_KEYS.form, updatedFormValues);

    // set total field elements in form
    dispatch({ type: 'setTotalFields', payload: Object.keys(updatedFormValues)?.length });

    // Page will start from the top on every reload
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      <Header />

      <ProgressBar />

      <WrapperDiv nextFieldIndex={nextFieldIndex}>
        {formContent.map((item, index) => (
          <div key={index} id={`content_${index}`} className="singleField">
            <FormElement
              formDetails={item}
              fieldIndex={index}
              setNextFieldIndex={setNextFieldIndex}
              lastFieldIndex={formContent.length - 1}
            />
          </div>
        ))}
      </WrapperDiv>
    </>
  );
}

export default App;
