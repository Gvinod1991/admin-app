import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {Button,Modal,Input} from 'antd'
import { CommentOutlined} from '@ant-design/icons';
import {LoaderComponent} from '../../components/loader-component'
import config from '../../config'
import {topicsUpdateRequest,topicsSaveRequest} from '../../redux/actions/topics'
import './styles.scss'

class AddTopicModal extends Component {
    state={
        _id:undefined,
        name:"",
        image_file: null,
        image_preview: undefined,
        loading:false
    }
    componentDidMount(){
        let topicData=this.props.topicData;
        if(topicData){
            this.setState({
                name:topicData.name,
                image_edit_preview:topicData.image,
                _id:topicData._id
            })
        }
    }
    handleChange =(name,value) =>{
        this.setState({
            [name]:value
        })
    }
    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        if (!image_as_files.name.match(/.(jpg|jpeg|png|gif)$/i)){
            this.setState({imageErr:"Topic image should be in png/jpeg/jpg format!"});
            return false;
        }else{
            this.setState({imageErr:""});
        }
        if((image_as_files.size/1024)/1024 >= 1){
            this.setState({imageErr:"Topic image should be less than 1MB!"});
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
        let name = this.state.name && this.state.name!==null ? this.state.name : false;
        let imageFile=this.state.image_file!==null ? this.state.image_file : false;
        if(!name){
            this.setState({nameErr:"Topic name required!"})
        }else{
            this.setState({nameErr:""})
        }
        if(!imageFile){
            this.setState({imageErr:"Topic image file required!"})
        }else{
            this.setState({imageErr:""})
        }
        if (name && imageFile){
            this.setState({loading:true})
            let formData = new FormData();
            formData.append('topicImage', this.state.image_file);
            formData.append('name', this.state.name);
            let type=this.state._id ? 'edit' : 'add';
            this.saveOrUpdateTopic(formData,type);
        }
    }
    saveOrUpdateTopic=(formData,type)=>{
        let request= type=='add' ? this.props.topicsSaveRequest(formData) : 
        this.props.topicsUpdateRequest(formData,this.state._id);
        request.then((response)=>{
            this.setState({loading:false})
            if(response.status===200){
                this.setState({"succMsg":response.data.message,"errMsg":"",
                name:"",image_file:null,image_preview:undefined
            });
            this.props.fetchTopics();
            }
        }).catch((e)=>{
            this.setState({loading:false})
            this.setState({"errMsg":e})
            this.setState({"succMsg":""})
        })
    }
    render(){
        let {_id,name,nameErr,image_preview,image_edit_preview,imageErr,succMsg,errMsg,loading}=this.state;
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
                <label>Topic Name</label>
                <Input size="large" value={name} placeholder="Name" prefix={<CommentOutlined />} 
                    onChange={(e) => this.handleChange("name",e.target.value)} />
                <p className="text-danger">{nameErr}</p>
                <br/>
                <label>Topic Image</label>
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

const mapDispatchToProps = dispatch => {
return bindActionCreators({
    topicsSaveRequest,
    topicsUpdateRequest
}, dispatch)
};
  
  export default withRouter(
        connect(
          null, mapDispatchToProps
        )(AddTopicModal)
  );
