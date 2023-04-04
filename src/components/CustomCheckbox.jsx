import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;

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
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
    color: rgb(255, 255, 255);
    max-width: 100%;
    min-width: 75px;
    min-height: 40px;
    outline: 0px;
    padding-top: 4px;
    padding-bottom: 4px;
    transition-duration: 0.1s;
    transition-property: background-color, color, border-color, opacity, box-shadow;
    transition-timing-function: ease-out;
    width: 100%;
    cursor: pointer;
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
    font-size: 14px;
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
    allowSelectionCount
  } = props;

  const [checkedValues, setCheckedValues] = useState(fieldValue || defaultValue);

  const isDisableOptions = checkedValues?.length === allowSelectionCount;

  useEffect(() => {
    onFieldChange({ [fieldName]: [...checkedValues] });
  }, [checkedValues, fieldName]);

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
  }

  function renderSelectionsRemaining() {
    if (!checkedValues?.length) {
      return `Choose ${allowSelectionCount}`;
    }

    if (checkedValues?.length < allowSelectionCount) {
      return `Choose ${allowSelectionCount - checkedValues.length} more`;
    }

    return '';
  }

  return (
    <Wrapper>
      {allowSelectionCount > 1 ? <div className="remaining-selection">{renderSelectionsRemaining()}</div> : null}

      <div>
        {options.map(item => {
          const { label, value } = item;
          const isChecked = checkedValues.includes(value);
          console.log(label, isChecked);

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
