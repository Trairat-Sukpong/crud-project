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
    itemState => itemState,
  );

export { selectItem, makeSelectItem };
