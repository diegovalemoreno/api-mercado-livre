module.exports = (router) => {
	router.get('/items', (req, res) => {
		res.json({ message: 'ok ' });
	});
};
