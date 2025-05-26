const NEWDATA = require('../models/newFileData')
exports.newController = async (req, res) => {
    try {
        const { data, fullName, email } = req.body
        const addDataToNewModel = await NEWDATA.create({ data: data, fullName: fullName, email: email })
        return res.status(200).json({ status: 200, message: "Data Is Added", finalData: addDataToNewModel })
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
};
exports.newUpdateController = async (req, res) => {
    try {
        const { updatedId } = req.body
        const payload = {
            email: "ritik@gmail.com",
            fullName: "Ritik Thakur"

        }
        // const addDataToNewModel = await NEWDATA.updateOne({ _id: updatedId }, { $push: { data: { playerName: "Rahul2" } }, email: "hdfjsg@gmail.com" })

        const userData2 = await NEWDATA.updateOne({ _id: updatedId }, { "data": { $elemMatch: { "workSpaceName": { $ne: workSpaceName } } } }, { "connectedWorkSpace.$[elem].connectedStatus": false }, { arrayFilters: [{ "elem.connectedStatus": true }] })

        return res.status(200).json({ addDataToNewModel })
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
};
exports.newDeleteController = async (req, res) => {
    try {
        const { updatedId } = req.body
        const addDataToNewModel = await NEWDATA.updateOne(
            {
                _id: updatedId
            },
            {
                $set: { "data.4": { playerName: "Rahul 2009", score: "2003" } },
                fullName: "@0012321321",
                email: "heloo@gmail.com"
            }
        )
        return res.status(200).json({ addDataToNewModel })
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
};