import {
    ADD_ORDER, DELETE_ORDER,
    FETCH_ERROR,
    FETCH_FINALLY,
    FETCH_GET_MENU,
    FETCH_START,
    FETCH_SUCCESS, INITIAL_STATE,
    TOGGLE_MODAL
} from "./actionTypes";
import axios from '../axios_url'

export const fetchFinnaly = () => {
    return {type: FETCH_FINALLY}
};

export const fetchSuccess = (resp) => {
    return {type: FETCH_SUCCESS, resp}
};

export const fetchStart = () => {
    return {type: FETCH_START}
};

export const fetchError = (error) => {
    return {type: FETCH_ERROR, error}
};

export const addOrder = (order) => {
    return {type: ADD_ORDER, order}
};

export const toggleModal = () => {
    return {type: TOGGLE_MODAL}
};

export const initialState = () => {
    return {type: INITIAL_STATE}
};

export const deleteOrder = (ndx) => {
    return {type: DELETE_ORDER, ndx}
};

export const fetchDishes = () => {
    return (dispatch) => {
        dispatch(fetchStart());
        axios.get('pizzaDishes.json').then(response => {

            dispatch(fetchSuccess(response.data));
        }, error => {
            dispatch(fetchError(error));
        });
    }
};

export const saveOrder = (userData) => {

    return (dispatch, getState) => {
        const state = getState();
        const order = {...userData, orderedItems: []};

        state.orderList.map((item, id)=> {
            const menuKeysArr = Object.keys(state.menu);
            const menuValuesArr = Object.values(state.menu);
            const ndx = menuValuesArr.findIndex(elem=>elem.name === item.name);
            order.orderedItems.push({id: menuKeysArr[ndx], qty: item.qty});
        });
        console.log('orderInfo sent to API only id and qty ====', order);
        dispatch(fetchStart());

        axios.post('orderedPizzaDishes.json', order).then(response => {
            dispatch(fetchDishes());
        });
    }
};