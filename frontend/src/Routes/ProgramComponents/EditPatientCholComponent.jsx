import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";

export default class EditPatientCholComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            chol: true,
            bloodSugar: '',
            hdl: '',
            ldl: '',
            triglyceride: '',
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
                bloodSugar: p.bloodSugar || '',
                hdl: p.hdl || '',
                ldl: p.ldl || '',
                triglyceride: p.triglyceride || '',
            });
        });
    }
    editPatient = (e) => {
        e.preventDefault();
        let patient = this.state;
        patient['id'] = window.localStorage.getItem("id");
        PatientService.editPatient(patient).then(res => {
            this.props.history.push('/patientsChol');
            alertify.success("Updated patient is ok");
        });
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    render() {
        let { bloodSugar, hdl, ldl, triglyceride } = this.state;
        return (
            <div className="row">
                <div className="col-lg-7">
                    <h2 className="text-center">Edit Patient</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label >Blood Sugar:</label>
                            <input type="text" placeholder="bloodSugar" name="bloodSugar" className="form-control" value={bloodSugar} onChange={e => this.onChangeData('bloodSugar', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>HDL:</label>
                            <input type="text" placeholder="hdl" name="hdl" className="form-control" value={hdl} onChange={e => this.onChangeData('hdl', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>LDL:</label>
                            <input type="text" placeholder="ldl" name="ldl" className="form-control" value={ldl} onChange={e => this.onChangeData('ldl', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>triglyceride:</label>
                            <input type="text" placeholder="triglyceride" name="triglyceride" className="form-control" value={triglyceride} onChange={e => this.onChangeData('triglyceride', e.target.value)} />
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