import React from 'react';
import {Card,Button} from 'antd';

const MyCard =()=> {
    return (
        <Card
           title="Kitchen Hamara"
        extra={<a href='Home made food'>More</a>}
        style={{width:300}}
        >
            <p>A platform to provide home made dishes with oppurtunity of having personal webpage designed the way you want </p>
                <Button type='primary'>Click me</Button>
        </Card>
    );
}
export default MyCard