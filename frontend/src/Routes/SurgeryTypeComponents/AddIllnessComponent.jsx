import React, { Component } from 'react'
import SurgeryTypeService from '../../services/SurgeryTypeService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

export default class AddIllnessComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            illnessCode: '',
            description: '',
            status: 1
        }
    }

    controlQuickly() {
        return this.state.name === null || this.state.name === '';
    }
    saveIllness = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let illness = this.state;
            SurgeryTypeService.addIllness(illness)
                .then(res => {
                    this.setState({ message: 'Illness added successfully.' });
                    this.props.history.push('/illnesses');
                    alertify.success("Adding illness is ok");
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, id: null });
                        AlertifyService.alert(error.response.data.message);
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
        } else
            AlertifyService.alert(' missing info ...');
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    back() {
        this.props.history.push('/illnesses');
    }
    render() {
        let { illnessCode, description } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD ILLNESS</h2>
                    <form>
                        <div className="form-group">
                            <label>Illness Code *</label>
                            <input placeholder="illnessCode" name="illnessCode" className="form-control" value={illnessCode} onChange={e => this.onChangeData('illnessCode', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Description *</label>
                            <input placeholder="description" name="description" className="form-control" value={description} onChange={e => this.onChangeData('description', e.target.value)} />
                        </div>
                        <button className="btn btn-success" type="button" onClick={this.saveIllness}>Save</button>
                    </form>
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
                </div>
                <div className="col-sm-12">
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div>
        );
    }
}