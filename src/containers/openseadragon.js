// helper function to load image using promises
import React, { Component } from 'react';
import OpenSeadragon from 'openseadragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faExpand, faCircle  } from '@fortawesome/free-solid-svg-icons'
               
  export default class OpenSeaDragon extends Component {
      constructor(props) {
          super(props)
          this.loadImage = this.loadImage.bind(this);
      }
      loadImage = (src)=> new Promise(function(resolve, reject) {
        var img = document.createElement('img')
        img.addEventListener('load', function(){  resolve(img) })
        img.addEventListener('error', function(err){ reject(404) })
        img.src = src;
      });
      render() {
          let self = this;
          let { id } = this.props
          return (
              <div className="ocd-div" ref={node => {this.el = node;}}>
                  <div className="navigator-wrapper c-shadow">
                      <div id="navigator"></div>
                  </div>
                  <div className="openseadragon" id={id}></div>
                  <ul className="ocd-toolbar">
                      <li><a id="zoom-in"><FontAwesomeIcon icon={faSearchPlus} /></a></li>
                      <li><a id="zoom-out"><FontAwesomeIcon icon={faSearchMinus} /></a></li>
                      <li><a id="reset"><FontAwesomeIcon icon={faCircle} /></a></li>
                      <li><a id="full-page"><FontAwesomeIcon icon={faExpand} /></a></li>
                  </ul>
              </div>
          )
      }
  
      initSeaDragon = () => {
          let self = this;
          let { id, image, type } = this.props
          this.loadImage(image).then(data =>{
                self.viewer =  OpenSeadragon({
                    id: id,
                    visibilityRatio: 1.0,
                    constrainDuringPan: false,
                    defaultZoomLevel: 1,
                    minZoomLevel: 1,
                    maxZoomLevel: 10,
                    zoomInButton: 'zoom-in',
                    zoomOutButton: 'zoom-out',
                    homeButton: 'reset',
                    fullPageButton: 'full-page',
                    nextButton: 'next',
                    previousButton: 'previous',
                    showNavigator: true,
                    navigatorId: 'navigator',
                    tileSources: {
                        type:type,
                        levels:[ { url: image, height:data.naturalHeight, width: data.naturalWidth } ]
                    },
                    overlays: [{
                            id: 'html-overlay',
                            x: 0.125,
                            y: 0.183,
                            width: 0.12,
                            height: 0.12,
                            rotationMode: OpenSeadragon.OverlayRotationMode.EXACT
                        }, {
                            id: 'right-arrow-overlay-no-rotate', 
                            x: 0.43,
                            y: 0.337,
                            width: 0.12,
                            height: 0.12,
                            // placement: OpenSeadragon.Placement.RIGHT,
                            rotationMode: OpenSeadragon.OverlayRotationMode.EXACT
                        }, {
                            id: 'overlay-rotation-bounding-box',
                            x: 0.65,
                            y: 0.24,
                            width: 0.12,
                            height: 0.12,
                            rotationMode: OpenSeadragon.OverlayRotationMode.EXACT
                        }]
                })
            //   .addOnceHandler('open', function(event) {
            //     new OpenSeadragon.MouseTracker({
            //         element: 'html-overlay',
            //         clickHandler: function(event) {
            //             var target = event.originalEvent.target;
            //         }
            //     });
            // });
  
          });
      }
  
      componentDidMount(){
          this.initSeaDragon();
      }
       shouldComponentUpdate(nextProps, nextState){
          return false
      }
  }
  
  OpenSeaDragon.defaultProps = { id: 'ocd-viewer',  type:'legacy-image-pyramid' }