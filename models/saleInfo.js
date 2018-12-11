/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saleInfo', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    saleability: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    isEbook: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lid: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'listPrice',
        key: 'id'
      }
    },
    rid: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'retailPrice',
        key: 'id'
      }
    },
    bid: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    }
  }, {
    tableName: 'saleInfo'
  });
};
