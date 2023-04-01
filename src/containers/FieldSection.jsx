import { FIELD_TYPE, STORAGE_KEYS } from '../constants/Miscellaneous';

import { getFromLocalStorage, setToLocalStorage } from '../services/StorageService';

import CustomInputField from '../components/CustomInputField';
import CustomSelectDropdown from '../components/CustomSelectDrowdown';
import SubmitButton from '../components/SubmitButton';
import { useState } from 'react';

function FieldSection(props) {
  const {
    isFieldInView,
    onSubmit,
    formDetails: { fieldName, fieldType, defaultValue, options, buttonText, helperText, allowOnlyNumbers }
  } = props;

  const [error, setError] = useState('');

  const formValue = getFromLocalStorage(STORAGE_KEYS.form);
  const fieldValue = formValue?.[fieldName];

  function onFieldChange(updatedValue) {
    setToLocalStorage(STORAGE_KEYS.form, { ...formValue, ...updatedValue });
  }

  function handleSubmit() {
    onSubmit();
  }

  function renderField() {
    switch (fieldType) {
      case FIELD_TYPE.textField:
        return (
          <CustomInputField
            fieldName={fieldName}
            fieldValue={fieldValue}
            defaultValue={defaultValue}
            onFieldChange={onFieldChange}
            isFieldInView={isFieldInView}
            allowOnlyNumbers={allowOnlyNumbers}
            error={error}
            setError={setError}
          />
        );

      case FIELD_TYPE.selectDropdown:
        return (
          <CustomSelectDropdown
            options={options}
            fieldName={fieldName}
            fieldValue={fieldValue}
            defaultValue={defaultValue}
            onFieldChange={onFieldChange}
            isFieldInView={isFieldInView}
            onSubmit={onSubmit}
            error={error}
            setError={setError}
          />
        );

      case FIELD_TYPE.checkbox:
      case FIELD_TYPE.phoneField:
        return null;

      default:
        return null;
    }
  }

  return (
    <>
      {renderField()}

      <SubmitButton buttonText={buttonText} helperText={helperText} handleSubmit={handleSubmit} />
    </>
  );
}

export default FieldSection;
