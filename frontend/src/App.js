import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom"; //Router,
import ListPatientComponent from './Routes/PatientComponents/ListPatientComponent';
import ViewPatientComponent from './Routes/PatientComponents/ViewPatientComponent';
import AddPatientComponent from './Routes/PatientComponents/AddPatientComponent';
import EditPatientComponent from './Routes/PatientComponents/EditPatientComponent';
import AddConsultationComponent from './Routes/PatientComponents/AddConsultationComponent';
import ListConsultationComponent from './Routes/PatientComponents/ListConsultationComponent';
import ViewConsultationComponent from './Routes/PatientComponents/ViewConsultationComponent';

import ListBedComponent from './Routes/InpatientComponents/ListBedComponent';
import AddBedComponent from './Routes/InpatientComponents/AddBedComponent';
import AddOperationComponent from './Routes/InpatientComponents/AddOperationComponent';
import ListOperationComponent from './Routes/InpatientComponents/ListOperationComponent';
import EditOperationComponent from './Routes/InpatientComponents/EditOperationComponent';
import AddInpatientComponent from './Routes/InpatientComponents/AddInpatientComponent';
import ListInpatientComponent from './Routes/InpatientComponents/ListInpatientComponent';
import EditInpatientComponent from './Routes/InpatientComponents/EditInpatientComponent';

import AddNurseComponent from './Routes/StuffComponents/AddNurseComponent';
import ListNurseComponent from './Routes/StuffComponents/ListNurseComponent';
import AddSurgeonComponent from './Routes/StuffComponents/AddSurgeonComponent';
import ListSurgeonComponent from './Routes/StuffComponents/ListSurgeonComponent';
import AddPhysicianComponent from './Routes/StuffComponents/AddPhysicianComponent';
import ListPhysicianComponent from './Routes/StuffComponents/ListPhysicianComponent';

import AddIllnessComponent from './Routes/SurgeryTypeComponents/AddIllnessComponent';
import ListIllnessComponent from './Routes/SurgeryTypeComponents/ListIllnessComponent';
import AddSurgeryComponent from './Routes/SurgeryTypeComponents/AddSurgeryComponent';
import ListSurgeryComponent from './Routes/SurgeryTypeComponents/ListSurgeryComponent';

import NotFoundComponent from './NotFound/NotFoundComponent';
import ViewProblemComponent from './Routes/PatientComponents/ProblemComponent/ViewProblemComponent';
import IndexPage2 from './Routes/IndexPage2';
import { Lines } from 'react-preloaders';
import ReceipeFormComponent from './Routes/PatientComponents/ReceipeComponent/ReceipeFormComponent';
import NavbarComponent from './Navbar/NavbarComponent';
import ProblemFormComponent from './Routes/PatientComponents/ProblemComponent/ProblemFormComponent';
// https://www.youtube.com/watch?v=DQ93TxqKkWo
function App() {
  return (            
    <div className="App" >
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <NavbarComponent />
          <a href="/">
            {/* style={{width: 400, height: 100}}  */}
            <img style={{ height: "100px", margin: "10px 0"}}  
            src="https://www.njha.com/media/571098/NJHA-LOGO.jpg" alt="" />
          </a>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={ListPatientComponent} />
                <Route path="/patients" component={ListPatientComponent} />
                <Route path="/view-patient/:id" component={ViewPatientComponent} />
                <Route path="/add-patient" component={AddPatientComponent} />
                <Route path="/edit-patient" component={EditPatientComponent} />
                <Route path="/consultations" component={ListConsultationComponent} />
                <Route path="/add-consultation" component={AddConsultationComponent} />
                <Route path="/view-consultation/:id" component={ViewConsultationComponent} />

                <Route path="/beds" component={ListBedComponent} />
                <Route path="/add-bed" component={AddBedComponent} />
                <Route path="/operations" component={ListOperationComponent} />
                <Route path="/add-operation" component={AddOperationComponent} />
                <Route path="/edit-operation" component={EditOperationComponent} />
                <Route path="/inpatients" component={ListInpatientComponent} />
                <Route path="/add-inpatient" component={AddInpatientComponent} />
                <Route path="/edit-inpatient" component={EditInpatientComponent} />

                <Route path="/add-nurse" component={AddNurseComponent} />
                <Route path="/nurses" component={ListNurseComponent} />
                <Route path="/add-surgeon" component={AddSurgeonComponent} />
                <Route path="/surgeons" component={ListSurgeonComponent} />
                <Route path="/add-physician" component={AddPhysicianComponent} />
                <Route path="/physicians" component={ListPhysicianComponent} />

                <Route path="/add-illness" component={AddIllnessComponent} />
                <Route path="/illnesses" component={ListIllnessComponent} />
                <Route path="/add-surgery" component={AddSurgeryComponent} />
                <Route path="/surgeries" component={ListSurgeryComponent} />

                <Route path="/add-problem" component={ProblemFormComponent} />
                <Route path="/problem/:problemid" component={ViewProblemComponent} />
                <Route path="/receipe-form" component={ReceipeFormComponent} />
                <Route path="/notfound" component={NotFoundComponent} />
                <Route path="/de" component={IndexPage2} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
      {/* <Lines /> */}
      {/* <Lines animation="slide-left" />; */}
      
      <Lines animation="slide" />

      {/* <Lines animation="slide-down" />; */}

      {/* <Lines animation="slide-right" />; */}
    </div>
  );
}

export default App;