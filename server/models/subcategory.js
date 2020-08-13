const { Model } = require('sequelize');

class Subcategory extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        categoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0,
        },
      },
      {
        freezeTableName: true,
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
    this.hasMany(models.Product, {
      foreignKey: 'subcategoryId',
      sourceKey: 'id',
    });
  }
}

module.exports = Subcategory;
