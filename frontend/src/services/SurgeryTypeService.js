import ApiService from "./ApiService";

const ILLNESSES = '/illness';
const SURGERIES = '/surgery';

class SurgeryTypeService {
    getIllnesses() {
        return ApiService.getAll(ILLNESSES);
    }
    addIllness(illness) {
        return ApiService.post(ILLNESSES, illness);
    }
    deleteIllness(id) {
        return ApiService.deleteById(ILLNESSES + '/' + id);
    }

    getSurgeries() {
        return ApiService.getAll(SURGERIES);
    }
    addSurgery(surgery) {
        return ApiService.post(SURGERIES, surgery);
    }
    deleteSurgery(id) {
        return ApiService.deleteById(SURGERIES + '/' + id);
    }
}

export default new SurgeryTypeService();