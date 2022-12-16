import React, { Component } from 'react'
import SurgeryTypeService from '../../services/SurgeryTypeService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css"
// import Modal from 'react-modal'; 
import * as alertify from 'alertifyjs';

const items = [
    'surgeryCode',
];
let filterArray = []
let checked = {
    surgeryCode: false,
}
let filterAllSurgeries
class ListSurgeryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surgeries: [],
            message: null,
            indeterminate: false,
            filters: [],
            surgery:{}
        }
        this.reloadSurgeryList = this.reloadSurgeryList.bind(this); 
    }
    componentDidMount() {
        this.reloadSurgeryList();
    } 

    reloadSurgeryList() {
        SurgeryTypeService.getSurgeries().then((res) => {
            this.setState({ surgeries: res.data })
            filterAllSurgeries = res.data
        });
    }
    deleteSurgery(id) {
        alertify.confirm(
            "Are you sure to delete this surgery.",
            ok => {
                SurgeryTypeService.deleteSurgery(id).then(res => {
                    this.setState({ message: 'Surgery deleted successfully. ' + res });
                    this.setState({ surgeries: this.state.surgeries.filter(surgery => surgery.id !== id) });
                });
                alertify.success('to delete surgery is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addSurgery() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-surgery');
    }

    onChangeSearchByName = (e) => {
        this.filterSurgeries(e.target.value);
    }
    filterSurgeries = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllSurgeries.filter(surgery => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = surgery[filter] == value;
                        if (control) find = true;
                    });
                    return find;
                });
                this.setState({ surgeries: results });
            }
            else { this.reloadSurgeryList(); }
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
                        onClick={() => this.addSurgery()}>
                        Add Surgery
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Surgery by choosing any parameter"
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
                                    <th>Surgery Code</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>specialNeeds</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.surgeries.map(surgery =>
                                    <tr className={surgery.gender === "MALE" ? "bg-default" : "bg-danger"} key={surgery.id}>
                                        <td>{surgery.id}</td>
                                        <td>{surgery.name}</td>
                                        <td>{surgery.surgeryCode}</td>
                                        <td>{surgery.category}</td>
                                        <td>{surgery.location}</td>
                                        <td>{surgery.specialNeeds}</td>
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
                                                        onClick={() => this.deleteSurgery(surgery.id)}> Delete </button>
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

export default ListSurgeryComponent;