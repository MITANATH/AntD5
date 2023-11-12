import React from "react";
import { notification,Button } from "antd";
const MyNotification =() =>{
    const openSuccessNotification =() =>
    {
        notification.success({
            message: 'Order successful',
            description:'Order will get delivered within half an hour',
                });
    };
    const openInfoNotification=()=> {
        notification.info({
            message: 'Info Notification',
            description:'This is an info notification message',
        });
    };

const openWarningNotification=()=>{
    notification.warning({
        message: 'Warning Notification',
        description: 'This is a warning notification message.',
    
    })
}
const openErrorNotification=()=>{
    notification.error({
        message: 'Error Notification',
        description: 'This ia a error notification.',
    })
}
return(
    <div>
        <Button onClick={openSuccessNotification}>
            Ordered successfully
        </Button>
        <Button onClick={openInfoNotification}>
            Info Notification
        </Button>
        <Button onClick={openWarningNotification}>
            Warning Notification
        </Button>
        <Button onClick={openErrorNotification}>
            Error Notification
        </Button>
    </div>
);
}
export default MyNotification