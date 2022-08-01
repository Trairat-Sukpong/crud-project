/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../Redux/reducer';

const selectItem = state => (state.itemStore || initialState);

// console.log(selectStore);
const makeSelectItem = () =>
  createSelector(
    selectItem,
    // itemState => itemState
    itemState => {
      const modifiedItemStore = { ...itemState }
      modifiedItemStore.data.map((val) => {
        val.itemPrice = val.itemPrice + 20
      })
      return modifiedItemStore
    },
  );

export { selectItem, makeSelectItem };
