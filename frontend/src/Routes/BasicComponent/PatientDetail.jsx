import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import PatientService from '../../services/PatientService';
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class PatientDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            name: props.name,
            patientNo: props.patientNo,
            tel: props.tel,
            ssn: props.ssn,
            birthday: props.birthday,
            gender: props.gender,
            message: ''
        };
        // props.array.map(a => {
        //     console.log(a + ' : ' + props[a] + ' : ' + (typeof props[a]))
        // })
    }
    editPatient(id) {
        alertify.confirm(
            "Are you sure to edit this patient.",
            ok => {
                window.localStorage.setItem("id", id);
                this.props.history.push('/edit-patient');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deletePatient(id) {
        alertify.confirm("Are you sure to delete this patient.",
            function () {
                PatientService.deletePatient(id)
                    .then(res => {
                        window.location.href = '/patients';
                        alertify.success("Deleting is ok ");
                    })
            },
            function () {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header"> <h3> Patient Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>id : </b>{this.props.id}</li>
                        <li className="list-group-item"><b>name : </b>{this.props.name}</li>
                        <li className="list-group-item"><b>patientNo : </b>{this.props.patientNo}</li>
                        <li className="list-group-item"><b>tel : </b>{this.props.tel}</li>
                        <li className="list-group-item"><b>ssn : </b>{this.props.ssn}</li>
                        <li className="list-group-item"><b>birthday : </b>
                            {this.props.birthday !== null ?
                                <Moment parse="YYYY/MM/DD"> {this.props.birthday} </Moment> : null
                            }
                        </li>
                        <li className="list-group-item"><b>Gender : </b>{this.props.gender}</li>
                        {this.props.showButtons?
                        <li className="list-group-item">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.editPatient(this.props.id)} >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.deletePatient(this.props.id)}>
                                Delete
                            </button>
                        </li>
                         : null}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(PatientDetail)
