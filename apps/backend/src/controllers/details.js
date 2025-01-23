const vetClinic = require('../models/veterinaryDetails');
const breeder = require('../models/breederDetails');
const groomer = require('../models/petGroomer');
const petBoarding = require('../models/petBoardindDetails');

async function handleVetClinic(req,res){
    const body = req.body;
    const addVet = await vetClinic.create({
        userId: body.userId,
        clinicName: body.clinicName,
        vetName: body.vetName,
        clinicAddress:body.clinicAddress,
        city:body.city,
        country: body.country,
        zipCode: body.zipCode,
        telephone: body.telephone,
        emailAddess: body.emailAddess,
        website: body.website,
    });
    if(addVet){
        res.status(201).json({
            message: 'Veterinary clinic details added successfully',
            vetId: {
              id: addVet.id,
            }
          });
    }
   
}

async function handleBreeder(req,res){
    const body = req.body;
    const addBreeder = await breeder.create({
        userId: body.userId,
        breederName: body.breederName,
        breederAddress:body.breederAddress,
        city:body.city,
        country: body.country,
        zipCode: body.zipCode,
        telephone: body.telephone,
        emailAddess: body.emailAddess,
        website: body.website,
    });
    if(addBreeder){
        res.status(201).json({
            message: 'Breeder details added successfully',
            BreederId: {
              id: addBreeder.id,
            }
          });
    }
   
}

async function handlePetGroomer(req,res){
    const body = req.body;
    const addGroomer = await groomer.create({
        userId: body.userId,
        groomerName: body.groomerName,
        groomerAddress:body.groomerAddress,
        city:body.city,
        country: body.country,
        zipCode: body.zipCode,
        telephone: body.telephone,
        emailAddess: body.emailAddess,
        website: body.website,
    });
    if(addGroomer){
        res.status(201).json({
            message: 'Pet Groomer details added successfully',
            GroomerId: {
              id: addGroomer.id,
            }
          });
    }
   
}

async function handlePetBoarding(req,res){
    const body = req.body;
    const addPetBoarding = await petBoarding.create({
        userId: body.userId,
        boardingName: body.boardingName,
        boardingAddress:body.boardingAddress,
        city:body.city,
        country: body.country,
        zipCode: body.zipCode,
        telephone: body.telephone,
        emailAddess: body.emailAddess,
        website: body.website,
    });
    if(addPetBoarding){
        res.status(201).json({
            message: 'Pet Boarding details added successfully',
            petBoardingId: {
              id: addPetBoarding.id,
            }
          });
    }
   
}

module.exports = {
    handleVetClinic,
    handleBreeder,
    handlePetGroomer,
    handlePetBoarding,
   
}