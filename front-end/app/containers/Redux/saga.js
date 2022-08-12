
import { call, put, select, takeLatest,fork } from 'redux-saga/effects';
import { REQ_GET_ITEM, REQ_CREATE_ITEM, REQ_EDIT_ITEM, REQ_DELETE_ITEM } from './actionType';
import { actionUpdata } from './actions';
import { repoLoadingError, loadRepos } from 'containers/App/actions';

import { getdata, postdata } from './api/fetch.item';

export function* getIteam() {

  const input = {
    data: "",
    path: `/api/item/get`
  }

  try {
    // yield put(loadRepos())
    const response = yield call(postdata, input);
    // console.log("getIteam")
    yield put(actionUpdata(response));
  } catch (err) {
    //yield put(repoLoadingError(err));
  }

}

export function* createItem(req) {

  const input = {
    data: req.payload,
    path: `/api/item/create`
  }

  try {
    // yield put(loadRepos())
    const response = yield call(postdata,input);
    yield put(actionUpdata(response));
  } catch (err) {
    //yield put(repoLoadingError(err));
  }

}

export function* editItem(req) {

  const input = {
    data: req.payload,
    path: `/api/item/update`
  }

  try {
    // yield put(loadRepos())
    const response = yield call(postdata,input);
    yield put(actionUpdata(response));
  } catch (err) {
    //yield put(repoLoadingError(err));
  }

}

export function* deleteItem(req) {

  const input = {
    data: req.payload,
    path: `/api/item/delete`
  }

  try {
    // yield put(loadRepos())
    const response = yield call(postdata,input);
    yield put(actionUpdata(response));
  } catch (err) {
    // //yield put(repoLoadingError(err));
  }

}

/**
 * Root saga manages watcher lifecycle
 */
export default function* itemData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQ_GET_ITEM, getIteam);
  yield takeLatest(REQ_CREATE_ITEM, createItem);
  yield takeLatest(REQ_EDIT_ITEM, editItem);
  yield takeLatest(REQ_DELETE_ITEM, deleteItem);
}
