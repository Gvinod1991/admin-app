import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {Breadcrumb,Table,Card, Button,Row,Col} from 'antd'
import { HomeOutlined,CommentOutlined,EditOutlined,PlusCircleOutlined} from '@ant-design/icons';
import Wrapper from '../wrapper';
import config from '../../config'
import {LoaderComponent} from '../../components/loader-component'
import AddTopicModal from './addTopicModal'
import {topicsRequest} from '../../redux/actions/topics'
import './styles.scss'

  
class Topics extends Component {
    state={
        topicsList:[],
        showAddTopicModal:false
    }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (file) => <img className="topic-image" src={config.apiEndpoint+file} alt="" />
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        
        render: (text,record) => <Button type="primary" onClick={()=>this.openUpdateTopicModal(record)}><EditOutlined/>Edit</Button>
    },
  ];
    componentDidMount(){
        this.fetchTopics();
    }
    fetchTopics=()=>{
        this.props.topicsRequest()
    }
    openAddTopicModal = ()=>{
        this.setState({showAddTopicModal:true})
    }
    openUpdateTopicModal = (topicData)=>{
        this.setState({showAddTopicModal:true,topicData:topicData})
    }
    closeAddTopicModal =() =>{
        this.setState({showAddTopicModal:false})
    }
    render(){
        let {showAddTopicModal,topicData} = this.state;
        let {loading}=this.props;
        return(
            <Wrapper>
            <Breadcrumb>
            <Breadcrumb.Item>
                <a href="/"><HomeOutlined/> Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="/topics"><CommentOutlined/> Topics</a>
            </Breadcrumb.Item>
            </Breadcrumb>
                <Card>
                    <Row>
                        <Col span={20}>
                            <h2>List of Topics</h2>
                        </Col>
                        <Col span={4}>
                         <Button type="primary" onClick={()=>this.openAddTopicModal()}><PlusCircleOutlined /> Add Topic</Button>
                        </Col>
                    </Row>
                    {loading && 
                        <LoaderComponent/>
                    }
                    {!loading && this.props.topicsList && this.props.topicsList.length ===0 && 
                        <p>No topics found!</p>
                    }
                    {this.props.topicsList && this.props.topicsList.length > 0 && 
                        <Table rowKey="_id" dataSource={this.props.topicsList} columns={this.columns} />
                    }
                </Card>
                {showAddTopicModal && <AddTopicModal showAddTopicModal={showAddTopicModal} closeAddTopicModal={()=>this.closeAddTopicModal()} fetchTopics={()=>this.fetchTopics()} topicData={topicData} />}
                </Wrapper>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        loading: state.topics.loading,
        message: state.topics.message,
        topicsList:state.topics.topics
    }
  }
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        topicsRequest
    }, dispatch)
  };
  
  export default withRouter(
        connect(
          mapStateToProps, mapDispatchToProps
        )(Topics)
  );

