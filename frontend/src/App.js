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

import AddNurseComponent from './Routes/StuffComponents/AddNurseComponent';
import ListNurseComponent from './Routes/StuffComponents/ListNurseComponent';
import AddSurgeonComponent from './Routes/StuffComponents/AddSurgeonComponent';
import ListSurgeonComponent from './Routes/StuffComponents/ListSurgeonComponent';
import AddPhysicianComponent from './Routes/StuffComponents/AddPhysicianComponent';
import ListPhysicianComponent from './Routes/StuffComponents/ListPhysicianComponent';

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

                <Route path="/add-nurse" component={AddNurseComponent} />
                <Route path="/nurses" component={ListNurseComponent} />
                <Route path="/add-surgeon" component={AddSurgeonComponent} />
                <Route path="/surgeons" component={ListSurgeonComponent} />
                <Route path="/add-physician" component={AddPhysicianComponent} />
                <Route path="/physicians" component={ListPhysicianComponent} />

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