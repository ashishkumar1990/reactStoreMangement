const userActionReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            debugger;
            return state.concat([action.data]);
        case 'DELETE':
            return state.filter((registerData) => registerData.id !== action.id);
        case 'EDIT':
            return state.map((registerData) => registerData.id === action.id ? {
                ...registerData,
                editing: !registerData.editing
            } : registerData);
        case 'UPDATE':
            return state.map((registerData) => {
                if (Number(registerData.id) === Number(action.data.id)) {
                    return {
                        id: registerData.id,
                        registerFormData: action.data.registerFormData,
                        editing: !registerData.editing
                    }
                }
                else {
                    return registerData;
                }
            });
        default:
            return state;
    }
};
export default userActionReducer;