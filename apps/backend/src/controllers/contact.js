const contactUs = require('../models/contact');


async function handleContactUs(req,res) {
    const body = req.body;
    const addcontact = await contactUs.create({
        userId: body.userId,
        type: body.type,
        submittedAs: body.submittedAs,
        submittedTo:body.submittedTo,
        law:body.law,
        subject:body.subject,
        message: body.message,
        
    });
    if(addcontact){
        res.status(201).json({
            message: 'Your enquiry has been submitted successfully',
            contact: {
              id: addcontact.id,
            }
          });
    }
    
}

module.exports = {
    handleContactUs,
}