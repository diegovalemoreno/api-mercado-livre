const MercadoLibreService = require('../services/mercado-libre');

class ItemsAction {
	constructor() {
		this.mercadoLibreService = new MercadoLibreService();
	}

	_getCategories(attributes) {
		const attributesAlloweds = [ 'BRAND', 'LINE' ];

		return attributes.reduce((p, c) => {
			if (!attributesAlloweds.includes(c.id)) return p;

			return [ ...p, c.value_name ];
		}, []);
	}

	async getItems(search) {
		const { results, available_filters: availableFilters } = await this.mercadoLibreService.search(search);

		if (!results.length) return null;

		const [ firstResult ] = results;

		const currency = await this.mercadoLibreService.getCurrency(firstResult.currency_id);

		const [ categoriesFilters ] = availableFilters.filter(({ id }) => id === 'category' || id === 'LINE');

		if (!categoriesFilters) return null;

		const [ firstCategory ] = categoriesFilters.values;

		const firstCategoryName = firstCategory.name;

		const categories = this._getCategories(firstResult.attributes);

		const items = results.map(({ id, title, thumbnail, condition, shipping, price }) => ({
			id,
			title,
			picture: thumbnail,
			condition,
			free_shipping: shipping.free_shipping,
			price: {
				currency: currency.symbol,
				amount: price,
				decimals: currency.decimal_places
			}
		}));

		return {
			author: {
				name: '',
				lastname: ''
			},
			categories: [ firstCategoryName, ...categories ],
			items
		};
	}

	async findItem(itemId) {
		const [ product, description ] = await Promise.all([
			this.mercadoLibreService.getItem(itemId),
			this.mercadoLibreService.getItemDescription(itemId)
		]);

		const currency = await this.mercadoLibreService.getCurrency(product.currency_id);

		const { id, title, pictures, condition, shipping, sold_quantity, price } = product;

		return {
			author: {
				name: '',
				lastname: ''
			},
			id,
			title,
			price: {
				currency: currency.symbol,
				amount: price,
				decimals: currency.decimal_places
			},
			picture: pictures[0].url,
			condition,
			free_shipping: shipping.free_shipping,
			sold_quantity: sold_quantity,
			description: description.plain_text
		};
	}
}

module.exports = ItemsAction;
