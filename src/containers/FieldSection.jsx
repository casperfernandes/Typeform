import { FIELD_TYPE, STORAGE_KEYS } from '../constants/Miscellaneous';

import { getFromLocalStorage, setToLocalStorage } from '../services/StorageService';

import CustomSelectDropdown from '../components/CustomSelectDrowdown';
import CustomPhoneField from '../components/CustomPhoneField';
import CustomInputField from '../components/CustomInputField';
import CustomCheckbox from '../components/CustomCheckbox';
import ErrorComponent from '../components/ErrorComponent';
import SubmitButton from '../components/SubmitButton';

function FieldSection(props) {
  const {
    isFieldInView,
    error,
    setError,
    handleSubmit,
    formDetails: { fieldName, fieldType, defaultValue, options, buttonText, helperText, requiredSelectionCount, countries }
  } = props;

  const formValue = getFromLocalStorage(STORAGE_KEYS.form);
  const fieldValue = formValue?.[fieldName];

  function onFieldChange(updatedValue) {
    setToLocalStorage(STORAGE_KEYS.form, { ...formValue, ...updatedValue });
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
            handleSubmit={handleSubmit}
            error={error}
            setError={setError}
          />
        );

      case FIELD_TYPE.checkbox:
        return (
          <CustomCheckbox
            fieldName={fieldName}
            fieldValue={fieldValue}
            defaultValue={defaultValue}
            onFieldChange={onFieldChange}
            options={options}
            requiredSelectionCount={requiredSelectionCount}
            handleSubmit={handleSubmit}
            isFieldInView={isFieldInView}
            error={error}
            setError={setError}
          />
        );

      case FIELD_TYPE.phoneField:
        return (
          <CustomPhoneField
            fieldName={fieldName}
            fieldValue={fieldValue}
            defaultValue={defaultValue}
            onFieldChange={onFieldChange}
            countries={countries}
            isFieldInView={isFieldInView}
            error={error}
            setError={setError}
          />
        );

      default:
        return null;
    }
  }

  return (
    <>
      {renderField()}

      {error ? (
        <ErrorComponent message={error} />
      ) : (
        <SubmitButton buttonText={buttonText} helperText={helperText} handleSubmit={handleSubmit} />
      )}
    </>
  );
}

export default FieldSection;
