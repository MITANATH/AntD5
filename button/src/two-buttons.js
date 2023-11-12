import { Button } from "antd";

function TwoButton() {
    return (
        <div style = {{
            display:"flex"
        }}>
            <Button type="text">text Button</Button><br/>
            <Button type="Default">Default Button</Button>

        </div>
    )
}
export default TwoButton