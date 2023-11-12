import React from 'react';
import {Breadcrumb} from 'antd';

const MyBreadcrumb =()=> {
    return (
        <Breadcrumb separator=">">
           <Breadcrumb.Item>Home</Breadcrumb.Item>
           <Breadcrumb.Item>
           <a href='/products'>Kitchen Here</a>
           </Breadcrumb.Item>
           <Breadcrumb.Item>My dishes</Breadcrumb.Item>
           <Breadcrumb.Item>Add to Cart</Breadcrumb.Item>
           </Breadcrumb>
        
    );
}
export default MyBreadcrumb

