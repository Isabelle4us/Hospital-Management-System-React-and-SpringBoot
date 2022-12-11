import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

class AddPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientNo: '',
            name: '',
            tel: '',
            gender: 'MALE',
            bornDate: new Date(),
            bloodType: 'A',
            SSN: '',
            status: 1
        }
    }

    controlQuickly() {
        return this.state.patientNo === null || this.state.patientNo === ''
        || this.state.name === null || this.state.name === ''
        || this.state.SSN === null || this.state.SSN === '';
    }
    saveUser = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let patient = this.state;
            PatientService.addPatient(patient)
                .then(res => {
                    this.setState({ message: 'Patient added successfully.' });
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
            AlertifyService.alert(' * işaretli alanları doldurunuz...');
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
        let { patientNo, name, tel, gender, bornDate, bloodType, SSN } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD PATİENT</h2>
                    <form>
                        <div className="form-group">
                            <label>patientNo *</label>
                            <input type="text" placeholder="patientNo" name="patientNo" className="form-control" value={patientNo} onChange={e => this.onChangeData('patientNo', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>name *</label>
                            <input placeholder="name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>tel *</label>
                            <input placeholder="tel" name="tel" className="form-control" value={tel} onChange={e => this.onChangeData('tel', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select className="form-control"
                                value={gender}
                                onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Born Date *</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={bornDate}
                                    onChange={e => this.onChangeData('bornDate', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>bloodType *</label>
                            <select className="form-control"
                                value={bloodType}
                                onChange={e => this.onChangeData('bloodType', e.target.value)} >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>SSN *</label>
                            <input placeholder="SSN" name="SSN" className="form-control" value={SSN} onChange={e => this.onChangeData('SSN', e.target.value)} />
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.saveUser}>Save</button>
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

export default AddPatientComponent;