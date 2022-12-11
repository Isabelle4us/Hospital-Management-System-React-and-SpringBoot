import ApiService from "./ApiService";


const PATIENT_API_BASE_URL = '/patient';
const PHYSICIANS = '/physician';
class PatientService {

    getPatients() {
        return ApiService.getAll(PATIENT_API_BASE_URL);
    }

    getPatientById(patientId) {
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/' + patientId);
    }

    deletePatient(Id) {
        return ApiService.deleteById(PATIENT_API_BASE_URL + '/' + Id);
    }

    addPatient(patient) {
        return ApiService.post(PATIENT_API_BASE_URL, patient);
    }

    editPatient(patient) {
        return ApiService.put(PATIENT_API_BASE_URL, patient);
    }
    getPhysicians() {
        return ApiService.getAllDatas(PATIENT_API_BASE_URL+PHYSICIANS);
    }
}

export default new PatientService();