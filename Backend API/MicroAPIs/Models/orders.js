const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    payment_method: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'payment_methods',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "payment_method",
        using: "BTREE",
        fields: [
          { name: "payment_method" },
        ]
      },
    ]
  });
};
