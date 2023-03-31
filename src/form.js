import { FIELD_TYPE, STORAGE_KEYS } from './constants/Miscellaneous';
import INDUSTRIES from './constants/Industries';

import { getFromLocalStorage } from './services/StorageService';

function Form() {
  const formValue = getFromLocalStorage(STORAGE_KEYS.form) || {};
  const { firstName } = formValue;

  return [
    {
      question: <span>Up-skilling requires time commitment</span>,
      description: (
        <p>
          <span>
            The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work
            in.
          </span>
          <br />
          <br />
          <span>You will spend</span>
          <br />
          <span>- 6 hours/week for the first 5 weeks</span>
          <br />
          <span>- 15 hours/week for the last 3 weeks</span>
        </p>
      ),
      buttonText: 'I agree',
      helperText: (
        <>
          press
          <strong>Enter ↵</strong>
        </>
      )
    },
    {
      question: <span>What's your first name?*</span>,
      fieldName: 'firstName',
      fieldType: FIELD_TYPE.textField,
      defaultValue: '',
      isRequired: true,
      buttonText: 'Ok',
      helperText: (
        <>
          press
          <strong>Enter ↵</strong>
        </>
      )
    },
    {
      question: <span>and your last name, c?*</span>,
      fieldName: 'lastName',
      fieldType: FIELD_TYPE.textField,
      defaultValue: '',
      isRequired: true,
      buttonText: 'Ok',
      helperText: (
        <>
          press
          <strong>Enter ↵</strong>
        </>
      )
    },
    {
      question: <span>What industry is your company in?*</span>,
      description: <p>We will personalize your learning experience accordingly</p>,
      fieldName: 'industryName',
      fieldType: FIELD_TYPE.selectDropdown,
      defaultValue: null,
      options: INDUSTRIES,
      isRequired: true,
      buttonText: 'Ok'
    },
    {
      question: <span>Your role in your company?*</span>,
      description: <p>We want to understand how you spend your time right now.</p>,
      note: (
        <>
          <em>[</em>
          <span>🔴</span>
          <em>DEVELOPER NOTICE: Options in the questions ahead depend on this question's response/s. ]</em>
        </>
      ),
      fieldName: 'currentRole',
      fieldType: FIELD_TYPE.checkbox,
      allowSelectionCount: 1,
      defaultValue: [],
      isRequired: true,
      buttonText: 'Ok'
    },
    {
      question: <span>{firstName}, what's your professional goal for the next 12 months?*</span>,
      fieldName: 'goals',
      fieldType: FIELD_TYPE.checkbox,
      allowSelectionCount: 2,
      defaultValue: [],
      isRequired: true,
      buttonText: 'Ok'
    },
    {
      question: <span>Email you'd like to register with?*</span>,
      description: (
        <p>
          We will keep all our communications with you through this email. Do check your spam inbox if you can't find our
          application received email.
        </p>
      ),
      note: (
        <>
          <em>[</em>
          <span>🔴</span>
          <em>
            DEVELOPER NOTICE: Responses submitted to this form will be forwarded to the email you input here, for you to test data
            submissions. ]
          </em>
        </>
      ),
      fieldName: 'email',
      fieldType: FIELD_TYPE.textField,
      isEmail: true,
      defaultValue: '',
      isRequired: true,
      buttonText: 'Ok',
      helperText: (
        <>
          press
          <strong>Enter ↵</strong>
        </>
      )
    },
    {
      question: <span>Your phone number?*</span>,
      description: <p>We won't call you unless it is absolutely required to process your application.</p>,
      fieldName: 'phone',
      fieldType: FIELD_TYPE.phoneField,
      defaultValue: '',
      isRequired: true,
      buttonText: 'Submit',
      helperText: (
        <>
          press
          <strong>Cmd ⌘ + Enter ↵</strong>
        </>
      )
    }
  ];
}

export default Form;
