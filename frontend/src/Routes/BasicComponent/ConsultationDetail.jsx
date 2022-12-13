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
            id:props.id,
            physician:props.physician,
            patient:props.patient,
            illness:props.illness,
            startDate:props.startDate,
            endDate:props.endDate,
            diagnosed:props.diagnosed,
            active:props.active,
        };
        // props.array.map(a => {
        //     console.log(a + ' : ' + props[a] + ' : ' + (typeof props[a]))
        // })
    }
    editConsultation(id) {
        alertify.confirm(
            "Are you sure to edit this consultation.",
            ok => {
                window.localStorage.setItem("id", id);
                this.props.history.push('/edit-consultation');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deleteConsultation(id) {
        alertify.confirm("Are you sure to delete this patient.",
            function () {
                PatientService.deleteConsultation(id)
                    .then(res => {
                        window.location.href = '/consultations';
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
                    <div className="card-header"> <h3> Consultation Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>id : </b>{this.props.id}</li>
                        <li className="list-group-item"><b>patient : </b>{this.props.patient}</li>
                        <li className="list-group-item"><b>physician : </b>{this.props.physician}</li>
                        <li className="list-group-item"><b>illness : </b>{this.props.illness}</li>
                        <li className="list-group-item"><b>diagnosed : </b>{this.props.diagnosed}</li>
                        <li className="list-group-item"><b>active : </b>{this.props.active}</li>
                        <li className="list-group-item"><b>startDate : </b>
                            {this.props.startDate !== null ?
                                <Moment format="YYYY/MM/DD HH:mm">
                                    {this.props.startDate}
                                </Moment> : null
                            }
                        </li>
                        <li className="list-group-item"><b>endDate : </b>
                            {this.props.startDate !== null ?
                                <Moment format="YYYY/MM/DD HH:mm">
                                    {this.props.endDate}
                                </Moment> : null
                            }
                        </li>
                        {this.props.showButtons?
                        <li className="list-group-item">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.editConsultation(this.props.id)} >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.deleteConsultation(this.props.id)}>
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
