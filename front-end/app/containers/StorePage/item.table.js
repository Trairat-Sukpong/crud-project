import React, { useEffect, memo } from 'react';
import Edit from './edit.modal';
import Delete from './delete.modal'
import { Table, Space } from 'antd';
import { connect, useSelector } from 'react-redux'
import { compose } from 'redux';

import { makeSelectItem } from './selectors';
import { createStructuredSelector } from 'reselect';

function TableItem({itemStore}) {

    // const itemStore = useSelector(({ itemStore }) => itemStore)

    // console.log(itemStore);

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
                    // input.data[index]["itemPrice"] = input.data[index]["itemPrice"] + 20
                }
                console.log(input.data);
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

const mapStateToProps = createStructuredSelector({
    itemStore: makeSelectItem()
});

const withConnect = connect(
    mapStateToProps,
);

export default compose(
    withConnect,
    memo,
)(TableItem);