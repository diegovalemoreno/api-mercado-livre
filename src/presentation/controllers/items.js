class ItemsController {
 constructor(mercadoLibreService) {
  this.mercadoLibreService = mercadoLibreService;
 }

 async get(httpRequest) {
  const response = await this.mercadoLibreService.search("macbook");

  console.log(response);
 }
}

module.exports = ItemsController;