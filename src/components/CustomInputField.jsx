import { useEffect } from 'react';
import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import { appContext } from '../appContext/AppProvider';

const StyledInput = styled.input`
  width: 100%;
  color: white;
  padding: 0px 0px 8px;
  fill: none;
  border: none;
  outline: none;
  border-radius: 0px;
  transform: translateZ(0px);
  font-size: 30px;
  -webkit-font-smoothing: antialiased;
  line-height: unset;
  -webkit-text-fill-color: rgb(255, 255, 255);
  /* animation: 1ms ease 0s 1 normal none running native-autofill-in; */
  transition: background-color 1e8s ease 0s, box-shadow 0.1s ease-out 0s;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;
  background: transparent !important;

  :focus {
    box-shadow: rgb(255, 255, 255) 0px 2px;
  }
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

  return <StyledInput ref={inputRef} type="text" name={fieldName} value={textValue} onChange={handleInputChange} />;
}

export default CustomInputField;
