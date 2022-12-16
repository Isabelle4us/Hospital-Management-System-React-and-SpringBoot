import React, { Component } from 'react'
import InpatientService from '../../services/InpatientService';
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
    'nurseId',
    'bedId',
    'physicianId',
    'patientId'
];
let filterArray = []
let checked = {
    nurseId: false,
    bedId: false,
    physicianId: false,
    patientId: false,
}
let filterAllInpatients
class ListInpatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inpatients: [],
            message: null,
            indeterminate: false,
            filters: []
        }
        this.reloadInpatientList = this.reloadInpatientList.bind(this);
    }
    componentDidMount() {
        this.reloadInpatientList();
    }

    reloadInpatientList() {
        InpatientService.getInpatients().then((res) => {
            this.setState({ inpatients: res.data })
            filterAllInpatients = res.data
        });
    }

    addInpatient() {
        this.props.history.push('/add-inpatient');
    }

    editInpatient(id) {
        alertify.confirm(
            "Are you sure to edit this inpatient.",
            ok => {
                window.localStorage.setItem("id", id);
                this.props.history.push('/edit-inpatient');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    deleteInpatient(id) {
        alertify.confirm(
            "Are you sure to delete this inpatient.",
            ok => {
                InpatientService.deleteInpatient(id).then(res => {
                    this.setState({ message: 'inpatient deleted successfully. ' + res });
                    this.setState({ patients: this.state.inpatients.filter(inpatient => inpatient.id !== id) });
                });
                alertify.success('to delete inpatient is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    onChangeSearchByName = (e) => {
        this.filterInpatients(e.target.value);
    }
    filterInpatients = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllInpatients.filter(inpatient => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        if (filter == 'date') {
                            let control = inpatient[filter].split('T')[0] == value;
                            if (control) find = true;
                        } else {
                            let control = inpatient[filter] == value;
                            if (control) find = true;
                        }

                    });
                    return find;
                });
                this.setState({ inpatients: results });
            }
            else { this.reloadInpatientList(); }
        } else {
            alertify.set('notifier', 'delay', 2);
            //alertify.set('notifier','position', 'top-center');
            alertify.error('Please select any parameters');
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

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <button
                        className="btn btn-warning"
                        onClick={() => this.addInpatient()}>
                        Add Inpatient
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Inpatient by choosing any parameter"
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
                                    <th>Physician</th>
                                    <th>Patient</th>
                                    <th>Nurse</th>
                                    <th>Bed</th>
                                    <th>Admission</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.inpatients.map(inpatient =>
                                    <tr key={inpatient.id}>
                                        <td>{inpatient.physicianId}</td>
                                        <td>{inpatient.patientId}</td>
                                        <td>{inpatient.nurseId}</td>
                                        <td>{inpatient.bedId}</td>
                                        <td>{inpatient.admission}</td>
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
                                                        onClick={() => this.editInpatient(inpatient.id)} > Edit</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deleteInpatient(inpatient.id)}> Delete </button>
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

export default ListInpatientComponent;