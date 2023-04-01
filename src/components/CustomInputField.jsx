import { useEffect } from 'react';
import { useContext, useRef, useState } from 'react';

import { appContext } from '../appContext/AppProvider';

function CustomInputField(props) {
  const { fieldName, fieldValue = '', defaultValue, onFieldChange, isFieldInView } = props;

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
    setTextValue(value);
  }

  return <input ref={inputRef} type="text" name={fieldName} value={textValue} onChange={handleInputChange} />;
}

export default CustomInputField;
