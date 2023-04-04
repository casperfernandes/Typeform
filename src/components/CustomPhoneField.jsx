import { useState } from 'react';
import styled from 'styled-components';
import CountryCodeModal from '../containers/CountryCodeModal';

const Wrapper = styled.div``;

function CustomPhoneField(props) {
  const { fieldName, fieldValue, defaultValue, onFieldChange, isFieldInView, onSubmit, error, setError } = props;

  const [countryCode, setCountryCode] = useState(fieldValue?.code || defaultValue?.code);
  const [phone, setPhone] = useState(fieldValue?.number || defaultValue?.number);
  const [showModal, setShowModal] = useState(false);

  function handleShowModal() {
    setShowModal(true);
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
      {showModal ? <CountryCodeModal setShowModal={setShowModal} /> : null}

      <button onClick={handleShowModal}></button>

      <input type="tel" name={fieldName} value={phone} onChange={handlePhoneChange} />
    </Wrapper>
  );
}

export default CustomPhoneField;
