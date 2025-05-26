module.exports = {

    successResponse: (res, msg) => {
        return res.status(200).json({
            status: 200,
            message: msg
        });
    },

    successResponseWithData: (res, msg, data) => {
        return res.status(200).json({
            status: 200,
            message: msg,
            data: data
        });
    },
    successResponseWithToken: (res, data, token, message) => {
        return res.status(200).json({
            status: 200,
            data: data,
            token: token,
            message: message
        });
    },
    failedResponse: (res, msg) => {
        return res.status(400).json({
            status: 400,
            message: msg
        });
    },
    failedResponseWithData: (res, data, msg) => {
        return res.status(400).json({
            status: 400,
            message: msg,
            data: data
        });
    },
    successResponseData: (res, data) => {
        return res.status(200).json({
            status: 200,
            data: data
        })
    },

    successResponseWithExtraData: (res, data, extraData, message) => {
        return res.status(200).json({
            status: 200,
            data: data,
            extraData: extraData,
        });
    },

}



