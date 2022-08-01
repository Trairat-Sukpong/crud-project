import produce from 'immer';
import { UPDATA_ITEM } from './actionType'

export const initialState = {
    data: []
}

const ItemReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UPDATA_ITEM:
                draft.data = action.res.data;
                break;
        }
    });

export default ItemReducer