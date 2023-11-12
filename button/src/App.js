import React from 'react'
// import TwoButton from './two-buttons';
// import { Button } from 'antd'; 
import MyCard from './card';
import MyBreadcrumb from './breadcrumb';
import MyMultipleCheckbox from './checkbox';
import MyCollapse from './collapse';
import MyNotification from './notification';

 function App() { 
  
  return ( 
    <div style={{ display: 'block', width: 700, padding: 30 }}> 
      {/* <h4>Ant Design Button Component</h4> 
      <Button>Default Button</Button> <br /> 
      <Button type="primary">Primary Button</Button> <br /> 
      <Button type="dashed">Dashed Button</Button> <br /> 
      <Button type = "text">Text Button</Button><br/>
      <Button type = "default">Default Button</Button><br/>
      <TwoButton/> */}
       <MyCard/>
      <MyBreadcrumb/> 
      <MyMultipleCheckbox/> 
       <MyCollapse/> 
      <MyNotification/>
      </div> 
  ); 
}
export default App