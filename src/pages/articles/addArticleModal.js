import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {Button,Modal,Input,Select,Tag,Tooltip} from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {CommentOutlined,PlusOutlined} from '@ant-design/icons';
import {LoaderComponent} from '../../components/loader-component'
import config from '../../config'
import {articlesRequest,articlesSaveRequest,articlesUpdateRequest} from '../../redux/actions/articles'
import {topicsRequest} from '../../redux/actions/topics'
import './styles.scss'
const { Option } = Select;
class AddArticleModal extends Component {
    state={
        _id:undefined,
        articleData:{
            title:"",
            content:"",
            isFeatured:"",
            tags:[],
            topic_id:"",
            _id:undefined
        },
        inputVisible:"",
        inputValue:"", 
        editInputIndex:"",
        editInputValue:"",
        image_file: null,
        image_preview: undefined,
        loading:false
    }
    componentDidMount(){
        this.props.topicsRequest();
        let articleData=this.props.articleData;
        if(articleData){
          this.setState({articleData:articleData,image_edit_preview:articleData ? articleData.image : false})
        }
    }
    handleChange =(name,value) =>{
        this.setState(
            prevState=>(
              {
                articleData:{
                    ...prevState.articleData,
                    [name]:value
                }
            })
        )
        
    }
    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        if (!image_as_files.name.match(/.(jpg|jpeg|png|gif)$/i)){
          this.setState({imageErr:"Article image should be in png/jpeg/jpg format!"});
          return false;
        }else{
            this.setState({imageErr:""});
        }
        if((image_as_files.size/1024)/1024 >= 1){
            this.setState({imageErr:"Article image should be less than 1MB!"});
            return false;
        }else{
            this.setState({imageErr:""});
        }
        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
            image_edit_preview:undefined
        })
    }
    handleSubmitFile = () => {
        let title = this.state.articleData.title && this.state.articleData.title!==null ? this.state.articleData.title : false;
        let topic_id = this.state.articleData.topic_id !== "" ? this.state.articleData.topic_id : false;
        let isFeatured = this.state.articleData.isFeatured !=="" ? this.state.articleData.isFeatured : undefined;
        let content = this.state.articleData.content && this.state.articleData.content !=="" ? this.state.articleData.content : false;
        let imageFile=this.state.image_file!==null ? this.state.image_file : false;
        if(!title){
            this.setState({nameErr:"Title is required!"})
        }else{
            this.setState({nameErr:""})
        }
        if(!topic_id){
          this.setState({topicErr:"Topic is required!"})
        }else{
            this.setState({topicErr:""})
        }
        if(isFeatured === undefined){
          this.setState({isFeaturedErr:"Is featured article required!"})
        }else{
            this.setState({isFeaturedErr:""})
        }
        if(!content){
          this.setState({contentErr:"Content is required!"})
        }else{
            this.setState({contentErr:""})
        }
        if(!this.state.image_edit_preview && !imageFile){
            this.setState({imageErr:"Article image file required!"})
        }else{
            this.setState({imageErr:""})
        }
        if(title && topic_id && isFeatured!==undefined && content){
           
            let formData = new FormData();
            if(this.state.image_file !==null){
              formData.append('articleImage', this.state.image_file);
            }else{
              if(!this.state.image_edit_preview){
                return false
              }
            }
            formData.append('title', this.state.articleData.title);
            formData.append('isFeatured', this.state.articleData.isFeatured);
            formData.append('content', this.state.articleData.content);
            formData.append('tags', this.state.articleData.tags);
            formData.append('topic_id', this.state.articleData.topic_id);
            let type=this.state.articleData._id ? 'edit' : 'add';
            this.setState({loading:true})
            this.saveOrUpdateTopic(formData,type,this.state.articleData._id);
        }
    }
    handleClose = removedTag => {
      const tags = this.state.articleData.tags.filter(tag => tag !== removedTag);
      this.setState(
        prevState=>(
          {
            articleData:{
                ...prevState.articleData,
                tags
            }
        })
    )
    };
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };
  
    handleInputChange = e => {
      this.setState({ inputValue: e.target.value });
    };
  
    handleInputConfirm = () => {
      const { inputValue } = this.state;
      let { tags } = this.state.articleData;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.setState(
        prevState=>({
            articleData:{
                ...prevState.articleData,
                tags
            }
        })
      );
      
      this.setState({
        inputVisible: false,
        inputValue: '',
      });
    };
  
    handleEditInputChange = e => {
      this.setState({ editInputValue: e.target.value });
    };
  
    handleEditInputConfirm = () => {
      this.setState(({ tags, editInputIndex, editInputValue }) => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        return {
          tags: newTags,
          editInputIndex: -1,
          editInputValue: '',
        };
      });
    };
  
    saveInputRef = input => {
      this.input = input;
    };
  
    saveEditInputRef = input => {
      this.editInput = input;
    };  
    saveOrUpdateTopic=(formData,type,_id)=>{
        let request= type=='add' ? this.props.articlesSaveRequest(formData) : 
        this.props.articlesUpdateRequest(formData,_id);
        request.then((response)=>{
            this.setState({loading:false})
                if(response.status===200){
                    this.setState({"succMsg":response.data.message,"errMsg":"",
                    name:"",image_file:null,image_preview:undefined
                });
                this.props.articlesRequest();
            }
        }).catch((e)=>{
            this.setState({loading:false})
            this.setState({"errMsg":e})
            this.setState({"succMsg":""})
        })
    }
    render(){
        let {_id,articleData,nameErr,topicErr,isFeaturedErr,contentErr,image_preview,image_edit_preview,imageErr,succMsg,errMsg,loading}=this.state;
        const {inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        const {topicsList}=this.props;
        return(
            <Modal
                title={_id ? "Add": "Edit"+" Topic"}
                visible={this.props.showAddTopicModal}
                onCancel={()=>this.props.closeAddTopicModal()}
                footer={[
                    <Button key="back" onClick={()=>this.props.closeAddTopicModal()}>
                      Close
                    </Button>,
                    <Button type="primary" onClick={()=>this.handleSubmitFile()}>Submit</Button>,
                  ]}
            >
                <div>
                <label>Title</label>
                <br/>
                <Input size="large" value={articleData.title} placeholder="Title" prefix={<CommentOutlined />} 
                    onChange={(e) => this.handleChange("title",e.target.value)} />
                <p className="text-danger">{nameErr}</p>
                </div>
                <div>
                    <label>Choose Topic</label>
                    <br/>
                    <Select defaultValue={articleData.topic_id} style={{ width: '100%' }} onChange={(value)=>this.handleChange("topic_id",value)}>
                    <Option value={""}>Choose one</Option>
                      {topicsList && topicsList.length > 0 && topicsList.map((topic)=>{
                          return <Option value={topic._id}>{topic.name}</Option>
                        })
                      }
                    </Select>
                    <p className="text-danger">{topicErr}</p>
                </div>
                <div>
                    <label>Is Featured ?</label>
                    <br/>
                    <Select defaultValue={articleData.isFeatured} style={{ width: '100%' }} onChange={(value)=>this.handleChange("isFeatured",value)}>
                    <Option value={""}>Choose one</Option>
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                    </Select>
                    <p className="text-danger">{isFeaturedErr}</p>
                </div>

                <div>
                <label>Content</label>
                <br/>
                <ReactQuill theme="snow" value={articleData.content} onChange={(e) => this.handleChange('content',e)} />
                <p className="text-danger">{contentErr}</p>
                </div>
                <div>
                    <label>Tags</label>
                    <br/>
                    {articleData && articleData.tags && articleData.tags.length > 0 && articleData.tags.map((tag, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={this.saveEditInputRef}
                              key={tag}
                              size="small"
                              className="tag-input"
                              value={editInputValue}
                              onChange={this.handleEditInputChange}
                              onBlur={this.handleEditInputConfirm}
                              onPressEnter={this.handleEditInputConfirm}
                            />
                          );
                        }
              
                        const isLongTag = tag.length > 20;
              
                        const tagElem = (
                          <Tag
                            className="edit-tag"
                            key={tag}
                            closable={index !== 0}
                            onClose={() => this.handleClose(tag)}
                          >
                            <span
                              onDoubleClick={e => {
                                if (index !== 0) {
                                  this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                    this.editInput.focus();
                                  });
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                      {inputVisible && (
                        <Input
                          ref={this.saveInputRef}
                          type="text"
                          size="small"
                          className="tag-input"
                          value={inputValue}
                          onChange={this.handleInputChange}
                          onBlur={this.handleInputConfirm}
                          onPressEnter={this.handleInputConfirm}
                        />
                      )}
                      {!inputVisible && (
                        <Tag className="site-tag-plus" onClick={this.showInput}>
                          <PlusOutlined /> New Tag
                        </Tag>
                      )}
                </div>
                <label>Topic Image</label>
                <br/>
                <div>
                {/* image input field */}
                <input
                    type="file"
                    className="custom-file-input"
                    onChange={this.handleImagePreview}
                />
                {image_preview &&
                    <img className="topic-image-preview" src={this.state.image_preview} alt=""/>
                }
                {image_edit_preview &&
                    <img className="topic-image-preview" src={config.apiEndpoint+image_edit_preview} alt=""/>
                }
                <p className="text-danger">{imageErr}</p>
                </div>
                {loading && <LoaderComponent></LoaderComponent>}
                <p className="text-danger">{errMsg}</p>
                <p className="success-message">{succMsg}</p>
            </Modal>
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
    articlesSaveRequest,
    articlesUpdateRequest,
    topicsRequest,
    articlesRequest
}, dispatch)
};
  
export default withRouter(
      connect(
        mapStateToProps, mapDispatchToProps
      )(AddArticleModal)
);