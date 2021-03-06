const { Model } = require('sequelize');

class Category extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
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
    this.hasMany(models.Subcategory, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
  }
}

module.exports = Category;
