import React, { Component } from 'react'
import PatientService from '../../services/PatientService'; 
import PatientDetail from '../BasicComponent/PatientDetail';
import AlertifyService from '../../services/AlertifyService';
 
export default class ViewPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            patient: null,
            patientNo: '',
            name: '',
            tel: '',
            gender: '',
            birthday: null,
            bloodType: '',
            SSN: '',
            status: 1
        }
        this.loadPatient = this.loadPatient.bind(this); 
    }

    componentDidMount() {
        this.loadPatient(); 
    }
    
    loadPatient() {
        PatientService.getPatientById(this.state.id).then(res => {
            let p = res.data;
            this.setState({ patient: p });
            this.setState({
                id: p.id
            }); 
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    } 

    back(){
        this.props.history.push('/patients'); 
    }
    render() { 
        let patient = this.state.patient; 
        return (
            <div className="row">
                {/* Show and close modal */}
                <div className="col-lg-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <button
                        type="button"
                        className="btn btn-warning ml-1"
                        onClick={() => this.viewProblemForm(patient.patientid)}
                        data-whatever="@getbootstrap">Add Problem</button>
 
                    <hr />
                </div>
                {/* Patient Details */}
                <div className="col-lg-7">
                    {patient != null ?
                        <PatientDetail
                            id={patient.id}
                            patientNo={patient.patientNo}
                            name={patient.name}
                            tel={patient.tel}
                            birthday={patient.birthday}
                            gender={patient.gender}
                            bloodType={patient.bloodType}
                            SSN={patient.SSN}
                            showButtons={true}
                            // array={[patientNo, name, tel, gender, birthday, bloodType, SSN]}
                        />
                        : null}
                </div> 
                <div className="col"></div>
                <div className="col-lg-4">
                    <img style={{ height: 300 }} src="https://cdn4.iconfinder.com/data/icons/business-colored-vol-1/100/business-colored-7-05-512.png" alt="" />
                </div>
            </div>
        )
    }
}