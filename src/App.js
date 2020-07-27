import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Topics from './pages/topics'
import Articles from './pages/articles'
import 'antd/dist/antd.css'; 

//Authenticated routes
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    window.localStorage.getItem("authTokenArticleApp") && window.localStorage.getItem("authTokenArticleApp")!=="undefined"?
  <Component {...props} />
    :<Redirect to='/login' />
  )} />
)
class App extends Component {
   
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/" exact component={Dashboard}/>
          <PrivateRoute path="/topics" component={Topics} />
          <PrivateRoute path="/articles" component={Articles} />
        </Switch>
      </Router>
    );
  } 
}
export default App;
