const { badRequest, serverError, ok } = require('../helpers/http-helper');
const MissingParamError = require('../errors/missing-param-error');
const ItemsAction = require('./items.action');

class ItemsController {
	constructor() {
		this.action = new ItemsAction();
	}

	async get(httpRequest) {
		try {
			const { query } = httpRequest;

			const response = await this.action.getItems(query.q);

			return ok(response);
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}

	async find({ params }) {
		try {
			const { id } = params;

			if (!id) return badRequest(new MissingParamError('id'));

			const response = await this.action.findItem(id);

			return ok(response);
		} catch (error) {
			if (error.response) {
				return { ...error.response.data, statusCode: error.response.status };
			}

			return serverError();
		}
	}
}

module.exports = ItemsController;
