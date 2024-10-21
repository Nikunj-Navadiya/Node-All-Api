const Category = require('../models/CategoryModel');


//Add Category
const addcategory = async (req, res) => {
    try {
        let category = req.body.category

        let dup = await Category.findOne({ name: category });

        if (dup) {
            return res.status(400).send({
                message: "Category already exists"
            });
        }

        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Category is required"
            })
        }

        let cat = await Category.create({
            name: category
        })
        return res.status(500).send({
            success: true,
            message: "Category successfully add",
            category
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//View Category
const viewcategory = async (req, res) => {
    try {
        let categories = await Category.find({});
        return res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            categories
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Delete Category
const deletecategory = async (req, res) => {
    try {
        let id = req.query.id;
        await Category.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category successfully delete"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Update Category
const updatecategory = async (req, res) => {
    try {
        let id = req.body.id;
       
        
        let category = req.body.category;
        await Category.findByIdAndUpdate(id, {
            name: category
        });
        return res.status(200).send({
            success: true,
            message: "Category successfully update"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Active Category
const activecategory = async (req, res) => {
    try {
        let id = req.body.id;
        let status = req.body.status;
        let update = await Category.findByIdAndUpdate(id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "Categpory Dactive",
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "Category Active",
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "Invalid",
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}

module.exports = {
    addcategory, viewcategory, deletecategory, updatecategory, activecategory
}