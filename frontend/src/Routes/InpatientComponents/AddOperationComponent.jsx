import React, { Component } from 'react'
import InpatientService from '../../services/InpatientService';
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

class AddOperationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surgeonId: '',
            patientId: '',
            surgeryId: '',
            startDate: new Date(),
            endDate: new Date(),
            location: '',
            surgeons: [],
            patients: [],
            surgeries: [],
            status: 1,
        }

        this.getAllSurgeons();
        this.getAllSurgeries();
        this.getAllPatients();
    }
    getAllSurgeons() {
        InpatientService.getSurgeons().then(res => {
            this.setState({ surgeons: res.data });
        });
    }

    getAllSurgeries() {
        InpatientService.getSurgeries().then(res => {
            this.setState({ surgeries: res.data });
        });
    }

    getAllPatients() {
        PatientService.getPatients().then(res => {
            this.setState({ patients: res.data });
        });
    }

    controlQuickly() {
        return this.state.surgeonId === null || this.state.surgeonId === ''
            || this.state.patientId === null || this.state.patientId === ''
            || this.state.surgeryId === null || this.state.surgeryId === '';
    }
    saveOperation = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let operation = this.state;
            InpatientService.addOperation(operation)
                .then(res => {
                    this.setState({ message: 'Operation added successfully.' });
                    this.props.history.push('/operations');
                    alertify.success("Adding operation is ok");
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, patientid: null });
                        AlertifyService.alert(error.response.data.message);
                        //this.props.history.push('/patients');
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
        } else
            AlertifyService.alert(' * please choose one for each dropdown ...');
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    back() {
        this.props.history.push('/operations');
    }
    render() {
        //let bornDate = this.state.bornDate;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let {surgeonId, patientId, surgeryId, startDate, endDate, location } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD OPERATION</h2>
                    <form>
                        <div className="form-group">
                            <label>Surgeon *</label>
                            <select className="form-control"
                                value={surgeonId}
                                onChange={e => this.onChangeData('surgeonId', e.target.value)} >
                                {this.state.surgeons.map(surgeon =>
                                    <option key={surgeon.id} value={surgeon.id}>{surgeon.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Patient *</label>
                            <select className="form-control"
                                value={patientId}
                                onChange={e => this.onChangeData('patientId', e.target.value)} >
                                {this.state.patients.map(patient =>
                                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Surgery *</label>
                            <select className="form-control"
                                value={surgeryId}
                                onChange={e => this.onChangeData('surgeryId', e.target.value)} >
                                {this.state.surgeries.map(surgery =>
                                    <option key={surgery.id} value={surgery.id}>{surgery.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Start Date *</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={startDate}
                                    onChange={e => this.onChangeData('startDate', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>End Date *</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={endDate}
                                    onChange={e => this.onChangeData('endDate', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Location *</label>
                            <input placeholder="location" name="location" className="form-control" value={location} onChange={e => this.onChangeData('location', e.target.value)} />
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.saveOperation}>Save</button>
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

export default AddOperationComponent;