const model = require('../models/categoryModel');

var categoryController = 
{
    readAllCategory: (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllUser:", error);
                res.status(500).json(error);
            }  
            else res.status(200).json(results);
        }

        model.selectAllCategory(callback);
    },

    createNewCategory: (req, res, next) =>
    {
        const data = {
            name: req.body.name,
            description: req.body.description
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewCategory:", error);
                res.status(500).json(error);
            } else {
                const return_msg = {message: "New Category created successfully." };
                res.status(201).json(return_msg);
            }
        }

        model.insertNewCategory(data, callback);
    },

    readFurnitureByCatId: (req, res, next) =>
    {
        const data = {
            catid: req.params.categoryId
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readFurnitureId:", error);
                res.status(500).json(error);
            }  
            else res.status(200).json(results);
        }

        const check_categoryId = req.params.categoryId;
        console.log(`Category controller: Cat id selected: ${check_categoryId}`);
        model.selectFurnitureByCatId(data, callback);
    }

}

module.exports = categoryController;