/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('retailPrice', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ammount: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    },
    currency_code: {
      type: DataTypes.STRING(32),
      allowNull: false
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
    tableName: 'retailPrice'
  });
};
