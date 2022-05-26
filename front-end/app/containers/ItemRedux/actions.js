import {UPDATA_ITEM} from './actionType'

export function actionUpdata(res) {
  return {
    type: UPDATA_ITEM,
    res
  };
}