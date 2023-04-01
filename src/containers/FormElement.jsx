import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

  const fieldRef = useRef(null);

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

  function onSubmit() {
    const nextIndex = fieldIndex + 1;

    // Prevent transition once you reach last field
    if (nextIndex <= lastFieldIndex) {
      setNextFieldIndex(nextIndex);
    }
  }

  return (
    <>
      <div ref={fieldRef}>
        {question ? <QuestionWrapper>{question}</QuestionWrapper> : null}

        {description ? <DescriptionWrapper>{description}</DescriptionWrapper> : null}

        {fieldName ? (
          <FieldSection formDetails={formDetails} isFieldInView={isFieldInView} onSubmit={onSubmit} />
        ) : (
          <SubmitButton buttonText={buttonText} helperText={helperText} handleSubmit={onSubmit} />
        )}
      </div>

      <Spacer />
    </>
  );
}

export default FormElement;
