import React from 'react';
import {Input,Button} from 'antd'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import {LoaderComponent} from '../../components/loader-component'
import {validateEmail} from '../../utils/validation';
import {loginRequest} from '../../redux/actions'

import './style.scss'
import logo from '../../assets/images/logo.png'

class Login extends React.Component{
    state={
        loading:false,
        email:"",
        password:"",
        emailErr:"",
        passwordErr:""
    }
    handleChange =(name,value) =>{
        this.setState({[name]:value})
    }
    submitLogin =() =>{
      
        let email= validateEmail(this.state.email) ? this.state.email : false;
        let password= this.state.password !==null ?  this.state.password : false;
        if(!email){
            this.setState({emailErr:"Invalid email id"})
        }else{
            this.setState({emailErr:""})
        }
        if(!password){
            this.setState({passwordErr:"Invalid password"})
        }else{
            this.setState({passwordErr:""})
        }
        if(email && password){
            this.setState({loading:true})
            this.props.loginRequest({email,password}).then((data)=>{
             if(data.status===200){
                this.setState({loading:false})
                window.localStorage.setItem('authTokenArticleApp', data.data.token);
                this.props.history.push('/', true)
             }
            }).catch((e)=>{
                this.setState({loading:false})
                this.setState({errMessage:"Invalid credentials!"})
            })
        }
    }
    render(){
        let {loading,email,password,emailErr,passwordErr}= this.state;
        return(
            <div className="login-container" >
                <div className="box">
                    <img className="logo" alt="log" src={logo} />
                    <Input size="large" value={email} placeholder="Email id" prefix={<UserOutlined />} 
                    onChange={(e) => this.handleChange("email",e.target.value)} />
                    <p className="text-danger">{emailErr}</p>
                    <br/>
                    <Input size="large" placeholder="Password" prefix={<LockOutlined />}
                    type="password"
                    value={password}
                    onChange={(e) => this.handleChange("password",e.target.value)} />
                    <p className="text-danger">{passwordErr}</p>
                    <br/>
                    <p className="text-danger">{this.state.errMessage}</p>
                    {loading && <LoaderComponent></LoaderComponent>}
                    <Button type="primary" onClick={()=>this.submitLogin()}>Login</Button> <span className="forgot-password"> Forgot Password?</span>
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        loading: state.auth.loading,
        message: state.auth.message
    }
  }
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      loginRequest
    }, dispatch)
  };
  
  export default withRouter(
        connect(
          mapStateToProps, mapDispatchToProps
        )(Login)
  );