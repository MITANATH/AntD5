import React from 'react'
import { Collapse } from 'antd'
const MyCollapse=()=> {
    return (
        <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="Ordered Dish"
        key="1">
               Mutton Biryani
        </Collapse.Panel>
        <Collapse.Panel header="Delivery status"
        key="2">
            Food out for Delivery
        </Collapse.Panel>
        <Collapse.Panel header="Time Remain"
        key="3">
            Estimated time of delivery = "10 minutes"
        </Collapse.Panel>
            </Collapse>
    );
}
export default MyCollapse