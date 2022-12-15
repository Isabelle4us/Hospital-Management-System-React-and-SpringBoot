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
    'location',
    'date',
    'surgeonId',
    'patientId'
];
let filterArray = []
let checked = {
    id: false,
    patientNo: false,
    name: false
}
let filterAllOperations
class ListOperationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            operations: [],
            message: null,
            indeterminate: false,
            filters: []
        }
        this.reloadOperationList = this.reloadOperationList.bind(this);
    }
    componentDidMount() {
        this.reloadOperationList();
    }

    reloadOperationList() {
        InpatientService.getOperations().then((res) => {
            this.setState({ operations: res.data })
            filterAllOperations = res.data
        });
    }

    addOperation() {
        this.props.history.push('/add-operation');
    }

    editOperation(id) {
        alertify.confirm(
            "Are you sure to edit this operation.",
            ok => {
                window.localStorage.setItem("id", id);
                this.props.history.push('/edit-operation');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    deleteOperation(id) {
        alertify.confirm(
            "Are you sure to delete this operation.",
            ok => {
                InpatientService.deleteOperation(id).then(res => {
                    this.setState({ message: 'operation deleted successfully. ' + res });
                    this.setState({ patients: this.state.operations.filter(operation => operation.id !== id) });
                });
                alertify.success('to delete operation is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    onChangeSearchByName = (e) => {
        this.filterOperations(e.target.value);
    }
    filterOperations = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllOperations.filter(operation => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        if (filter == 'date') {
                            let control = operation[filter].split('T')[0] == value;
                            if (control) find = true;
                        } else {
                            let control = operation[filter] == value;
                            if (control) find = true;
                        }

                    });
                    return find;
                });
                this.setState({ operations: results });
            }
            else { this.reloadOperationList(); }
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
                        onClick={() => this.addOperation()}>
                        Add Operation
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
                                    <th>Surgeon</th>
                                    <th>Patient</th>
                                    <th>Surgery</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Finished</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.operations.map(operation =>
                                    <tr key={operation.id}>
                                        <td>{operation.surgeonId}</td>
                                        <td>{operation.patientId}</td>
                                        <td>{operation.surgeryId}</td>
                                        <td>{operation.location}</td>
                                        <td>
                                            {operation.date !== null ?
                                                <Moment format="YYYY-MM-DD">
                                                    {operation.date}
                                                </Moment>
                                                : null}
                                        </td>
                                        <td>{operation.finished === null ? null : operation.finished.toString()}</td>
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
                                                        onClick={() => this.editOperation(operation.id)} > Edit</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deleteOperation(operation.id)}> Delete </button>
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

export default ListOperationComponent;