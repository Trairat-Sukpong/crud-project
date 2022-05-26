/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-plusplus */
/*
 * ShopPage
 *
 * List all the shop
 */
import React, { useState, useEffect } from 'react';
import { Modal, Input, InputNumber, Space, message } from 'antd';
import { REQ_EDIT_ITEM } from '../ItemRedux/actionType';
import { useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

export default function Edit(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(props);
  const [_id, set_id] = useState(props.value._id);
  const [itemName, setItemName] = useState(props.value.itemName);
  const [itemImage, setItemImage] = useState(props.value.itemImage);
  const [itemPrice, setItemPrice] = useState(props.value.itemPrice);
  const [itemAmount, setItemAmount] = useState(props.value.itemAmount);

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
      itemImage,
      itemPrice,
      itemAmount,
      _id
    }
    if (itemName !== "" && itemImage !== "") {
      action(REQ_EDIT_ITEM, data)
      setIsModalVisible(false);
    } else {
      message.error('Error Please enter data ')
    }

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangePrice = value => setItemPrice(value);
  const handleChangeAmount = value => setItemAmount(value);

  useEffect(() => { }, [props]);

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        style={{ width: '80px' }}
        onClick={showModal}
      >
        Edit
      </button>
      <Modal
        title="Edit item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="SAVE"
      >
        <div className="container">
          <Space direction="vertical" className="w-100">
            <div className="row">
              <div>
                <div>item name</div>
                <Input
                  maxLength="24"
                  placeholder="text"
                  defaultValue={data.value.itemName}
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <div>item price</div>
                <InputNumber
                  maxLength="20"
                  placeholder=""
                  min={0}
                  defaultValue={data.value.itemPrice}
                  onChange={handleChangePrice}
                  className="w-100"
                />
              </div>
            </div>

            <div className="row">
              <div>
                <div>item image</div>
                <Input
                  type="text"
                  id="input"
                  className="form-control"
                  placeholder="url"
                  defaultValue={data.value.itemImage}
                  onChange={e => setItemImage(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <div>item amount</div>
                <InputNumber
                  maxLength="20"
                  placeholder=""
                  min={0}
                  defaultValue={data.value.itemAmount}
                  onChange={handleChangeAmount}
                  className="w-100"
                />
              </div>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
}
