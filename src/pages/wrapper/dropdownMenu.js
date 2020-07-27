import React from 'react'
import {Menu} from 'antd'
import {LoginOutlined} from '@ant-design/icons';
import {logout} from '../../utils/utilities'
const DropdownMenu=(props)=>{

    return(
        <Menu>
            <Menu.Item  onClick={()=>logout()}>
                <LoginOutlined /> 
                Logout
            </Menu.Item>
        </Menu>
    )
}

export default DropdownMenu