import ApiService from "./ApiService";

const BEDS = '/bed';
const SURGEONS = '/surgeon';
const SURGERIES = '/surgery';
const OPERATIONS = '/operation';

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

    getOperations(operation) {
        return ApiService.getAll(OPERATIONS);
    }
}

export default new InpatientService();