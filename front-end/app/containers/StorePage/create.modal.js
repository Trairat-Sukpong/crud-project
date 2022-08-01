/*
 * ShopPage
 *
 * List all the shop
 */
import React, { useState } from 'react';
import { Modal, Input, InputNumber, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { REQ_CREATE_ITEM } from '../Redux/actionType';
import { message } from 'antd';
import 'antd/dist/antd.css';

export default function Create() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);

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
      itemAmount
    }
    if (itemName !== "" && itemImage !== "") {
      dispatch({ type: REQ_CREATE_ITEM, payload: data })
      setItemName('')
      setItemImage('')
      setItemPrice(0)
      setItemAmount(0)
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


  return (
    <>
      <button
        type="button"
        className="btn btn-primary "
        onClick={showModal}
      >
        Add item
      </button>
      <Modal
        title="Add item"
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
                  type="text"
                  id="input"
                  placeholder="text"
                  className="form-control"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <div>item price</div>
                <InputNumber
                  placeholder=""
                  min={0}
                  value={itemPrice}
                  className="w-100"
                  onChange={handleChangePrice}
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
                  value={itemImage}
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
                  value={itemAmount}
                  className="w-100"
                  onChange={handleChangeAmount}
                />
              </div>
            </div>
          </Space>
        </div>
      </Modal>
    </>
  );
}
