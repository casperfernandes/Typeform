export const initialState = {
    totalFields: 0,
    fieldsViewedWithValue: 0
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

export const reducerFunction = (state, action) => {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
};
