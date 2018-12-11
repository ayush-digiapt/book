/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book_id: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'books'
  });
};
