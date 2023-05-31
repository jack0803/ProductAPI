const config = require('../config/index.js');

const success = (res, message, data = null) => {
    const response = {
        status: true,
        message,
    };

    if (data) response.data = data;
    res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

const serverError = (res, error) => {
    // loggerUtil.error({ message: error.toString(), level: 'error' });

    res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
        status: false,
        message: error.toString(),
        data: {}
    });
};

const badRequestError = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
        status: false,
        message,
        data: {}
    });
};

const noDataFoundError = (res, message) => {
    res.status(config.HTTP_STATUS_CODES.NOT_FOUND).send({
        status: false,
        message,
        data: {}
    });
};

module.exports = {
    success,
    badRequestError,
    serverError,
    noDataFoundError
}