import React from 'react'
import { Layout, Menu,Dropdown } from 'antd';
import { CommentOutlined,FileTextOutlined,HomeOutlined,MenuFoldOutlined,MenuUnfoldOutlined,UserOutlined} from '@ant-design/icons';
import { withRouter,Link } from "react-router-dom";
import './style.css'
import logo from '../../assets/images/logo.png'
import DropdownMenu from './dropdownMenu'
const { Header, Footer, Content,Sider } = Layout;

class Wrapper extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    let path = window.location.pathname.split('/')[1];
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="md"
          collapsedWidth="80"
          theme="dark"  trigger={null} collapsible collapsed={this.state.collapsed}>
          <div>
              {!this.state.collapsed && <img className="logo" src={logo} alt="logo"/>}
              {this.state.collapsed && <img className="logo" src={logo} alt="logo"/>}
          </div>
          <Menu theme="dark"  defaultSelectedKeys={[path!==""?path:"/"]} mode="inline">
          
            <Menu.Item key="/">
              <HomeOutlined />
              <span>Dashboard</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="topics">
              <CommentOutlined />
              <span>Topics</span>
              <Link to="/topics" />
            </Menu.Item>
            <Menu.Item key="articles">
              <FileTextOutlined />
              <span>Articles</span>
              <Link to="/articles" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ background: '#f5f5f5', padding: 0 }}>
          <Header style={{ background: '#fff', padding: 0,display:'flex',justifyContent: "space-between"}} >
          {this.state.collapsed ? 
            <MenuFoldOutlined
              className="trigger"
              onClick={this.toggle}
            /> : 
            <MenuUnfoldOutlined 
            className="trigger"
            onClick={this.toggle} />
          }
            <Dropdown overlay={<DropdownMenu />} >
              <a className="ant-dropdown-link" href="/">
                <UserOutlined className="user" />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ margin: '0 16px' }}>
          {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Admin App &copy; 2020 </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Wrapper)