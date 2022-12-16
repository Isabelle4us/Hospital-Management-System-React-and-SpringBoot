import React, { Component } from 'react'
import SurgeryTypeService from '../../services/SurgeryTypeService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

export default class AddSurgeryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surgeryCode: '',
            category: '',
            location: '',
            specialNeeds: '',
            status: 1
        }
    }

    controlQuickly() {
        return this.state.name === null || this.state.name === '';
    }
    saveSurgery = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let surgery = this.state;
            SurgeryTypeService.addSurgery(surgery)
                .then(res => {
                    this.setState({ message: 'Surgery added successfully.' });
                    this.props.history.push('/surgeries');
                    alertify.success("Adding surgery is ok");
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
        this.props.history.push('/surgeries');
    }
    render() {
        let { name, surgeryCode, category, location, specialNeeds } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD SURGERY TYPE</h2>
                    <form>
                        <div className="form-group">
                            <label>Name *</label>
                            <input placeholder="name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Surgery Code *</label>
                            <input placeholder="surgeryCode" name="surgeryCode" className="form-control" value={surgeryCode} onChange={e => this.onChangeData('surgeryCode', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <input placeholder="category" name="category" className="form-control" value={category} onChange={e => this.onChangeData('category', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Location *</label>
                            <input placeholder="location" name="location" className="form-control" value={location} onChange={e => this.onChangeData('location', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Special Needs *</label>
                            <input placeholder="specialNeeds" name="specialNeeds" className="form-control" value={specialNeeds} onChange={e => this.onChangeData('specialNeeds', e.target.value)} />
                        </div>
                        <button className="btn btn-success" type="button" onClick={this.saveSurgery}>Save</button>
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