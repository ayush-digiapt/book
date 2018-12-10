module.exports = {
    environment: 'development',
    port: 3000,
    db: {
        database: 'talkback',
        host: 'localhost',
        port: 3306,
        user: 'talkback',
        password: 'talkback'
    },
    mysql_date_format: 'YYYY-MM-DD HH:MM:SS',
    sequelize: {
        options: {
            timestamps: false,
            freezeTableName: true
        }
    }
}