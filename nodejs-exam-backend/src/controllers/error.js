
module.exports = {
    sendError: (res, error) => {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    },

    sendUserError: (res, errorMessage, data) => {
        console.log(error);
        res.status(400).send({
            error: errorMessage,
            data: data
        });
    }
};
