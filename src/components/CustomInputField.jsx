import { useEffect } from 'react';
import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import { appContext } from '../appContext/AppProvider';

const StyledInput = styled.input`
  padding: 0px 0px 8px;
`;

function CustomInputField(props) {
  const { fieldName, fieldValue = '', defaultValue, onFieldChange, isFieldInView, error, setError } = props;

  const {
    state: { fieldsViewedWithValue },
    dispatch
  } = useContext(appContext);

  const [textValue, setTextValue] = useState(fieldValue || defaultValue);

  const inputRef = useRef();
  const modifyProgressBarRef = useRef(true);

  useEffect(() => {
    if (isFieldInView && inputRef?.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isFieldInView]);

  useEffect(() => {
    if (isFieldInView) {
      // Only if element is in view, modify progress bar
      // Ref used to prevent multiple useEffect calls because of fieldsViewedWithValue being updated
      if (!textValue && fieldsViewedWithValue && !modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue - 1
        });

        modifyProgressBarRef.current = true;
      } else if (textValue && modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue + 1
        });

        modifyProgressBarRef.current = false;
      }
    }
  }, [isFieldInView, textValue, fieldsViewedWithValue, dispatch]);

  function handleInputChange(event) {
    const value = event.target.value;
    onFieldChange({ [event.target.name]: value });
    setError('');
    setTextValue(value);
  }

  return (
    <StyledInput
      ref={inputRef}
      type="text"
      placeholder="Type your answer here..."
      name={fieldName}
      value={textValue}
      onChange={handleInputChange}
    />
  );
}

export default CustomInputField;
