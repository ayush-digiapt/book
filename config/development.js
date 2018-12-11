module.exports = {
    environment: 'development',
    port: 3000,
    db: {
        database: 'book',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root'
    },
    mysql_date_format: 'YYYY-MM-DD HH:MM:SS',
    sequelize: {
        options: {
            timestamps: false,
            freezeTableName: true
        }
    }
}