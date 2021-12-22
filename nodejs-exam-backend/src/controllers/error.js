
module.exports = {
    sendError: (res, errorObject) => {
        console.log(errorObject);
        return res.status(500).send({
            error: errorObject.message,
            data: JSON.stringify(errorObject)
        });
    },

    sendUserError: (res, errorMessage, data) => {
        console.log(errorMessage, data);
       return res.status(400).send({
            error: errorMessage,
            data: data
        });
    }
};
