import React,{useState} from 'react';
import { Checkbox } from 'antd';
const MyMultipleCheckbox=()=>{
    const[selectedOrders,setSelectedOrders]=useState([]);
    const availableOptions=[
        'Dish 1',
        'Dish 2',
        'Dish 3'
    ];
    const handleCheckboxChange=(checkedOrders)=> {
        setSelectedOrders(checkedOrders);
    };
    return(
        <div>
            <Checkbox.Group
            options={availableOptions}
            order={selectedOrders}
            onChange={handleCheckboxChange}
            />
                
                <p>selectedOrders: {selectedOrders.join(',')}
                </p>
        </div>
    );
    }
export default MyMultipleCheckbox
