import db from '../database/models/index';
const tripRequests = db['tripRequest'];

// create a 'Trip Request' as requester
export const createTripRequest = async (req, res) => {
    try {
        if (req.user.role !== 'requester') {
            return res.status(403).json({ status: 'fail', message: 'you are not allowed to make a trip request' })

        }

        const type = req.body.returnDate == null ? 'one way trip' : 'return type trip';
        const trip = {
            leavingFrom: req.body.leavingFrom,
            goingTo: req.body.goingTo,
            travelDate: req.body.travelDate,
            returnDate: req.body.returnDate,
            travelReason: req.body.travelReason,
            tripType: type,
            status: req.body.status,
            requesterId: req.user.id,
            accomodationId: req.body.accomodationId
        }

        await tripRequests.create(trip);
        return res.status(201).json({ status: 'success', data: trip, message: 'Trip Request Created Successfully ' });

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// retrieve single trip request as requester
export const getSingleTripRequest = async (req, res) => {

    try {
        const userId = req.user.id;
        const requestId = req.params.id;

        if (req.user.role == 'requester') {
            const trip = await tripRequests.findOne({ where: { id: requestId, requesterId: userId, } })

            if (!trip) {
                return res.status(404).json({ status: 'fail', message: `there are no Trip Requests assigned to user with id=  ${userId}` })
            } else {
                return res.status(200).json({ status: 'success', data: trip });
            }

        } else if (req.user.role == 'manager') {
            const trip = await tripRequests.findOne({ where: { id: requestId } })

            if (!trip) {
                return res.status(404).json({ status: 'fail', message: `there are no Trip Request found` })
            } else {
                return res.status(200).json({ status: 'success', data: trip })
            }
        } else {
            return res.status(403).json({ status: 'fail', message: 'you are not allowed to retrieve a trip request' })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'error while getting trip request' })
    }
};

export const getAllTripRequest = async (req, res) => {
    try {
        const userId = req.user.id;

        if (req.user.role == 'requester') {
            const trips = await tripRequests.findAll({ where: { requesterId: userId } })

            if (!trips) {
                return res.status(404).json({ status: 'fail', message: `there are no Trip Requests assigned to ${userId}` })
            } else {
                return res.status(200).json({ status: 'success', data: trips })
            }

        } else if (req.user.role == 'manager') {
            const trips = await tripRequests.findAll()

            if (!trips) {
                return res.status(404).json({ status: 'fail', message: `there are no Trip Requests found` })
            } else {
                return res.status(200).json({ status: 'success', data: trips })
            }
        } else {
            return res.status(403).json({ status: 'fail', message: 'you are not allowed to retrieve a trip request' })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'error while getting trip request' })
    }
}

export const updateTripRequest = async (req, res) => {
    try {
        if (req.user.role !== 'requester') {
            return res.status(403).json({ status: 'fail', message: 'you are not allowed to update a trip request' })
        }
        const requestId = req.params.id;
        const userId = req.user.id;
        console.log('user', userId);
        console.log('request', requestId);
        const tripRequest = await tripRequests.findOne({
            where: { id: requestId }
        })


        if (!tripRequest) {
            return res.status(404).json({ status: 'fail', message: `No Trip Request with id = ${requestId}` })
        }

        if (tripRequest.status == 'pending') {
            const type = req.body.returnDate == null ? 'one way trip' : 'return type trip';
            const updatedTrip = {
                leavingFrom: req.body.leavingFrom,
                goingTo: req.body.goingTo,
                travelDate: req.body.travelDate,
                returnDate: req.body.returnDate,
                travelReason: req.body.travelReason,
                tripType: type,
                status: req.body.stastus,
                requesterId: req.user.id,
                accomodationId: req.body.accomodationId
            }

            tripRequests.update(updatedTrip, { where: { id: requestId, requesterId: userId } })
                .then(num => {
                    if (num == 1) {
                        res.send({ status: 'success', message: 'trip request updated successfully.' })
                    } else {
                        res.send({
                            message: `Cannot update trip request with id=${requestId}.`
                        });
                    }
                })
        } else {
            return res.status(404).json({ status: 'fail', message: `Trip Request with id = ${requestId} is approved or rejected` })

        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const deleteTripRequest = async (req, res) => {
    try {
        if (req.user.role !== 'requester') {
            return res.status(403).json({ status: 'fail', message: 'you are not allowed to delete a trip request' })
        }
        const requestId = req.params.id;
        const userId = req.user.id;

        const tripRequest = await tripRequests.findOne({
            where: { id: requestId }
        })

        if (!tripRequest) {
            return res.status(404).json({ status: 'fail', message: `No Trip Request with id = ${requestId}` })
        }

        if (tripRequest.status == 'pending') {
            await tripRequests.destroy({ where: { id: requestId, requesterId: userId } })
            res.status(200).json({ status: 'success', message: 'Trip Request Deleted successfully' })
        } else {
            return res.status(404).json({ status: 'fail', message: `Trip Request with id = ${requestId} is approved or rejected` })
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}