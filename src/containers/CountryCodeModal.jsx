import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal';
import ErrorComponent from '../components/ErrorComponent';

const Wrapper = styled.div`
  position: absolute;
  width: 450px;
  height: 300px;
  overflow: auto;
  z-index: 50;
  background: rgb(0, 0, 0);
  pointer-events: auto;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 5px 16px 16px 16px;
  color: white;
  /* height: 100%; */

  .options {
    position: relative;
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
    padding: 4px 8px;
    transition-duration: 0.1s;
    transition-property: background-color, color, border-color, opacity, box-shadow;
    transition-timing-function: ease-out;
    width: 100%;
    cursor: pointer;
    opacity: 1;
    margin-bottom: 4px;
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

  useEffect(() => {
    const handleClickOutside = event => {
      if (!childRef?.current?.contains?.(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

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
        <input type="text" value={searchValue} onChange={handleSearchChange} />

        {filteredOptions?.length && !error ? (
          <div role="listbox">
            {filteredOptions.map(item => {
              return (
                <div key={item.code} role="option" className="options" onClick={handleOptionClick(item.code)}>
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
