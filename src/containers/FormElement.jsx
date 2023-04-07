import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { getFromLocalStorage } from '../services/StorageService';

import { isValidField } from '../helpers/formValidation';

import { STORAGE_KEYS } from '../constants/Miscellaneous';

import { appContext } from '../appContext/AppProvider';

import SubmitButton from '../components/SubmitButton';

import FieldSection from './FieldSection';

const ParentWrapper = styled.div`
  width: 100%;

  .question {
    color: white;
    font-size: 20px;
    line-height: 28px;

    @media (min-width: 992px) {
      font-size: 24px;
      line-height: 32px;
    }
  }

  .description {
    margin-top: 8px;
    color: #ffffffb3;
    font-size: 16px;
    line-height: 24px;

    @media (min-width: 992px) {
      font-size: 20px;
      line-height: 28px;
    }
  }

  .note {
    margin-top: 16px;
    color: #ffffffb3;
    font-size: 16px;
    line-height: 24px;

    @media (min-width: 992px) {
      font-size: 20px;
      line-height: 28px;
    }
  }
`;

function FormElement(props) {
  const {
    setNextFieldIndex,
    fieldIndex,
    lastFieldIndex,
    formDetails,
    formDetails: {
      question = '',
      description = '',
      note = '',
      fieldName = '',
      buttonText = '',
      helperText = '',
      isSubmitForm = false
    }
  } = props;

  const { dispatch } = useContext(appContext);

  const [isFieldInView, setIsFieldInView] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [error, setError] = useState('');

  const fieldRef = useRef(null);

  async function handleFormSubmit(formToSubmit) {
    try {
      setSubmitLoader(true);

      const submitResponse = await axios({
        url: 'https://eo3oi83n1j77wgp.m.pipedream.net',
        method: 'POST',
        data: formToSubmit
      });

      if (submitResponse?.status === 200) {
        dispatch({ type: 'setIsFormSubmitted', payload: true });
      }
      console.log('submitResponse', submitResponse);
    } catch (error) {
      console.log('submitResponse', submitResponse);
    } finally {
      setSubmitLoader(false);
    }
  }

  function onSubmit(formToSubmit) {
    const nextIndex = fieldIndex + 1;

    // Prevent transition once you reach last field
    if (nextIndex <= lastFieldIndex) {
      setNextFieldIndex(nextIndex);
    } else {
      handleFormSubmit(formToSubmit);
    }
  }

  function handleSubmit() {
    const latestForm = getFromLocalStorage(STORAGE_KEYS.form);
    const currentFieldValue = latestForm?.[fieldName];

    const { isValid, error: errorMessage } = isValidField(currentFieldValue, formDetails);

    if (isValid && !errorMessage) {
      onSubmit(latestForm);
    } else {
      setError(errorMessage);
    }
  }

  function onEnterPressed(event) {
    if (event.code === 'Enter') {
      handleSubmit();
    }
  }

  useEffect(() => {
    // check if current Field is in view
    const element = fieldRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsFieldInView(true);
      } else {
        setIsFieldInView(false);
      }
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (isFieldInView) {
      if (!isSubmitForm) {
        document.addEventListener('keyup', onEnterPressed);
      }
    } else {
      document.removeEventListener('keyup', onEnterPressed);
    }
  }, [isFieldInView, isSubmitForm]);

  return (
    <ParentWrapper ref={fieldRef}>
      {question ? <div className="question">{question}</div> : null}

      {description ? <div className="description">{description}</div> : null}

      {note ? <div className="note">{note}</div> : null}

      {fieldName ? (
        <FieldSection
          formDetails={formDetails}
          isFieldInView={isFieldInView}
          handleSubmit={handleSubmit}
          error={error}
          setError={setError}
          isSubmitLoader={submitLoader}
        />
      ) : (
        <SubmitButton buttonText={buttonText} helperText={helperText} handleSubmit={onSubmit} />
      )}
    </ParentWrapper>
  );
}

export default FormElement;
