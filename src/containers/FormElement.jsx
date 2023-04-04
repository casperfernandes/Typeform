import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { getFromLocalStorage } from '../services/StorageService';

import { isValidField } from '../helpers/formValidation';

import { STORAGE_KEYS } from '../constants/Miscellaneous';

import SubmitButton from '../components/SubmitButton';

import FieldSection from './FieldSection';

const QuestionWrapper = styled.div`
  color: white;
  font-size: 24px;
  line-height: 32px;
`;

const DescriptionWrapper = styled.div`
  font-size: 20px;
  line-height: 28px;
  color: #ffffffb3;
`;

const Spacer = styled.div`
  margin-top: 10px;
`;

function FormElement(props) {
  const {
    setNextFieldIndex,
    fieldIndex,
    lastFieldIndex,
    formDetails,
    formDetails: { question = '', description = '', fieldName = '', buttonText = '', helperText = '' }
  } = props;

  const [isFieldInView, setIsFieldInView] = useState(false);
  const [error, setError] = useState('');

  const fieldRef = useRef(null);

  const isLastField = fieldIndex === lastFieldIndex;

  function onSubmit() {
    const nextIndex = fieldIndex + 1;

    // Prevent transition once you reach last field
    if (nextIndex <= lastFieldIndex) {
      setNextFieldIndex(nextIndex);
    }
  }

  function handleSubmit() {
    const latestForm = getFromLocalStorage(STORAGE_KEYS.form);
    const currentFieldValue = latestForm?.[fieldName];

    const { isValid, error: errorMessage } = isValidField(currentFieldValue, formDetails);

    if (isValid && !errorMessage) {
      onSubmit();
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
      if (!isLastField) {
        document.addEventListener('keyup', onEnterPressed);
      }
    } else {
      document.removeEventListener('keyup', onEnterPressed);
    }
  }, [isFieldInView, isLastField]);

  return (
    <>
      <div ref={fieldRef}>
        {question ? <QuestionWrapper>{question}</QuestionWrapper> : null}

        {description ? <DescriptionWrapper>{description}</DescriptionWrapper> : null}

        {fieldName ? (
          <FieldSection
            formDetails={formDetails}
            isFieldInView={isFieldInView}
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
          />
        ) : (
          <SubmitButton buttonText={buttonText} helperText={helperText} handleSubmit={onSubmit} />
        )}
      </div>

      <Spacer />
    </>
  );
}

export default FormElement;
