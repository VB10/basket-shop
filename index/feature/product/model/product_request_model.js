class ProductRequest {
  constructor(obj) {
    this.count = obj.count;
    this.productId = obj.productId;
  }
}

module.exports.jsonToObj = function (json) {
  var obj = JSON.parse(json);
  return new ProductRequest(obj);
};

module.exports = {
  productRequest: ProductRequest,
};
