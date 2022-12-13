import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import ConsultationDetail from '../BasicComponent/ConsultationDetail';
import AlertifyService from '../../services/AlertifyService';

export default class ViewConsultationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            consultation: null,
            physician: null,
            patient: null,
            illness: null,
            startDate: new Date(),
            endDate: new Date(),
            diagnosed: '',
            active: '',
        }
        this.loadConsultation = this.loadConsultation.bind(this);
    }

    componentDidMount() {
        this.loadConsultation();
    }

    loadConsultation() {
        PatientService.getConsultationById(this.state.id)
            .then(res => {
                let c = res.data;
                console.log(c);
                this.setState({ consultation: c });
                this.setState({ id: c.id });
                return c;
            })
            .then(c => {
                Promise.all([
                    PatientService.getPatientById(c.patientId),
                    PatientService.getIllnessById(c.illnessId),
                    PatientService.getPhysicianById(c.physicianId),
                ])
                .then(([patientRes, illnessRes, physicianRes]) => {
                    console.log(patientRes.data);
                    this.setState({
                        patient: patientRes.data,
                        illness: illnessRes.data,
                        physician: physicianRes.data,
                    });
                })

            })
            .catch((error) => {
                if (error.response) {
                    AlertifyService.alert(error.response.data.message);
                    this.props.history.push('/consultations');
                }
                else if (error.request) console.log(error.request);
                else console.log(error.message);
            });
    }

    back(){
        this.props.history.push('/consultations');
    }

    render() {
        let consultation = this.state.consultation;
        let patient = this.state.patient;
        let physician = this.state.physician;
        let illness = this.state.illness;

        return (
            <div className="row">
                {/* Patient Details */}
                <div className="col-lg-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>

                    <hr />
                </div>
                <div className="col-lg-7">
                    {patient != null ?
                        <ConsultationDetail
                            id={consultation.id}
                            physician={physician.name}
                            patient={patient.name}
                            illness={illness.description}
                            startDate={consultation.startDate}
                            endDate={consultation.endDate}
                            diagnosed={consultation.diagnosed}
                            active={consultation.active}
                            showButtons={true}
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