import React, { Component } from 'react';
import IntlMessages from '../../components/utility/intlMessages';
import VideoStyleWrapper from './videoPlayer.style';
import VideoPlayer from 'react-video-js-player';

export default class extends Component {
  handleCameraClick=()=>{
   const {history} =  this.props;
  //  history.push("/dashboard/cameras/:"+this.props.id);
  //  history.push("/dashboard/cameras");
   history.push({
    pathname: '/dashboard/cameras',
    state: { 
      zone_id: this.props.zone_id,
      camera_id: this.props.id
    }
  })
  }
  render() {
    return (
      <VideoStyleWrapper>
        <div className="camera">
          {this.props.parent === "zone" ? <h3 onClick={!this.props.disable ? this.handleCameraClick : ''} className={this.props.disable ? "non_editable" : "editable"}>{this.props.title}{!this.props.disable && <i className="ion-edit" />}</h3> :
            <h3>{this.props.title}</h3>}
            <div className="responsiveIFrame">
                {/* <iframe
                title="test"
                className="embed-responsive-item"
                src="https://cog-ai.s3.amazonaws.com/shop_1.mp4"
                allowFullScreen
                /> */}
                <VideoPlayer
                    controls={true}
                    src={this.props.video}  
                />
            </div>
        </div>
      </VideoStyleWrapper>
    )
  }
}