export const initialState = {
  totalFields: 0,
  fieldsViewedWithValue: 0,
  isFormSubmitted: false
};

const actions = {};

actions.setFieldsViewedWithValue = (state, action) => {
  return {
    ...state,
    fieldsViewedWithValue: action.payload
  };
};

actions.setTotalFields = (state, action) => {
  return {
    ...state,
    totalFields: action.payload
  };
};

actions.setIsFormSubmitted = (state, action) => {
  return {
    ...state,
    isFormSubmitted: action.payload
  };
};

export const reducerFunction = (state, action) => {
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }

  return state;
};
