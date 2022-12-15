import React, { Component } from 'react'
import InpatientService from '../../services/InpatientService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css"
import * as alertify from 'alertifyjs';

const items = [
    'id',
    'roomId'
];
let filterArray = []
let checked = {
    id: false,
    roomId: false
}
let filterAllBeds
class ListBedComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beds: [],
            message: null,
            indeterminate: false,
            filters: [],
            bed:{}
        }
        this.reloadBedList = this.reloadBedList.bind(this); 
    }
    componentDidMount() {
        this.reloadBedList();
    } 

    reloadBedList() {
        InpatientService.getAvailableBeds().then((res) => {
            this.setState({ beds: res.data })
            filterAllBeds = res.data
            console.log(filterAllBeds);
        });
    }
    deleteBed(id) {
        alertify.confirm(
            "Are you sure to delete this bed.",
            ok => {
                InpatientService.deleteBed(id).then(res => {
                    this.setState({ message: 'Bed deleted successfully. ' + res });
                    this.setState({ beds: this.state.beds.filter(bed => bed.id !== id) });
                });
                alertify.success('to delete bed is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addBed() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-bed');
    }

    onChangeSearchByName = (e) => {
        this.filterBeds(e.target.value);
    }
    filterBeds = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllBeds.filter(bed => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = bed[filter] == value;
                        if (control) find = true;
                    });
                    return find;
                });
                this.setState({ beds: results });
            }
            else { this.reloadBedList(); }
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
                        onClick={() => this.addBed()}>
                        Add Bed
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Bed by choosing any parameter"
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
                                    <th>Bed No</th>
                                    <th>Room No</th>
                                    <th>Is Available</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.beds.map(bed =>
                                    <tr key={bed.id}>
                                        <td>{bed.id}</td>
                                        <td>{bed.roomId}</td>
                                        <td>{bed.available.toString()}</td>
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
                                                        onClick={() => this.deleteBed(bed.id)}> Delete </button>
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

export default ListBedComponent;