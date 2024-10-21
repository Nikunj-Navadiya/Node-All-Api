const subcategoryModel = require('../models/subcategorymodel');


//Add Sub Category
const subcategoryAdd = async (req, res) => {
    try {
        let duplicatesubcategory = await subcategoryModel.findOne({ subcategory: req.body.subcategory })

        if (duplicatesubcategory) {
            return res.status(200).send({
                sucess: true,
                message: "category already added",
            })
        }

        let subcategoryAdd = await subcategoryModel.create({
            categoryId: req.body.categoryId,
            subcategory: req.body.subcategory,
        })

        return res.status(200).send({
            sucess: true,
            message: "subcategory Add sucessfully",
            subcategoryAdd
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//View Sub Category
const subcategoryView = async (req, res) => {
    try {
        let viewUser = await subcategoryModel.find({}).populate('categoryId');
        return res.status(200).send({
            sucess: true,
            message: "category View Sucessfully",
            viewUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Delete Sub Category
const deletesubcategory = async (req, res) => {
    try {
        let deleteuser = await subcategoryModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            sucess: true,
            message: "subcategory delete sucessfully",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Update Sub Category
const updatesubcategory = async (req, res) => {
    try {
        let categoryId = req.body.categoryId;
        let subcategory = req.body.subcategory;

        await subcategoryModel.findByIdAndUpdate(categoryId, {
            subcategory: subcategory
        })

        return res.status(200).send({
            sucess: true,
            message: "subcategory update suessfully",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Active Sub Category
const activesubcategory = async (req, res) => {
    try {
        let id = req.body.id;
        let status = req.body.status
        let update = await subcategoryModel.findByIdAndUpdate(id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "subcategory Inactive",
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "subcategory active",
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "category invalid choice"
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


module.exports = ({
    subcategoryAdd, subcategoryView, deletesubcategory, updatesubcategory, activesubcategory
})