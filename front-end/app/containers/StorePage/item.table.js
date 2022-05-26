import React from 'react'
import Edit from './edit.modal';
import Delete from './delete.modal'
import { Table, Space } from 'antd';
import { useSelector } from 'react-redux'

function TableItem() {

    const itemStore = useSelector(({ itemStore }) => itemStore)

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            width: 150,
        },
        {
            title: '_id',
            dataIndex: '_id',
            className: " d-none"
            // width: 150,
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            width: 150,
        },
        {
            title: 'Price ($)',
            dataIndex: 'itemPrice',
            // width: 150,
        },
        {
            title: 'Amount',
            dataIndex: 'itemAmount',
        },
        {
            title: 'Image',
            dataIndex: 'itemImage',
            render: (_, _record) => (

                <a href={_record.itemImage} target="_blank" >
                    <img src={_record.itemImage}
                        className="img-responsive"
                        alt="Image"
                        width={"50%"}
                        height={"50%"}
                    />
                </a>

            )
        },
        {
            title: 'Option',
            dataIndex: 'option',
            render: (_, _record) => (
                <Space>
                    <Edit value={_record} />
                    <Delete value={_record} />
                </Space>
            ),
        },
    ];

    const Adjustdata = (input) => {
        if (input !== undefined) {
            if (input.data.length > 0) {
                for (let index = 0; index < input.data.length; index++) {
                    input.data[index]["key"] = index + 1
                }
                return input.data
            } else {

            }
        } else {
            return
        }
    }
    
    return (
        <Table
            columns={columns}
            dataSource={Adjustdata(itemStore)}
            // pagination={{ pageSize: 50 }}
            scroll={{ y: 400 }}
        />
    )
}

export default TableItem