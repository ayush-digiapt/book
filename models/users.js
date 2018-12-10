/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authors: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(64),
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
    tableName: 'users'
  });
};
