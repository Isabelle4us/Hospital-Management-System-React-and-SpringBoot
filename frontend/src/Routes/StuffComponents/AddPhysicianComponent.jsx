import React, { Component } from 'react'
import StaffService from '../../services/StaffService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

export default class AddPhysicianComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tel: '',
            gender: 'MALE',
            address: '',
            ssn: '',
            annualSalary: '',
            specialty: '',
            percentOwnership: '',
            status: 1
        }
    }

    controlQuickly() {
        return this.state.name === null || this.state.name === '';
    }
    savePhysician = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let physician = this.state;
            StaffService.addPhysician(physician)
                .then(res => {
                    this.setState({ message: 'physician added successfully.' });
                    this.props.history.push('/physicians');
                    alertify.success("Adding physician is ok");
                }).catch((error) => {
                    console.log(error.response)
                    if (error.response) {
                        this.setState({ errorMessage: error.response.data.message, id: null });
                        AlertifyService.alert(error.response.data.message);
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
        } else
            AlertifyService.alert(' missing info ...');
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    back() {
        this.props.history.push('/physicians');
    }
    render() {
        let { name, tel, gender, address, ssn, annualSalary, specialty, percentOwnership } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD PHYSICIAN</h2>
                    <form>
                        <div className="form-group">
                            <label>Name *</label>
                            <input placeholder="name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Address *</label>
                            <input placeholder="address" name="address" className="form-control" value={address} onChange={e => this.onChangeData('address', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Tel *</label>
                            <input placeholder="tel" name="tel" className="form-control" value={tel} onChange={e => this.onChangeData('tel', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Gender *</label>
                            <select className="form-control"
                                value={gender}
                                onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>SSN *</label>
                            <input placeholder="ssn" name="ssn" className="form-control" value={ssn} onChange={e => this.onChangeData('ssn', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Annual Salary *</label>
                            <input placeholder="annualSalary" name="annualSalary" className="form-control" value={annualSalary} onChange={e => this.onChangeData('annualSalary', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Specialty *</label>
                            <input placeholder="specialty" name="specialty" className="form-control" value={specialty} onChange={e => this.onChangeData('specialty', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Percent Ownership *</label>
                            <input placeholder="percentOwnership" name="percentOwnership" className="form-control" value={percentOwnership} onChange={e => this.onChangeData('percentOwnership', e.target.value)} />
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.savePhysician}>Save</button>
                    </form>
                </div>
                <div className="col"></div>
                <div className="col-lg-3">
                    <img style={{ height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
                </div>
                <div className="col-sm-12">
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div>
        );
    }
}