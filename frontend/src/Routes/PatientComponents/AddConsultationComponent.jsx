import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

class AddConsultationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            physicianId: '',
            patientId: '',
            illnessId: '',
            startDate: new Date(),
            endDate: new Date(),
            physicians: [],
            illnesses: [],
            patients: [],
            status: 1,
        }

        this.getAllPhysicians();
        this.getAllIllnesses();
        this.getAllPatients();
    }
    getAllPhysicians() {
        PatientService.getPhysicians().then(res => {
            this.setState({ physicians: res.data });
        });
    }

    getAllIllnesses() {
        PatientService.getIllnesses().then(res => {
            this.setState({ illnesses: res.data });
        });
    }

    getAllPatients() {
        PatientService.getPatients().then(res => {
            this.setState({ patients: res.data });
        });
    }

    controlQuickly() {
        return this.state.physicianId === null || this.state.physicianId === ''
            || this.state.patientId === null || this.state.patientId === ''
            || this.state.illnessId === null || this.state.illnessId === '';
    }
    saveConsultation = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let consultation = this.state;
            PatientService.addConsultation(consultation)
                .then(res => {
                    this.setState({ message: 'User added successfully.' });
                    this.props.history.push('/patients');
                    alertify.success("Adding patient is ok");
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
        this.props.history.push('/patients');
    }
    render() {
        //let bornDate = this.state.bornDate;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let {physicianId, patientId, illnessId, startDate, endDate} = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD CONSULTATION</h2>
                    <form>
                        <div className="form-group">
                            <label>Physician *</label>
                            <select className="form-control"
                                value={physicianId}
                                onChange={e => this.onChangeData('physicianId', e.target.value)} >
                                {this.state.physicians.map(physician =>
                                    <option key={physician.id} value={physician.id}>{physician.name}</option>
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
                            <label>Illness *</label>
                            <select className="form-control"
                                value={illnessId}
                                onChange={e => this.onChangeData('illnessId', e.target.value)} >
                                {this.state.illnesses.map(illness =>
                                    <option key={illness.id} value={illness.id}>{illness.description}</option>
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

                        <button className="btn btn-success" type="button" onClick={this.saveConsultation}>Save</button>
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

export default AddConsultationComponent;