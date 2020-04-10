const ItemsController = require('../../controllers/items');
const MercadoLibreService = require('../../services/mercado-libre');

const itemController = new ItemsController(new MercadoLibreService());

module.exports = (router) => {
	router.get('/items', async (req, res) => {
		const response = await itemController.get(req);

		return res.status(response.statusCode).json(response);
	});

	router.get('/items/:id', async (req, res) => {
		const response = await itemController.find(req);

		return res.status(response.statusCode).json(response);
	});
};
