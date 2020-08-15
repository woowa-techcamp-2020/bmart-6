const Order = require('../models/order');
const Product = require('../models/product');
const OrderProductRelation = require('../models/order_product_relation');

exports.create = async (req, res) => {
  const {
    user,
    body: { productIds },
  } = req;
  const t = await Order.beginTransaction();
  const products = await Product.findAll({ where: { id: productIds } }, { transaction: t });
  const { totalPrice, totalDiscountedPrice } = Order.getTotalPrice(products);
  const orderParams = {
    userId: user.id,
    status: 'pending',
    totalPrice,
    totalDiscountedPrice,
  };
  const { dataValues } = await Order.create(orderParams);
  const parsedProducts = OrderProductRelation.parseProductsForOrder(products, dataValues.id);
  const result = await OrderProductRelation.bulkCreate(parsedProducts);
  t.commit();
  res.status(201).send(result);
};

exports.findAll = async (req, res) => {
  const { user } = req;
  const orders = await Order.findAll({ where: { userId: user.id } });
  res.status(200).send(orders);
};

exports.findOne = async (req, res) => {
  const { orderId } = req.params;
  const products = await OrderProductRelation.findAll({ where: { orderId } });
  res.status(200).send(products);
};
