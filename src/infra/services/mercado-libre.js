const axios = require('axios').default;

const { MERCADO_LIBRE_API_URL } = process.env;

class MercadoLibreService {
	constructor() {
		this.api = axios.create({
			baseURL: MERCADO_LIBRE_API_URL
		});
	}

	async search(query = '') {
		const { data } = await this.api.get(`/search?q=${query}&limit=4`);

		return data;
	}
}

module.exports = MercadoLibreService;