import db from '../database/models/index.js';
const Amenity = db['Amenity']
const Accomodation = db['accomodation']

export const createAmenity = async (req, res) => {
    try {
        /**
         * Get accomadation id 
         * get room information
         */
         if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }

        const accomodationId =  req.params.accomodationId
        const {amenityType,amenityDescription} = req.body;

        /**
         * check if accomodation is there
         */

        const accomodation = await Accomodation.findOne({
            where:{id:accomodationId}
        })

        if(!accomodation){
            return  res.status(404).json({
                status:"fail",
                message:"No accomodation found with that ID"
            })
        }


		const newAmenity = await Amenity.create({
            amenityType,
            amenityDescription,
            accomodationId:accomodation.id

        });
		return res.status(201).json({
            status:"success",
            data:{
                newAmenity
            }
        })		
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

export const  getAllAmenity = async (req, res) => {
	try{

        const amenity =  await Amenity.findAndCountAll()
       res.status(200).json({
           status:"success",
           data:{
            amenity 
           }
       })
	}
	catch(error) {
		return res.status(500).json(error.message);
	}
};

export const getSingleAmenity = async(req, res) => {

	try{
	const id = req.params.id;
    const amenity =  await Amenity.findOne({where:{id},include:['accomodation']})

    if(!amenity){
        return res.status(404).json({
            status:"success",
            message:"No amenity found with that ID"
        })
    }
	res.status(200).json({
        status:"success",
        data:{
            amenity
        }
    })
	}catch(err) {
		res.send(err)
	
  };
}
export const updateAmenity = async(req, res) => {

	try{
        if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }
       
	const id = req.params.id;
    const {amenityType,amenityDescription} = req.body;
    const amenity =  await Amenity.findOne({where:{id}})

    if(!amenity){
        return res.status(404).json({
            status:"success",
            message:"No amenity found with that ID"
        })
    }

    await Amenity.update({
        amenityType,
        amenityDescription
    },{where:{id}})


	res.status(200).json({
        status:"success",
        data:{
            amenity
        }
    })
	}catch(err) {
		res.send(err)
	
  };
}

export const deleteAmenity = async(req, res) => {

	try{
        if (req.user.dataValues.role !== 'travel admin') {
			return res.status(403).json({status:"fail",message: "not traveler admin"})
		 }
	const id = req.params.id;
    const amenity =  await Amenity.findOne({where:{id}})
   
    if(!amenity){
        return res.status(404).json({
            status:"fail",
            message:"No Amenity found with that ID"
        })
    }

    await Amenity.destroy({where:{id}})

	res.status(200).json({
        status:"success",
        message:"Amenity deleted successfully"
    })
	}catch(err) {
		res.send(err)
	
  };
}