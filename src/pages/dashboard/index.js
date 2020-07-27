import React,{Component} from 'react'
import {Breadcrumb} from 'antd'
import { HomeOutlined} from '@ant-design/icons';
import Wrapper from '../wrapper';
import './styles.css'
class Dashboard extends Component {
    render(){
        return(
            <Wrapper>
            <Breadcrumb>
            <Breadcrumb.Item>
                <a href="/"><HomeOutlined/> Dashboard</a>
            </Breadcrumb.Item>
            </Breadcrumb>
            </Wrapper>
        )
    }
}
export default Dashboard

