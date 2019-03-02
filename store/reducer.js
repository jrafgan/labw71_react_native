import {
    ADD_ORDER,
    CHANGE_VALUE, DELETE_ORDER,
    FETCH_ERROR,
    FETCH_FINALLY,
    FETCH_START,
    FETCH_SUCCESS, INITIAL_STATE,
    TOGGLE_MODAL
} from "./actionTypes";

const initialState = {
    showSpinner: false,
    menu: null,
    error: null,
    orderList: [],
    modalVisible: false,
    name: '',
    address: '',
    phone: '',
    total: 150,

};

const reducer = (state = initialState, action) => {
        console.log('reducer state menu-----------------------', state.menu);
        switch (action.type) {

            case FETCH_START:
                return {
                    ...state,
                    showSpinner: true,
                };

            case FETCH_SUCCESS:
                return {
                    ...state,
                    showSpinner: false,
                    menu: action.resp,
                };

            case FETCH_ERROR:
                return {
                    ...state,
                    showSpinner: false,
                    error: action.error
                };

            case FETCH_FINALLY:
                return {
                    ...state,
                    showSpinner: false,
                };

            case INITIAL_STATE:
                return {...state, orderList: [], total: 150};

            case ADD_ORDER:
                console.log('action order !!!!!!!!!!!!!!!!', action.order);

                let copy = state.orderList;
                const name = action.order.name;

                if (state.orderList.length !== 0) {

                    const ndx = state.orderList.findIndex(item => item.name === name);

                    if (ndx !== -1) {
                        copy[ndx].qty++;
                        return {...state, orderList: copy, total: state.total + copy[ndx].qty * copy[ndx].cost};
                    } else {
                        copy.push({cost: action.order.cost, name: action.order.name, qty: 1});
                        return {...state, orderList: copy, total: state.total + copy[copy.length - 1].qty * copy[copy.length - 1].cost}
                    }
                } else {
                    let copy = state.orderList;
                    copy.push({cost: action.order.cost, name: action.order.name, qty: 1});
                    return {...state, orderList: copy, total: state.total + copy[0].qty * copy[0].cost}
                }


            case DELETE_ORDER:
                let copy2 = state.orderList;
                copy2.splice(action.ndx, 1);
                    return {...state, orderList: copy2};

            case TOGGLE_MODAL:
                return {
                    ...state,
                    modalVisible: !state.modalVisible,
                };

            default:
                break;
        }
        return state;

    }
;

export default reducer;
