import React, { Component } from "react";
import { Row, Col } from "antd";
import Button from "../../components/uielements/button";
import ContentHolder from "../../components/utility/contentHolder";
import basicStyle from "../../settings/basicStyle";
import Modals from "../../components/feedback/modal";
import ModalStyle from "../Feedback/Modal/modal.style";
import WithDirection from "../../settings/withDirection";
// import ZoneStyleWrapper from "./zone.style";
import Card from "../Uielements/Card/card.style";
import Dropzone from "../../components/uielements/dropzone.js";
import DropzoneWrapper from "../AdvancedUI/dropzone/dropzone.style";
import { notification } from "../../components";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

export default class extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const marginStyle = { marginRight: "5px", marginBottom: "5px" };

    const componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      method: true,
      showFiletypeIcon: true,
      uploadMultiple: false,
      maxFilesize: 2, // MB
      maxFiles: 2,
      dictMaxFilesExceeded: "You can only upload upto 2 images",
      dictRemoveFile: "Delete",
      dictCancelUploadConfirmation: "Are you sure to cancel upload?",
      postUrl: "no-url",
    };
    const djsConfig = { autoProcessQueue: false };
    const eventHandlers = {
      addedfile: (file) => notification("success", `${file.name} added`),
      success: (file) =>
        notification("success", `${file.name} successfully uploaded`),
      error: (error) => notification("error", "Server is not set in the demo"),
    };

    return (
      // <ZoneStyleWrapper>
        <div style={{ width: "100%" }}>
          <div className="page_header">
            <h4>ADD Zone</h4>
            <span>CogAi / ADD Zone</span>
          </div>
          <Row type="flex" gutter={0} justify="space-around">
            <Col lg={10} sm={16} xs={24}>
              <Card className="addZone_card">
                <h2>Upload Zone Plan</h2>
                <p>
                  Please upload zone plan for your plant. It contains zone
                  mapping of the plant.
                </p>
                <ContentHolder>
                  <Button type="primary" onClick={this.showModal}>
                    Show Modal
                  </Button>
                  <Modal
                    visible={this.state.visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button
                        key="back"
                        size="large"
                        onClick={this.handleCancel}
                      >
                        Close
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        loading={this.state.loading}
                        onClick={this.handleOk}
                      >
                        Complete
                      </Button>,
                    ]}
                  >
                    <DropzoneWrapper>
                      <Dropzone
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                      />
                    </DropzoneWrapper>
                  </Modal>
                </ContentHolder>
              </Card>
            </Col>
          </Row>
        </div>
      // </ZoneStyleWrapper>
    );
  }
}
