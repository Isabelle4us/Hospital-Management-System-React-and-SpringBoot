import React, { Component } from 'react'
import StaffService from '../../services/StaffService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css"
// import Modal from 'react-modal'; 
import * as alertify from 'alertifyjs';

const items = [
    'id',
    'name',
    'ssn'
];
let filterArray = []
let checked = {
    id: false,
    name: false,
    ssn: false
}
let filterAllNurses
class ListNurseComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nurses: [],
            message: null,
            indeterminate: false,
            filters: [],
            nurse:{}
        }
        this.reloadNurseList = this.reloadNurseList.bind(this); 
    }
    componentDidMount() {
        this.reloadNurseList();
    } 

    reloadNurseList() {
        StaffService.getNurses().then((res) => {
            this.setState({ nurses: res.data })
            filterAllNurses = res.data
        });
    }
    deleteNurse(id) {
        alertify.confirm(
            "Are you sure to delete this nurse.",
            ok => {
                StaffService.deleteNurse(id).then(res => {
                    this.setState({ message: 'Nurse deleted successfully. ' + res });
                    this.setState({ nurses: this.state.nurses.filter(nurse => nurse.id !== id) });
                });
                alertify.success('to delete nurse is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addNurse() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-nurse');
    }

    onChangeSearchByName = (e) => {
        this.filterNurses(e.target.value);
    }
    filterNurses = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllNurses.filter(nurse => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = nurse[filter] == value;
                        if (control) find = true;
                    });
                    return find;
                });
                this.setState({ nurses: results });
            }
            else { this.reloadNurseList(); }
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
                        onClick={() => this.addNurse()}>
                        Add Nurse
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Nurse by choosing any parameter"
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
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>SSN</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.nurses.map(nurse =>
                                    <tr className={nurse.gender === "MALE" ? "bg-default" : "bg-danger"} key={nurse.id}>
                                        <td>{nurse.id}</td>
                                        <td>{nurse.name}</td>
                                        <td>{nurse.ssn}</td>
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
                                                        onClick={() => this.deleteNurse(nurse.id)}> Delete </button>
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

export default ListNurseComponent;