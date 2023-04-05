import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { appContext } from '../appContext/AppProvider';

const Wrapper = styled.div`
  position: relative;
  color: rgb(255, 255, 255);

  input {
    width: 100%;
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
  }

  button {
    position: absolute;
    right: 0px;
    top: 2px;
    bottom: 0px;
    background: none;
    border: none;
    font-size: 30px;
    color: inherit;
  }

  .dropdown-parent {
    z-index: 30;
    position: absolute;
    width: 100%;
    background-color: black;
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
    border-radius: var(--sampler-theme-border-radius);
    background-color: rgb(26, 26, 26);
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
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
    opacity: 1;
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

  function handleSearchChange(event) {
    onFieldChange({ [fieldName]: defaultValue });
    setIsOptionSelected(false);
    setSearchValue(event.target.value);
  }

  function handleOpenOptions(value) {
    return function eventFunction() {
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
    onFieldChange({ [fieldName]: defaultValue });
    setSearchValue('');
    setShowDropdown(false);
    setIsOptionSelected(false);
  }

  useEffect(() => {
    if (isFieldInView && inputRef.current) {
      inputRef.current.focus();
    }
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
      {/* <div className="" ref={dropdownRef}> */}
      <input ref={inputRef} onClick={handleOpenOptions(true)} value={searchValue} onChange={handleSearchChange} />

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
      {/* </div> */}
    </Wrapper>
  );
}

export default CustomSelectDropdown;
