const response = require("../helper/responseFile");
const USERDATASMODEL = require('../models/userDatasModel');
const jwt = require('jsonwebtoken');
varify = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return response.successResponse(res, "Token not found");
        }
        const varifyToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        const db = await USERDATASMODEL.findOne({ _id: varifyToken.id })
        if (!db) { return response.successResponse(res, "Please Enter the vailed_id ")}
        const decode = jwt.decode(varifyToken);
        req.user = db;
        next()
    } catch (err) {
        return response.failedResponse(res, "Token verification is not Working",)
    };
};
module.exports = varify;