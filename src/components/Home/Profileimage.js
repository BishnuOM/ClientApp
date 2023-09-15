import React, { Component, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import Service from '../../Service/Service'

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagedata: this.props.imageData,
            profileimage: '',
            profileimgid: ''
        }
    }

    componentDidMount() {
        var self = this;
        const data = JSON.parse(localStorage.getItem("login_data"));
        self.setState({
            AccessToken: data.token,
            id: data.id
        })
    }

    handleClose(img = null) {
        this.props.onCloseprofile(img);
    }

    updateProfileImage() {
        var imagedata = document.querySelector("[id='profileUploadImage']").files[0]
        Service.UpdateProfileImg(this.state.AccessToken, imagedata).then((response) => {
            if (response.data.statusTypeId === 200) {
                this.handleClose(this.state.imagedata);
            }
        })
    }

    handleFile = e => {
        const file = e.target.files[0];
        this.setState({ profileimage: file })
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
                <Modal show={this.props.showProfileImg} onHide={() => this.handleClose()}
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton className="confirmation-header">
                        <Modal.Title>
                            {this.props.popupHeader}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{ minHeight: "250px" }}>
                        <div>

                            <div className="custom-form-group mb-4" style={{ padding: "50px 0px 0px 187px" }}>
                                <label className="form-label mb-1" for="name"> Profile Image</label>
                                <div className="add-picture">
                                    <label className='update_org_img' >
                                        <img src={this.state.imagedata} alt="" className="img-fluid p-2" style={{ height: "62px", borderRadius:"100%" }} />

                                        <div className="upload-pic">
                                            <input id='profileUploadImage' name='profileUploadImage' type="file" className="file-upload-input" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={this.handleFile} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="confirmation-footer">
                        <button type="reset" className="border-Button btn btn-outline btn-app px-4 py-1" onClick={() => this.handleClose()}>Cancel</button>
                        <button disabled={!this.state.profileimage} style={{ marginLeft: "4px" }} onClick={() => this.updateProfileImage()} className="btn btn-app py-1 px-4">Upload Image</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

