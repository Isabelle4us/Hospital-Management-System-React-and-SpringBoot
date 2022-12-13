import React, { Component } from 'react'

export default class NavbarComponent extends Component {
    render() {
        return (
            <div className="sticky-top">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Patients
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"  href="/patients">Patients</a>
                                    <a className="dropdown-item"  href="/add-patient">Add Patient</a>
                                    <a className="dropdown-item"  href="/consultations">Consultations</a>
                                    <a className="dropdown-item"  href="/add-consultation">Add Consultation</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                In-Patients
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"  href="/patients">Patients</a>
                                    <a className="dropdown-item"  href="/add-patient">Add Patient</a>
                                    <a className="dropdown-item"  href="/consultations">Consultations</a>
                                    <a className="dropdown-item"  href="/add-consultation">Add Consultation</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Stuffs
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"  href="/add-physician">Add Physician</a>
                                    <a className="dropdown-item"  href="/add-nurse">Add Nurse</a>
                                    <a className="dropdown-item"  href="/add-surgeon">Add Surgeon</a>
                                    <a className="dropdown-item"  href="/physicians">Physicians</a>
                                    <a className="dropdown-item"  href="/nurses">Nurses</a>
                                    <a className="dropdown-item"  href="/surgeons">Surgeons</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Illness & Surgery
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"  href="/patients">Patients</a>
                                    <a className="dropdown-item"  href="/add-patient">Add Patient</a>
                                    <a className="dropdown-item"  href="/consultations">Consultations</a>
                                    <a className="dropdown-item"  href="/add-consultation">Add Consultation</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Medical Program
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item"  href="/patients">Cholesterol Program</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
