import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {Breadcrumb,Table,Card, Button,Row,Col,Tag} from 'antd'
import { HomeOutlined,FileTextOutlined,EditOutlined,PlusCircleOutlined} from '@ant-design/icons';
import Wrapper from '../wrapper';
import config from '../../config'
import AddArticlesModal from './addArticleModal'
import {articlesRequest} from '../../redux/actions/articles'
import './styles.scss'
import { LoaderComponent } from '../../components/loader-component';

  
class Articles extends Component {
    state={
        showAddTopicModal:false
    }

  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
        title: 'Is Featured',
        dataIndex: 'isFeatured',
        key: 'isFeatured',
        render: ((text,record)=> record.isFeatured? 
            <>
             True
            </> : "" 
          ),
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
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
        this.fetchArticles();
    }
    fetchArticles=()=>{
        this.props.articlesRequest()
    }
    openAddTopicModal = ()=>{
        this.setState({showAddTopicModal:true,articleData:undefined})
    }
    openUpdateTopicModal = (articleData)=>{
        this.setState({showAddTopicModal:true,articleData:articleData})
    }
    closeAddTopicModal =() =>{
        this.setState({showAddTopicModal:false})
    }
    render(){
        let {showAddTopicModal,articleData} = this.state;
        let {loading}=this.props;
        return(
            <Wrapper>
            <Breadcrumb>
            <Breadcrumb.Item>
                <a href="/"><HomeOutlined/> Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="/articles"><FileTextOutlined/> Articles</a>
            </Breadcrumb.Item>
            </Breadcrumb>
                <Card>
                    <Row>
                        <Col span={20}>
                            <h2>List of Articles</h2>
                        </Col>
                        <Col span={4}>
                         <Button type="primary" onClick={()=>this.openAddTopicModal()}><PlusCircleOutlined /> Add Articles</Button>
                        </Col>
                    </Row>
                    {loading && 
                      <LoaderComponent/>
                    }
                    {!loading &&this.props.articlesList && this.props.articlesList.length ===0 && 
                      <p>No articles found</p>
                    }
                    {this.props.articlesList && this.props.articlesList.length  > 0 && 
                      <Table rowKey="_id" dataSource={this.props.articlesList} columns={this.columns} />
                    }
                </Card>
                {showAddTopicModal && <AddArticlesModal showAddTopicModal={showAddTopicModal} closeAddTopicModal={()=>this.closeAddTopicModal()} fetchTopics={()=>this.fetchTopics()} articleData={articleData} />}
                </Wrapper>
        )
    }
}
const mapStateToProps =(state)=>{
    return {
        loading: state.articles.loading,
        message: state.articles.message,
        articlesList:state.articles.articles
    }
  }
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        articlesRequest
    }, dispatch)
  };
  
  export default withRouter(
        connect(
          mapStateToProps, mapDispatchToProps
        )(Articles)
  );

