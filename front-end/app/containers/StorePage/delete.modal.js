/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-plusplus */
/*
 * ShopPage
 *
 * List all the shop
 */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { REQ_DELETE_ITEM } from '../ItemRedux/actionType';
import { Modal, Input, Space, message } from 'antd';
import 'antd/dist/antd.css';

export default function Delete(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(props);
  const [itemName, setItemName] = useState("");
  const [_id, set_id] = useState(props.value._id);

  const dispatch = useDispatch()

  const action = (type, payload) => {
    dispatch({ type, payload })
  }


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const data = {
      itemName,
      _id
    }
    if (itemName == props.value.itemName) {
      action(REQ_DELETE_ITEM, data)
      setItemName('')
      setIsModalVisible(false);
    } else {
      message.error('Error ItemName Not Match')
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => { }, [props]);

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        style={{ width: '80px' }}
        onClick={showModal}
      >
        Delete
      </button>
      <Modal
        title="Delete item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
      >
        <div className="container">
          <Space direction="vertical" className="w-100">
            <div className="row">
              <div>
                <Space direction="vertical" className="w-100">
                  <div>item name</div>
                  <Input
                    type="text"
                    id="input"
                    classNameName="form-control"
                    value={itemName}
                    required="required"
                    placeholder="Enter Item Name for Delete"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <span className="text-danger">
                    <b>{`Enter ( ${props.value.itemName} ) For Delete`}</b>
                  </span>
                </Space>
              </div>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
}
