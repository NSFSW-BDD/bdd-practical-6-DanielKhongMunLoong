const pool = require('../services/db');

var categoryModel = {

    selectAllCategory: (callback) => {
        const SQLSTATMENT = `SELECT * FROM category;`;
        pool.query(SQLSTATMENT, callback);
    },

    insertNewCategory: (data, callback) => {
        const SQLSTATMENT = `
            INSERT INTO category (catid, name, description)
            SELECT MAX(catid) + 1, ?, ?
            FROM category;
            `;
        const VALUES = [data.name, data.description];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    selectFurnitureByCatId: (data, callback) => {
        const SQLSTATMENT = `
            SELECT furniture.fid, furniture.name, 
            furniture.description, furniture.price, 
            furniture.quantity, furniture.catid, 
            category.name as catname
            FROM furniture
            INNER JOIN category
            ON furniture.catid = category.catid
            WHERE furniture.catid = ?;
            `;
        const VALUES = [data.catid];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    }    


}

module.exports = categoryModel;