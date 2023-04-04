import { useState } from 'react';
import styled from 'styled-components';
import CountryCodeModal from '../containers/CountryCodeModal';

const Wrapper = styled.div``;

function CustomPhoneField(props) {
  const { fieldName, fieldValue, defaultValue, onFieldChange, countries, isFieldInView, onSubmit, error, setError } = props;

  const [countryCode, setCountryCode] = useState(fieldValue?.code || defaultValue?.code);
  const [phone, setPhone] = useState(fieldValue?.number || defaultValue?.number);
  const [showModal, setShowModal] = useState(false);

  console.log('countries', countries);
  const selectedCountry = countries?.[countryCode];

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCountryCodeChange(code) {
    setCountryCode(code);

    onFieldChange({ [fieldName]: { code, number: phone } });
  }

  function handlePhoneChange(event) {
    const value = event.target.value;

    if (+value === +value) {
      setPhone(value);

      onFieldChange({ [event.target.name]: { code: countryCode, number: value } });
    }
  }

  return (
    <Wrapper id="parent-phone">
      {showModal ? (
        <CountryCodeModal setShowModal={setShowModal} countries={countries} handleCountryCodeChange={handleCountryCodeChange} />
      ) : null}

      <button onClick={handleShowModal}>
        <img src={selectedCountry?.flagUrl || ''} alt={selectedCountry?.name || ''} />
        <i className="fa fa-angle-down" aria-hidden="true"></i>
      </button>

      <input type="tel" name={fieldName} value={phone} onChange={handlePhoneChange} />
    </Wrapper>
  );
}

export default CustomPhoneField;
