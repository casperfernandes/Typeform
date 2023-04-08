import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { appContext } from '../appContext/AppProvider';

const Wrapper = styled.div`
  position: relative;
  color: rgb(255, 255, 255);
  font-size: 30px;

  input {
    padding: 0px 40px 8px 0px;
  }

  button {
    position: absolute;
    right: 0px;
    top: 2px;
    bottom: 0px;
    background: none;
    outline: none;
    border: none;
    font-size: inherit;
    color: inherit;
  }

  .dropdown-parent {
    z-index: 30;
    position: absolute;
    width: 100%;
    background-color: black;
    margin-top: 1px;
  }

  ul {
    max-height: 425.5px;
    transition: max-height 150ms ease-out 0s;
    overflow: auto;
    margin: 0px;
    padding: 8px 0px 16px;
  }

  li {
    margin-bottom: 4px;
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 4px;
    background-color: rgb(26, 26, 26);
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
    max-width: 100%;
    min-width: 75px;
    min-height: 40px;
    outline: 0px;
    padding: 4px 0px 4px 10px;
    transition-duration: 0.1s;
    transition-property: background-color, color, border-color, opacity, box-shadow;
    transition-timing-function: ease-out;
    width: 100%;
    cursor: pointer;
    opacity: 1;
    font-size: 16px;
    line-height: 24px;
  }
`;

function CustomSelectDropdown(props) {
  const { fieldName, fieldValue, defaultValue, onFieldChange, options, isFieldInView, handleSubmit, error, setError } = props;

  const {
    state: { fieldsViewedWithValue },
    dispatch
  } = useContext(appContext);

  const [searchValue, setSearchValue] = useState(fieldValue?.[0]?.label || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOptionSelected, setIsOptionSelected] = useState(!!fieldValue?.length);

  const inputRef = useRef();
  const dropdownRef = useRef();
  const modifyProgressBarRef = useRef(true);

  function handleInputFocus() {
    if (inputRef?.current && window.innerWidth >= 992) {
      inputRef.current.focus({ preventScroll: true });
    }
  }

  function handleSearchChange(event) {
    setShowDropdown(true);
    onFieldChange({ [fieldName]: defaultValue });
    setIsOptionSelected(false);
    setSearchValue(event.target.value);
  }

  function handleOpenOptions(value) {
    return function eventFunction() {
      handleInputFocus();

      if (value === true || value === false) {
        setShowDropdown(value);
      } else {
        setShowDropdown(prevState => {
          return !prevState;
        });
      }
    };
  }

  function handleOptionClick(option) {
    return function eventFunction() {
      const { label, value } = option;

      onFieldChange({ [fieldName]: [{ id: value, label }] });
      setSearchValue(label);
      setShowDropdown(false);
      setIsOptionSelected(true);
      handleSubmit();
    };
  }

  function handleClearSelection() {
    handleInputFocus();

    onFieldChange({ [fieldName]: defaultValue });
    setSearchValue('');
    setShowDropdown(false);
    setIsOptionSelected(false);
  }

  useEffect(() => {
    handleInputFocus();
  }, [isFieldInView]);

  useEffect(() => {
    if (isFieldInView) {
      // Only if element is in view, modify progress bar
      // Ref used to prevent multiple useEffect calls because of fieldsViewedWithValue being updated
      if (!isOptionSelected && fieldsViewedWithValue && !modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue - 1
        });

        modifyProgressBarRef.current = true;
      } else if (isOptionSelected && modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue + 1
        });

        modifyProgressBarRef.current = false;
      }
    }
  }, [isFieldInView, isOptionSelected, fieldsViewedWithValue, dispatch]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (!dropdownRef?.current?.contains?.(event.target)) {
        setShowDropdown(false);
      }
    };

    if (isFieldInView) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setShowDropdown(false);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFieldInView]);

  useEffect(() => {
    let filtered = [...options];

    if (searchValue) {
      const splitSearchValue = searchValue.toLowerCase().split('');
      const re = RegExp(`.*${splitSearchValue.join('.*')}.*`);

      filtered = [];
      options.forEach(item => {
        const lowerCaseItemLabel = item.label.toLowerCase();

        if (lowerCaseItemLabel.match(re)) {
          filtered.push({ value: item.value, label: item.label });
        }
      });
    }

    if (!filtered?.length) {
      setError('No suggestions found');
    } else {
      setError('');
    }

    setFilteredOptions([...filtered]);
  }, [searchValue, options, setError]);

  return (
    <Wrapper ref={dropdownRef}>
      <input
        ref={inputRef}
        placeholder="Type or select an option"
        onClick={handleOpenOptions(true)}
        value={searchValue}
        onChange={handleSearchChange}
      />

      {searchValue ? (
        <button onClick={handleClearSelection}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      ) : (
        <button onClick={handleOpenOptions()}>
          {showDropdown ? (
            <i className="fa fa-angle-up" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          )}
        </button>
      )}

      {showDropdown && filteredOptions?.length ? (
        <div className="dropdown-parent">
          <ul role="listbox">
            {filteredOptions.map(item => (
              <li key={item.value} role="option" onClick={handleOptionClick(item)}>
                <div id="option-div">{item.formattedLabel || item.label}</div>
                {/* <input type="checkbox" id={`selectDropdown_${item.index}_${item.label}`} value={item.value} name={fieldName} checked={} />
                                                    <label for={`selectDropdown_${item.index}_${item.label}`}>{item.label}</label> */}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default CustomSelectDropdown;
