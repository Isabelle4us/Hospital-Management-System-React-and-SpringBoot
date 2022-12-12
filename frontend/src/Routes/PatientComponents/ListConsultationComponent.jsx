import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css"
// import Modal from 'react-modal';
import * as alertify from 'alertifyjs';

import Moment from 'react-moment';

const items = [
    'physicianId',
    'date'
];
let filterArray = []
let checked = {
    id: false,
    patientNo: false,
    name: false
}
let filterAllConsultations
class ListConsultationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consultations: [],
            message: null,
            indeterminate: false,
            filters: []
        }
        this.reloadConsultationList = this.reloadConsultationList.bind(this);
    }
    componentDidMount() {
        this.reloadConsultationList();
    }

    reloadConsultationList() {
        PatientService.getConsultations().then((res) => {
            this.setState({ consultations: res.data })
            filterAllConsultations = res.data
        });
    }
    deleteConsultation(id) {
        alertify.confirm(
            "Are you sure to delete this consultation.",
            ok => {
                PatientService.deleteConsultation(id).then(res => {
                    this.setState({ message: 'consultation deleted successfully. ' + res });
                    this.setState({ patients: this.state.consultations.filter(consultation => consultation.id !== id) });
                });
                alertify.success('to delete consultation is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    onChangeSearchByName = (e) => {
        this.filterConsultations(e.target.value);
    }
    filterConsultations = (value) => {
        var results = [];
        if (filterArray.length === 1) {
            if (filterArray[0] == 'physicianId') {
                results = filterAllConsultations.filter(consultation => consultation[filterArray[0]] == value);
            } else {
                results = filterAllConsultations.filter(consultation => consultation[filterArray[0]].split('T')[0] == value);
            }
            this.setState({consultations: results});
        } else if (filterArray.length === 2) {
            let valueArray = value.split('&');
            let resultsById = filterAllConsultations.filter(consultation => consultation[filterArray[0]] == valueArray[0]);
            console.log(resultsById);
            results = resultsById.filter(consultation => consultation[filterArray[1]].split('T')[0] == valueArray[1]);
            console.log(results);
            this.setState({consultations: results});
        } else if (value != null && value != '') {
            alertify.set('notifier', 'delay', 2);
            //alertify.set('notifier','position', 'top-center');
            alertify.error('Please select any parameters');
        } else {
            this.reloadConsultationList();
        }
    }
    createCheckboxes = () => (items.map((item) => this.createCheckbox(item)))
    createCheckbox = label => (
        <div className="float-left" style={{ margin: "0 25px 0 0" }} key={label} >
            <Checkbox
                nativeControlId='my-checkbox'
                checked={checked[label]}
                onChange={(e) => { this.changeStateForChecked(e, label); }}
            />
            <label className="checkbox-label" ><b>{label}</b></label>
        </div>
    )
    changeStateForChecked = (e, label) => {
        checked[label] = e.target.checked;
        var index = filterArray.indexOf(label);
        if (checked[label]) {
            if (index === -1) { filterArray.push(label); }
        } else {
            if (index !== -1) { filterArray.splice(index, 1); }
        }
    }
    viewPatientQuickly(patient){
        this.setState({patient});
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Patient by choosing any parameter"
                            name="searchByName"
                            className="form-control"
                            onChange={this.onChangeSearchByName} />
                    </div>
                    <hr />
                </div>
                <div className="col-lg-6"> {this.createCheckboxes()} </div>

                <div className="col-lg-12">
                    <div className="table-responsive-lg">
                        <table className="table table-bordered table-sm table-dark table-hover" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.consultations.map(consultation =>
                                    <tr key={consultation.id}>
                                        <td>{consultation.physicianId}</td>
                                        <td>
                                            {consultation.date !== null ?
                                                <Moment format="YYYY-MM-DD">
                                                    {consultation.date}
                                                </Moment>
                                                : null}
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1"
                                                    type="button"
                                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"> Actions </button>
                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deleteConsultation(consultation.id)}> Delete </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

}

export default ListConsultationComponent;