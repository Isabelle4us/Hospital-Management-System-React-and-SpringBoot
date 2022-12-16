import React, { Component } from 'react'
import InpatientService from '../../services/InpatientService';
import PatientService from '../../services/PatientService';
import StaffService from '../../services/StaffService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

class AddInpatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            physicianId: '',
            patientId: '',
            bedId: '',
            nurseId: '',
            physicians: [],
            patients: [],
            beds: [],
            nurses: [],
            admission: '',
            status: 1,
        }

        this.getAllPhysicians();
        this.getAllNurses();
        this.getAllPatients();
        this.getAllBeds();
    }
    getAllPhysicians() {
        StaffService.getPhysicians().then(res => {
            this.setState({ physicians: res.data });
        });
    }

    getAllNurses() {
        StaffService.getNurses().then(res => {
            this.setState({ nurses: res.data });
        });
    }

    getAllPatients() {
        PatientService.getPatients().then(res => {
            this.setState({ patients: res.data });
        });
    }
    
    getAllBeds() {
        InpatientService.getAvailableBeds().then(res => {
            this.setState({ beds: res.data });
        });
    }

    controlQuickly() {
        return this.state.physicianId === null || this.state.physicianId === ''
            || this.state.patientId === null || this.state.patientId === ''
            || this.state.bedId === null || this.state.bedId === ''
            || this.state.nurseId === null || this.state.nurseId === '';
    }
    saveInpatient = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let inpatient = this.state;
            InpatientService.addInpatient(inpatient)
                .then(res => {
                    this.setState({ message: 'Inpatient added successfully.' });
                    this.props.history.push('/inpatients');
                    alertify.success("Adding inpatient is ok");
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, id: null });
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
        this.props.history.push('/inpatients');
    }
    render() {
        //let bornDate = this.state.bornDate;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let {physicianId, patientId, nurseId, bedId, admission } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD IN-PATIENT</h2>
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
                            <label>Nurse *</label>
                            <select className="form-control"
                                value={nurseId}
                                onChange={e => this.onChangeData('nurseId', e.target.value)} >
                                {this.state.nurses.map(nurse =>
                                    <option key={nurse.id} value={nurse.id}>{nurse.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Bed No *</label>
                            <select className="form-control"
                                value={bedId}
                                onChange={e => this.onChangeData('bedId', e.target.value)} >
                                {this.state.beds.map(bed =>
                                    <option key={bed.id} value={bed.id}>{bed.id}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Admission *</label>
                            <input placeholder="admission" name="admission" className="form-control" value={admission} onChange={e => this.onChangeData('admission', e.target.value)} />
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.saveInpatient}>Save</button>
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

export default AddInpatientComponent;