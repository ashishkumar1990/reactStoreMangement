const productActionReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            debugger;
            return state.concat([action.data]);
        case 'DELETE':
            return state.filter((productData) => productData.id !== action.id);
        case 'EDIT':
            return state.map((productData) => productData.id === action.id ? {
                ...productData,
                editing: !productData.editing
            } : productData);
        case 'UPDATE':
            return state.map((productData) => {
                if (Number(productData.id) === Number(action.data.id)) {
                    return {
                        id: productData.id,
                        productFormData: action.data.productFormData,
                        editing: !productData.editing
                    }
                }
                else {
                    return productData;
                }
            });
        default:
            return state;
    }
};
export default productActionReducer;