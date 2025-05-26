const model = require('../models/furnitureModel');

var furnitureController = 
{
    readAllFurniture: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllFurniture:", error);
                res.status(500).json(error);
            }  
            else res.status(200).json(results);
        }

        model.selectAllFurniture(callback);
    }
}

module.exports = furnitureController;