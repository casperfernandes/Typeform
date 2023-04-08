import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal';
import ErrorComponent from '../components/ErrorComponent';

const Wrapper = styled.div`
  position: absolute;
  z-index: 50;
  background: rgb(0, 0, 0);
  pointer-events: auto;
  border: 2px solid rgb(255, 255, 255);
  box-sizing: border-box;
  border-radius: 8px;
  color: white;
  top: 0;
  left: 0;

  .input-field {
    padding: 5px 10px 8px;
  }

  .listbox {
    height: 300px;
    overflow: auto;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
    color: rgb(255, 255, 255);
    min-height: 40px;
    outline: 0px;
    padding: 4px 8px;
    cursor: pointer;
    opacity: 1;
    margin: 3px 5px 2px 5px;
  }

  img {
    width: 34px;
    border: 1px solid #ffffff99;
    border-radius: 4px;
    margin-right: 8px;
  }
`;

function CountryCodeModal(props) {
  const { setShowModal, countries, handleCountryCodeChange } = props;

  const [error, setError] = useState('');

  function renderInitialOptions() {
    const formattedCountries = [];
    Object.keys(countries).forEach(code => {
      const { flagUrl, name } = countries[code];

      formattedCountries.push({ code, flagUrl, name });
    });

    return formattedCountries;
  }

  const [searchValue, setSeachValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(renderInitialOptions());

  const childRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (!childRef?.current?.contains?.(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    if (inputRef.current && window.innerWidth >= 992) {
      inputRef.current.focus({ preventScroll: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let filtered = renderInitialOptions();

    if (searchValue) {
      const splitSearchValue = searchValue.toLowerCase().split('');
      const re = RegExp(`.*${splitSearchValue.join('.*')}.*`);

      filtered = [];
      Object.keys(countries).forEach(code => {
        const { flagUrl, name } = countries[code];
        const lowerCaseItemLabel = name.toLowerCase();

        if (lowerCaseItemLabel.match(re)) {
          filtered.push({ code, flagUrl, name });
        }
      });
    }

    if (!filtered?.length) {
      setError('No suggestions found');
    } else {
      setError('');
    }

    setFilteredOptions([...filtered]);
  }, [searchValue, countries]);

  function handleSearchChange(event) {
    setSeachValue(event.target.value);
  }

  function handleOptionClick(code) {
    return function eventFunction() {
      handleCountryCodeChange(code);
      setShowModal(false);
    };
  }

  return (
    <Modal>
      <Wrapper ref={childRef}>
        <input
          ref={inputRef}
          className="input-field"
          placeholder="Search countries"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
        />

        {filteredOptions?.length && !error ? (
          <div role="listbox" className="listbox">
            {filteredOptions.map(item => {
              return (
                <div key={item.code} role="option" className="option" onClick={handleOptionClick(item.code)}>
                  <img src={item.flagUrl || ''} alt={item.name} />

                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <ErrorComponent message={error} />
        )}
      </Wrapper>
    </Modal>
  );
}

export default CountryCodeModal;
