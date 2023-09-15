import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../Service/Service'

export default class OrgImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagedata: this.props.imageData,
            orgId: '',
            orgimage: '',
            orgimgid: ''
        }
    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            AccessToken: data.token,
        }, self.GetOrganization)
    }

    GetOrganization() {
        var self = this;
        Service.GetOrganization(self).then((response => {
            if (response && response.result && response.result.length) {
                self.setState({
                    orgId: response.result[0].id,
                    orgimgid: response.result[0].photoId
                })
            }
        }))
    }
  
    handleClose(img = null) {
        this.props.onCloseOrg(img);
    }

    saveOrgImage() {
        var self = this;
        var imagedata = document.querySelector("[id='orgUploadImage']").files[0]
        Service.AddOrgImgService(this.state.AccessToken, this.state.orgId,imagedata).then((response) => {
            if (response.data.statusTypeId === 200) {
                this.handleClose(this.state.imagedata);
            }
        })
    }

    handleFile = e => {
        const file = e.target.files[0];
        this.setState({ orgimage: file })
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
                this.setState({ imagedata: event.target.result });
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.props.showOrgImg} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            {this.props.popupHeader}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "250px" }}>
                        <div>
                            <div class="custom-form-group mb-4" style={{ padding: "50px 0px 0px 187px" }}>
                                <label class="form-label mb-1" for="name"> Org Image</label>
                                <div class="add-picture">
                                    <label className='update_org_img' >
                                        <img src={this.state.imagedata} alt="" class="img-fluid p-2" style={{ height: "62px", borderRadius: "100%" }} />

                                        <div class="upload-pic">
                                            <input id='orgUploadImage' name='orgUploadImage' type="file" class="file-upload-input" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={this.handleFile} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="confirmation-footer">
                        <button type="reset" class="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                        <button disabled={!this.state.orgimage} style={{ marginLeft: "4px" }} onClick={() => this.saveOrgImage()} class="btn btn-app py-1 px-4">Upload Image</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

