import { FIELD_TYPE } from '../constants/Miscellaneous';

const isValidEmail = fieldValue => {
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@\"+]+(\.[^<>()[\]\\.,;:\s@\"+]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegEx.test(fieldValue)) {
    return { isValid: true, error: '' };
  }

  return { isValid: false, error: `Hmm... that email doesn't look right` };
};

export const isValidField = (fieldValue, formDetails) => {
  const { isRequired = false, isEmail = false, fieldType = '', isPhone = false, requiredSelectionCount } = formDetails || {};

  if (isRequired) {
    if (fieldValue) {
      if (isEmail) {
        return isValidEmail(fieldValue);
      }

      if (isPhone) {
        const isPhoneExist = !!(fieldValue?.code && fieldValue?.number);

        if (isPhoneExist) {
          return { isValid: true, error: '' };
        }

        return { isValid: false, error: 'Please fill this in' };
      }

      if ([FIELD_TYPE.selectDropdown, FIELD_TYPE.checkbox].includes(fieldType)) {
        if (!fieldValue?.length) {
          return { isValid: false, error: 'Oops! Please make a selection' };
        }

        if (requiredSelectionCount && fieldValue?.length < requiredSelectionCount) {
          return { isValid: false, error: 'Please select more choices' };
        }

        return { isValid: true, error: '' };
      }

      return { isValid: true, error: '' };
    }

    return { isValid: false, error: 'Please fill this in' };
  }

  return { isValid: true, error: '' };
};
