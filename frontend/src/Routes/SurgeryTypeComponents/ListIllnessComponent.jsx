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
    'illnessCode',
];
let filterArray = []
let checked = {
    illnessCode: false,
}
let filterAllIllnesses
class ListIllnessComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            illnesses: [],
            message: null,
            indeterminate: false,
            filters: [],
            illness:{}
        }
        this.reloadIllnessList = this.reloadIllnessList.bind(this); 
    }
    componentDidMount() {
        this.reloadIllnessList();
    } 

    reloadIllnessList() {
        SurgeryTypeService.getIllnesses().then((res) => {
            this.setState({ illnesses: res.data })
            filterAllIllnesses = res.data
        });
    }
    deleteIllness(id) {
        alertify.confirm(
            "Are you sure to delete this illness.",
            ok => {
                SurgeryTypeService.deleteIllness(id).then(res => {
                    this.setState({ message: 'Illness deleted successfully. ' + res });
                    this.setState({ illnesses: this.state.illnesses.filter(illness => illness.id !== id) });
                });
                alertify.success('to delete illness is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addIllness() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-illness');
    }

    onChangeSearchByName = (e) => {
        this.filterIllnesses(e.target.value);
    }
    filterIllnesses = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllIllnesses.filter(illness => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = illness[filter] == value;
                        if (control) find = true;
                    });
                    return find;
                });
                this.setState({ illnesses: results });
            }
            else { this.reloadIllnessList(); }
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
                        onClick={() => this.addIllness()}>
                        Add Illness
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Illness by choosing any parameter"
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
                                    <th>Illness Code</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.illnesses.map(illness =>
                                    <tr className={illness.gender === "MALE" ? "bg-default" : "bg-danger"} key={illness.id}>
                                        <td>{illness.id}</td>
                                        <td>{illness.illnessCode}</td>
                                        <td>{illness.description}</td>
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
                                                        onClick={() => this.deleteIllness(illness.id)}> Delete </button>
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

export default ListIllnessComponent;