import ApiService from "./ApiService";


const PATIENT = '/patient';
const PHYSICIAN = '/physician';
const ILLNESS = '/illness';
const CONSULTATION = '/consultation';

class PatientService {

    getPatients() {
        return ApiService.getAll(PATIENT);
    }

    getPatientById(patientId) {
        return ApiService.getOneById(PATIENT + '/' + patientId);
    }

    deletePatient(Id) {
        return ApiService.deleteById(PATIENT + '/' + Id);
    }

    addPatient(patient) {
        return ApiService.post(PATIENT, patient);
    }

    editPatient(patient) {
        return ApiService.put(PATIENT, patient);
    }
    
    getPhysicians() {
        return ApiService.getAllDatas(PHYSICIAN);
    }

    getPhysicianById(id) {
        return ApiService.getOneById(PHYSICIAN + '/' + id);
    }
    
    getIllnesses() {
        return ApiService.getAllDatas(ILLNESS);
    }

    getIllnessById(id) {
        return ApiService.getOneById(ILLNESS + '/' + id);
    }

    addConsultation(consultation) {
        return ApiService.post(CONSULTATION, consultation);
    }

    getConsultations() {
        return ApiService.getAllDatas(CONSULTATION);
    }

    getConsultationById(id) {
        return ApiService.getOneById(CONSULTATION + '/' + id);
    }
}

export default new PatientService();