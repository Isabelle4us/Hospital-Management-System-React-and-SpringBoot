import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";

export default class EditPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            patientNo: '',
            name: '',
            tel: '',
            gender: 'MALE',
            birthday: new Date(),
            bloodType: 'A',
            SSN: "",
            status: 1
        }
        this.loadPatient();
        this.loadPatient = this.loadPatient.bind(this);
    }

    componentDidMount() {
        this.loadPatient();
    }

    loadPatient() {
        PatientService.getPatientById(window.localStorage.getItem("id")).then((res) => {
            let p = res.data;
            this.setState({
                id: p.id,
                patientNo: p.patientNo,
                name: p.name,
                tel: p.tel,
                gender: p.gender,
                birthday: p.birthday,
                bloodType: p.bloodType,
                SSN: p.SSN,
            });
        });
    }
    editPatient = (e) => {
        e.preventDefault();
        let patient = this.state;
        patient['id'] = window.localStorage.getItem("id");
        PatientService.editPatient(patient).then(res => {
            this.props.history.push('/patients');
            alertify.success("Updated patient is ok");
        });
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    render() {
        let birthday = new Date();

        if (this.state.birthday !== null)
            birthday = new Date(this.state.birthday.toString());
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let { patientNo, name, tel, gender, bloodType, SSN } = this.state;
        return (
            <div className="row">
                <div className="col-lg-7">
                    <h2 className="text-center">Edit Patient</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label >patientNo:</label>
                            <input type="text" placeholder="patientNo" name="patientNo" className="form-control" value={patientNo} onChange={e => this.onChangeData('patientNo', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>tel:</label>
                            <input type="text" placeholder="tel" name="tel" className="form-control" value={tel} onChange={e => this.onChangeData('tel', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" value={gender} onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Born Date:</label>
                            {birthday !== null ?
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control"
                                        // showTimeSelect
                                        showTimeInput
                                        selected={birthday}
                                        onChange={e => this.onChangeData('birthday', e)}
                                        filterDate={isWeekday}          // disable weekend
                                        timeIntervals={15}              // time range around 15 min
                                        //showWeekNumbers               // show week number
                                        timeFormat="HH:mm"              // show time format
                                        dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                    />
                                </div>
                                :
                                null

                            }
                        </div>
                        <div className="form-group">
                            <label>bloodType:</label>
                            <select className="form-control" value={bloodType} onChange={e => this.onChangeData('bloodType', e.target.value)} >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>SSN:</label>
                            <input type="text" placeholder="SSN" name="SSN" className="form-control" value={SSN} onChange={e => this.onChangeData('SSN', e.target.value)} />
                        </div>
                        <button className="btn btn-success" onClick={this.editPatient}>Update</button>
                    </form>
                </div>
                <div className="col">

                </div>
                <div className="col-lg-4">
                    <img style={{ margin: '20px 0', height: 300 }} src="https://www.shareicon.net/data/512x512/2016/02/26/725010_document_512x512.png" alt="" />
                </div>
                <div className="col-sm-12">
                <hr />
                <hr />
                <hr />
                </div>
            </div>
        )
    }
}