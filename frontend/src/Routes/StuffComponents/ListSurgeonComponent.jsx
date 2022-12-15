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
let filterAllSurgeons
class ListSurgeonComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surgeons: [],
            message: null,
            indeterminate: false,
            filters: [],
            surgeon:{}
        }
        this.reloadSurgeonList = this.reloadSurgeonList.bind(this);
    }
    componentDidMount() {
        this.reloadSurgeonList();
    }

    reloadSurgeonList() {
        StaffService.getSurgeons().then((res) => {
            this.setState({ surgeons: res.data })
            filterAllSurgeons = res.data
        });
    }
    deleteSurgeon(id) {
        alertify.confirm(
            "Are you sure to delete this surgeon.",
            ok => {
                StaffService.deleteSurgeon(id).then(res => {
                    this.setState({ message: 'Surgeon deleted successfully. ' + res });
                    this.setState({ surgeons: this.state.surgeons.filter(surgeon => surgeon.id !== id) });
                });
                alertify.success('to delete surgeon is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addSurgeon() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-surgeon');
    }

    onChangeSearchByName = (e) => {
        this.filterSurgeons(e.target.value);
    }
    filterSurgeons = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllSurgeons.filter(surgeon => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = surgeon[filter] == value;
                        if (control) find = true;
                    });
                    return find;
                });
                this.setState({ surgeons: results });
            }
            else { this.reloadSurgeonList(); }
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
                        onClick={() => this.addSurgeon()}>
                        Add Surgeon
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Surgeon by choosing any parameter"
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
                                {this.state.surgeons.map(surgeon =>
                                    <tr className={surgeon.gender === "MALE" ? "bg-default" : "bg-danger"} key={surgeon.id}>
                                        <td>{surgeon.id}</td>
                                        <td>{surgeon.name}</td>
                                        <td>{surgeon.ssn}</td>
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
                                                        onClick={() => this.deleteSurgeon(surgeon.id)}> Delete </button>
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

export default ListSurgeonComponent;