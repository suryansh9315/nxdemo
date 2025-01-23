const express = require('express');
const { handleUserRegistration,handleUserLogin,handlehome } = require('../controllers/user');
const { handleAddPet,handleGetPet,handleDeletePet,handleEditPet } = require('../controllers/pet');
const { handleVetClinic,handleBreeder,handlePetGroomer,handlePetBoarding } = require('../controllers/details');
const { handleAddAppointment,handleGetAppointment,handleCancelAppointment } = require('../controllers/appointment');
const {  handleContactUs } = require('../controllers/contact');
const {  handleAddVaccination,handleEditVaccination,handleGetVaccination } = require('../controllers/vaccination');
const {  handlePhysioPlan,handleAddPainJournal,handleGetPhysioPlan,handleGetPainJournal } = require('../controllers/plan');
const {  handlesaveMedicalRecord,handleMedicalRecordList } = require('../controllers/medicalRecords');
const { handleDiabetesRecords,handleDiabetesLogs} = require('../controllers/diabetesRecords');
const { handleSaveSharedDuties,handleEditSharedDuties,handleGetSharedDuties } = require('../controllers/sharedDuties');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null,"./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    },

});
const upload = multer({ storage })


router.post('/addPet',handleAddPet);
router.post('/editPet',upload.single("petImage"),handleEditPet);
router.post('/getpets',handleGetPet);
router.post('/deletepet',handleDeletePet);
router.post('/addVetDetails',handleVetClinic);
router.post('/addBreederDetails',handleBreeder);
router.post('/addPetGroomer',handlePetGroomer);
router.post('/addPetBoarding',handlePetBoarding);
router.post('/bookappointment',upload.single("document"),handleAddAppointment);
router.post('/getappointments',handleGetAppointment);
router.post('/cancelappointment',handleCancelAppointment);
router.post('/sendquery',handleContactUs);
router.post('/addVaccinationRecord',upload.single("vaccineImage"),handleAddVaccination);
router.post('/editVaccinationRecord',upload.single("vaccineImage"),handleEditVaccination);
router.post('/getVaccinationRecord',handleGetVaccination);
router.post('/savePhysioPlan',handlePhysioPlan);
router.post('/getphysio-list',handleGetPhysioPlan);
router.post('/savepainjournal',handleAddPainJournal);
router.post('/getpainjournal',handleGetPainJournal);
router.post('/saveMedicalRecord',upload.array("medicalDocs"),handlesaveMedicalRecord);
router.post('/getMedicalRecordList',handleMedicalRecordList);
router.post('/saveDiabetesRecords',upload.array("PetImage"),handleDiabetesRecords);
router.post('/getDiabetesLogs',handleDiabetesLogs);
router.post('/saveSharedDuties',handleSaveSharedDuties);
router.post('/getSharedDuties',handleGetSharedDuties);
router.post('/editSharedDuties',handleEditSharedDuties);
router.get('/',handlehome);
module.exports = router;