import ApiService from "./ApiService";

const PHYSICIANS = '/physician';
const NURSES = '/nurse';
const SURGEONS = '/surgeon';

class StaffService {

    getPhysicians() {
        return ApiService.getAll(PHYSICIANS);
    }
    addPhysician(physician) {
        return ApiService.post(PHYSICIANS, physician);
    }
    deletePhysician(id) {
        return ApiService.deleteById(PHYSICIANS, id);
    }

    getNurses() {
        return ApiService.getAll(NURSES);
    }
    addNurse(nurse) {
        console.log(nurse);
        return ApiService.post(NURSES, nurse);
    }
    deleteNurse(id) {
        return ApiService.deleteById(NURSES, id);
    }

    getSurgeons() {
        return ApiService.getAll(SURGEONS);
    }
    addSurgeon(surgeon) {
        return ApiService.post(SURGEONS, surgeon);
    }
    deleteSurgeon(id) {
        return ApiService.deleteById(SURGEONS, id);
    }
}

export default new StaffService();