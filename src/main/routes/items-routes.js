const ItemsController = require('../../presentation/controllers/items');
const MercadoLibreService = require('../../infra/services/mercado-libre');

const itemController = new ItemsController(new MercadoLibreService());

module.exports = (router) => {
	router.get('/items', async (req, res) => {
		const response = await itemController.get();

		return res.status(response.statusCode).json(response);
	});
};
