import React, { Component } from 'react';

export class ManageSettings extends Component {
    constructor(props) {
        super(props);
        this.state={
            ringtype: this.props.manageContent.ringtype,
            ringTypeName: this.props.manageContent.ringTypeName, 
            ispublic: this.props.manageContent.ringtype=='1'?true:false,
            isprivate: this.props.manageContent.ringtype == '2' ? true : false, 
            scopetype: this.props.manageContent.scopetype,
            isInternalScope: this.props.manageContent.scopetype == '1' ? true : false, 
            isExternalScope: this.props.manageContent.scopetype == '2' ? true : false, 
        }
    }

    componentWillReceiveProps(props) {
        if (props.manageContent) {
            this.setState({
                ringtype: props.manageContent.ringtype,
                ispublic: props.manageContent.ringtype == '1' ? true : false,
                isprivate: props.manageContent.ringtype == '2' ? true : false,

                scopetype: props.manageContent.scopetype,
                isInternalScope: props.manageContent.scopetype == '1' ? true : false,
                isExternalScope: props.manageContent.scopetype == '2' ? true : false, 
            });
        }
    }

    onTrigger = (type, checked) => {
        this.setState({
            ...this.state,
            ringtype: type,
            ispublic: type === "1" ? checked : false,
            isprivate: type === "2" ? checked : false,
        }, () => {
            this.props.parentCallback(this.state);
        });
    }

    changeScope = (type, value) => {
        this.setState({
            ...this.state, scopetype: type,
            isInternalScope: type == '1' ? value : false,
            isExternalScope: type == '2' ? value : false,
        }, () => {
            this.props.parentCallback(this.state);
        });
    }


    render() {
        return (
        <>
        <div class="d-flex align-items-center mt-4">
            <div class="fs-6 font-medium title">Type</div>
            <div class="form-check d-flex align-items-center">
                <input class="form-check-input" type="checkbox"
                    checked={this.state.ispublic}
                            onChange={(e) => {
                                { this.onTrigger(1,  e.currentTarget.checked) }
                    }}
                />
                <label class="form-check-label ps-2 pt-1">Public</label>
            </div>
            <div class="form-check d-flex align-items-center">
                <input class="form-check-input" type="checkbox"
                    checked={this.state.isprivate}
                            onChange={(e) => {
                                { this.onTrigger(2, e.currentTarget.checked) }
                    }}
                />
                <label class="form-check-label ps-2 pt-1">Private</label>
            </div>
        </div>
        <div class="d-flex align-items-center mt-4">
            <div class="fs-6 font-medium title">Scope</div>
            <div class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" id="internation_mentors" onChange={(e) => {
                            { this.changeScope('1', e.currentTarget.checked) }
                        }}
                            name="internation_mentors" checked={this.state.isInternalScope} />
                <label class="form-check-label ps-2 pt-1">Internal mentors only</label>
            </div>
            <div class="form-check d-flex align-items-center">
                        <input class="form-check-input" type="checkbox" id="external_mentors" onChange={(e) => {
                            { this.changeScope('2', e.currentTarget.checked) }
                        }}
                            name="external_mentors" checked={this.state.isExternalScope} />
                <label class="form-check-label ps-2 pt-1">Allow external mentors</label>
            </div>
        </div>
        </>
        )
    }
}