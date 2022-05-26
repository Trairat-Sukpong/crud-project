import { UPDATA_ITEM } from './actionType'

const initialState = {
    data: [{
        _id: "LOADING...",
        itemName: "LOADING...",
        itemImage: "LOADING...",
        itemPrice: "LOADING...",
        itemAmount: "LOADING...",
        create_at: "LOADING...",
        key: "LOADING...",
    }]
}

const ItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATA_ITEM:
            return Object.assign({}, state, {
                data: action.res.data,
            })
        default:
            return state;
    }
}

export default ItemReducer