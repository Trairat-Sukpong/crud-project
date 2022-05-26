/*
 * ShopPage
 *
 * List all the shop
 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux'

import { REQ_GET_ITEM } from '../ItemRedux/actionType'

import reducer from '../ItemRedux/reducer';
import saga from '../ItemRedux/saga';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import H1 from 'components/H1';
import messages from './messages';

const key = 'itemStore';

export default function ShopPage() {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch()

  const action = (type, payload) => {
    dispatch({ type, payload })
  }

  const itemStore = useSelector(({ itemStore }) => itemStore)

  const Adjustdata = (input) => {
    if (input !== undefined) {
      if (input.data.length > 0) {
        return input.data.map((data) => {
          return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-2">
              <div className="card rounded-3 border-1">
                <img
                  src={data.itemImage}
                  alt=""
                  className="rounded-3"
                  width={"100%"}
                  height={"250px"}
                />
                <div className="card-body">
                  <h4 className="card-title text-center">${data.itemPrice}</h4>
                  <div className=" d-flex flex-row justify-content-between">
                    <p className="card-text">{data.itemName}</p>
                    <p className="card-text">{data.itemAmount} set</p>
                  </div>
                  <button type="button" className="btn w-100 btn-outline-success">
                    Add Order
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }
    }
  }

  useEffect(() => {

    action(REQ_GET_ITEM)

  }, []);

  return (
    <div>
      <Helmet>
        <title>Shop Page</title>
        <meta
          name="description"
          content="Shop page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>

      <div className="container">
        <div className="row">
          {
            Adjustdata(itemStore)
          }

      
        </div>
      </div>
    </div>
  );
}
