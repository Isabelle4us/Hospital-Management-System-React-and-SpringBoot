import ApiService from "./ApiService";

const BEDS = '/bed';

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
}

export default new InpatientService();