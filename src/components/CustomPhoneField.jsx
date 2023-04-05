import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { appContext } from '../appContext/AppProvider';

import CountryCodeModal from '../containers/CountryCodeModal';

const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: white;
  position: relative;

  .inputField {
    color: white;
    padding: 0px 0px 8px;
    background: none;
    border: none;
    outline: none;
    transform: translateZ(0px);
    font-size: 30px;
    box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;

    :focus {
      box-shadow: rgb(255, 255, 255) 0px 2px;
    }
  }

  button {
    background: none;
    border: none;
    box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;
    padding: 0px 0px 13px 0px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 30px;
    margin-right: 15px;
    cursor: pointer;
  }

  img {
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 4px;
    box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px;
  }
`;

function CustomPhoneField(props) {
  const { fieldName, fieldValue, defaultValue, onFieldChange, countries, isFieldInView, setError } = props;

  const {
    state: { fieldsViewedWithValue },
    dispatch
  } = useContext(appContext);

  const [countryCode, setCountryCode] = useState(fieldValue?.code || defaultValue?.code);
  const [phone, setPhone] = useState(fieldValue?.number || defaultValue?.number);
  const [showModal, setShowModal] = useState(false);

  const modifyProgressBarRef = useRef(true);

  const selectedCountry = countries?.[countryCode];

  useEffect(() => {
    if (isFieldInView) {
      // Only if element is in view, modify progress bar
      // Ref used to prevent multiple useEffect calls because of fieldsViewedWithValue being updated
      if (!phone && fieldsViewedWithValue && !modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue - 1
        });

        modifyProgressBarRef.current = true;
      } else if (phone && modifyProgressBarRef.current) {
        dispatch({
          type: 'setFieldsViewedWithValue',
          payload: fieldsViewedWithValue + 1
        });

        modifyProgressBarRef.current = false;
      }
    }
  }, [isFieldInView, phone, fieldsViewedWithValue, dispatch]);

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
      setError(false);

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

      <input className="inputField" type="tel" name={fieldName} value={phone} onChange={handlePhoneChange} />
    </Wrapper>
  );
}

export default CustomPhoneField;
