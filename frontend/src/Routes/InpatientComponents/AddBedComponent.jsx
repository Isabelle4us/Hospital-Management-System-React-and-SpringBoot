import React, { Component } from 'react'
import InpatientService from '../../services/InpatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

export default class AddBedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: '',
            available: true,
            status: 1
        }
    }

    controlQuickly() {
        return this.state.roomId === null || this.state.roomId === '';
    }
    saveBed = (e) => {
        if (!this.controlQuickly()) {
            e.preventDefault();
            let bed = this.state;
            InpatientService.addBed(bed)
                .then(res => {
                    this.setState({ message: 'Bed added successfully.' });
                    this.props.history.push('/beds');
                    alertify.success("Adding bed is ok");
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
        this.props.history.push('/beds');
    }
    render() {
        let { roomId, available } = this.state;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.back()}> Back </button>
                    <hr />
                </div>
                <div className="col-sm-8">
                    <h2 className="text-center">ADD NURSE</h2>
                    <form>
                        <div className="form-group">
                            <label>Room NO *</label>
                            <input placeholder="roomId" name="roomId" className="form-control" value={roomId} onChange={e => this.onChangeData('roomId', e.target.value)} />
                        </div>

                        <button className="btn btn-success" type="button" onClick={this.saveBed}>Save</button>
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