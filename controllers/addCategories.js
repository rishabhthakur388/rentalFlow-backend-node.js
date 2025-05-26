const CATEGORYMODEL = require("../models/itemCategories");
const SUBCATEGORYMODEL = require('../models/addSubcategoriesModel');
const response = require("../helper/responseFile");

// AddCategory
exports.addItemsCategory = async (req, res) => {
    try {
        const categories = ["Water sports", "Snow sports", "off-Road", "Outdoors"]
        for (keys of categories) {
            await CATEGORYMODEL.create({ categoryName: keys });
        }
        return response.successResponse(res , "Categories are Added..." );
    } catch (err) {
        return response.failedResponse(res, err.message);
    }
};
// Add SubCategory
exports.addItemsSubCategory = async (req, res) => {
    try {
        const subCategories = ["Outdoors Bicycle", "Outdoors E-bikes", "Outdoors E-skateboards", "Outdoors Mountain bikes", "Outdoors Scooters"];
        const categoryIdMap = {
            "Water sports": "65f97409cefd3a2160574597",
        };
        for (const category of Object.keys(categoryIdMap)) {
            const categoryId = categoryIdMap[category];
            for (const subCategory of subCategories) {
                await SUBCATEGORYMODEL.create({ category_ID: categoryId, subCategoryName: subCategory });
            };
        };
        return response.successResponse(res, "subCategories are Added..." );
    } catch (err) {
        return response.failedResponse(res, err.message);
    }
};
// Show category
exports.showAllCategoriesToUser = async (req, res) => {
    try {
        const getAllCategories = await CATEGORYMODEL.aggregate([{
            $lookup:
            {
                from: 'subcategorydatas',
                localField: '_id',
                foreignField: 'category_ID',
                as: 'result'
            }
        }]);
        return res.status(200).json({ status: 200, data: getAllCategories })
    } catch (error) {
        return response.failedResponse(res, error.message)
    };
};

// Show Subcategory
exports.showAllSubCategoriesToUser = async (req, res) => {
    try {
        const findAllDataOfCategory = await CATEGORYMODEL.aggregate([{
            $lookup: {
                from: 'subcategorydatas',
                localField: '_id',
                foreignField: 'category_ID',
                as: 'result'
            }
        }])
        return res.status(200).json({ status: 200, data: findAllDataOfCategory })
    } catch (error) {
        return response.failedResponse(res, error.message)
    }
};

// get categroy
exports.getcategoriesbutton = async (req, res) => {
    try {
        const findcategories = await CATEGORYMODEL.findAll({
            categoryName: req.query.categoryName,
        })

        if (findcategories.length > 0) { return failedResponse(req, "NO ITEM FOUND") }
    } catch (error) {
    }
};