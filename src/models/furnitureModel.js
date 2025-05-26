const pool = require('../services/db');

var furnitureModel = {

    selectAllFurniture: (callback) => {
        const SQLSTATEMENT = `SELECT * FROM furniture;`;
        pool.query(SQLSTATEMENT, callback);
    }

}

module.exports = furnitureModel;