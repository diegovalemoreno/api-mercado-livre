const { Router } = require('express');
const path = require('path');

const fg = require('fast-glob');

module.exports = (app) => {
	const router = Router();

	app.use('/api', router);

	fg.sync('**/src/main/routes/**routes.js').map((file) => {
		console.log(`[AUTO-ROUTER] ${path.basename(file)} loaded`);

		require(`../../../${file}`)(router);
	});
};
