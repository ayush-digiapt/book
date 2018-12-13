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
      type: DataTypes.STRING(320),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'books'
  });
};
