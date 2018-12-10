/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imageLinks', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    smallThumbnail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(100),
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
    tableName: 'imageLinks'
  });
};
