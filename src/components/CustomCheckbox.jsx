import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { appContext } from '../appContext/AppProvider';

const Wrapper = styled.div`
  color: white;
  min-width: 250px;
  max-width: fit-content;

  .remaining-selection {
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  .option {
    margin-bottom: 8px;
  }

  input {
    display: none;
  }

  input + label {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    padding: 0px 0px 0px 10px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
    color: rgb(255, 255, 255);
    width: 100%;
    min-height: 40px;
    outline: 0px;
    transition-duration: 0.1s;
    transition-property: background-color, color, border-color, opacity, box-shadow;
    transition-timing-function: ease-out;
    cursor: pointer;
    font-size: 20px;
  }

  input:not([disabled]) + label:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  input:disabled + label {
    opacity: 0.5;
    cursor: auto;
  }

  input:checked + label {
    box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 0px 2px inset;
    /* animation: 0.25s ease 0s 2 normal none running jBPXGM; */
  }

  input:checked + label:after {
    font-family: FontAwesome;
    content: '\f00c';
    font-size: 15px;
    margin-left: 5px;
    position: absolute;
    right: 6px;
  }
`;

function CustomCheckbox(props) {
  const {
    fieldName,
    fieldValue = [],
    defaultValue = [],
    onFieldChange,
    options = [],
    isFieldInView,
    requiredSelectionCount,
    setError
  } = props;

  const {
    state: { fieldsViewedWithValue },
    dispatch
  } = useContext(appContext);

  const [checkedValues, setCheckedValues] = useState(fieldValue || defaultValue);

  const modifyProgressBarRef = useRef(true);

  const isDisableOptions = checkedValues?.length === requiredSelectionCount;

  useEffect(() => {
    onFieldChange({ [fieldName]: [...checkedValues] });
  }, [checkedValues, fieldName]);

  useEffect(() => {
    if (isFieldInView) {
      // Only if element is in view, modify progress bar
      // Ref used to prevent multiple useEffect calls because of fieldsViewedWithValue being updated
      if (!checkedValues?.length && fieldsViewedWithValue && !modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue - 1
        });

        modifyProgressBarRef.current = true;
      } else if (checkedValues?.length && modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue + 1
        });

        modifyProgressBarRef.current = false;
      }
    }
  }, [isFieldInView, checkedValues, fieldsViewedWithValue, dispatch]);

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    const value = Number(event.target.value);

    if (isChecked) {
      setCheckedValues(prevState => [...prevState, value]);
    } else {
      setCheckedValues(prevState => {
        const updated = prevState.filter(item => item !== value);

        return updated;
      });
    }

    setError(false);
  }

  function renderSelectionsRemaining() {
    if (!checkedValues?.length) {
      return `Choose ${requiredSelectionCount}`;
    }

    if (checkedValues?.length < requiredSelectionCount) {
      return `Choose ${requiredSelectionCount - checkedValues.length} more`;
    }

    return '';
  }

  return (
    <Wrapper>
      {requiredSelectionCount > 1 ? <div className="remaining-selection">{renderSelectionsRemaining()}</div> : null}

      <div>
        {options.map(item => {
          const { label, value } = item;
          const isChecked = checkedValues.includes(value);

          return (
            <div key={`${label}_${value}}`} className="option">
              <input
                type="checkbox"
                id={`${label}_${value}`}
                name={fieldName}
                checked={isChecked}
                value={value}
                onChange={handleCheckboxChange}
                disabled={!isChecked && isDisableOptions}
              />

              <label htmlFor={`${label}_${value}`}>{label}</label>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default CustomCheckbox;
