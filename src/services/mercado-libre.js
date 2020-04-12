const axios = require('axios').default;

const { MERCADO_LIBRE_API_URL } = process.env;

class MercadoLibreService {
	constructor() {
		this.api = axios.create({
			baseURL: MERCADO_LIBRE_API_URL
		});
	}

	async search(query = '') {
		const { data } = await this.api.get(`/sites/MLA/search?q=${query}&limit=5`);

		return data;
	}

	async getCurrency(currencyId) {
		const { data } = await this.api.get(`/currencies/${currencyId}`);

		return data;
	}

	async getItem(itemId) {
		const { data } = await this.api.get(`/items/${itemId}`);

		return data;
	}

	async getItemDescription(itemId) {
		const { data } = await this.api.get(`/items/${itemId}/description`);

		return data;
	}
}

module.exports = MercadoLibreService;
