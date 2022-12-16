import ApiService from "./ApiService";

const BEDS = '/bed';
const SURGEONS = '/surgeon';
const SURGERIES = '/surgery';
const OPERATIONS = '/operation';
const INPATIENTS = '/inpatient'

class InpatientService {
    getAvailableBeds() {
        return ApiService.getAll(BEDS + '/availability');
    }

    addBed(bed) {
        return ApiService.post(BEDS, bed);
    }

    deleteBed(id) {
        return ApiService.deleteById(BEDS + '/' + id);
    }

    getSurgeons() {
        return ApiService.getAll(SURGEONS);
    }

    getSurgeries() {
        return ApiService.getAll(SURGERIES);
    }

    addOperation(operation) {
        return ApiService.post(OPERATIONS, operation);
    }

    getOperations() {
        return ApiService.getAll(OPERATIONS);
    }

    deleteOperation(id) {
        return ApiService.deleteById(OPERATIONS + '/' + id);
    }

    addInpatient(inpatient) {
        return ApiService.post(INPATIENTS, inpatient);
    }

    getInpatients() {
        return ApiService.getAll(INPATIENTS);
    }

    deleteInpatient(id) {
        return ApiService.deleteById(INPATIENTS + '/' + id);
    }
}

export default new InpatientService();