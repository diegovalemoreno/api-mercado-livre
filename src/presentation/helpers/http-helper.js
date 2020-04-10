import ServerError from '../errors/server-error';

const badRequest = (error) => ({
	statusCode: 400,
	body: error
});

const serverError = () => ({
	statusCode: 500,
	body: new ServerError()
});

const ok = (data) => ({
	statusCode: 200,
	body: data
});

module.exports = {
	badRequest,
	serverError,
	ok
};
