const ProductModel = require('../models/ProductModel');

const cloudinary = require('cloudinary').v2;


//Add Product
const productAdd = async (req, res) => {
    try {
        const { category, subcategory, name, price, description } = req.body;
        const imageUpload = await cloudinary.uploader.upload(req.file.path);
        const product = await ProductModel.create({
            category: category,
            subcategory: subcategory,
            name: name,
            price: price,
            description: description,
            image: imageUpload.secure_url,
            public_id: imageUpload.public_id
        })
        return res.status(200).send({
            success: true,
            message: "Product successfully Add",
            product
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//View Product
const productView = async (req, res) => {
    try {
        let products = await ProductModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: "Product successfully fetch",
            products
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Delete Product
const deleteproduct = async (req, res) => {
    try {
        let id = req.query.id;
        let old = await ProductModel.findById(id);

        await cloudinary.uploader.destroy(old.public_id);

        await ProductModel.findByIdAndDelete(id);

        return res.status(200).send({
            success: true,
            message: "Product successfully delete",
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Update Product
const updateproduct = async (req, res) => {
    try {
        let editid = req.body.id;
        const { category, subcategory, name, price, description } = req.body;
        if (req.file) {
            let old = await ProductModel.findById(editid);
            await cloudinary.uploader.destroy(old.public_id);

            let image = await cloudinary.uploader.upload(req.file.path)

            await ProductModel.findByIdAndUpdate(editid, {
                category: category,
                subcategory: subcategory,
                name: name,
                price: price,
                description: description,
                image: image.secure_url,
                public_id: image.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Product successfully update",
            })
        } else {
            let old = await ProductModel.findById(editid);
            await ProductModel.findByIdAndUpdate(editid, {
                category: category,
                subcategory: subcategory,
                name: name,
                price: price,
                description: description,
                image: old.image,
                public_id: old.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Product successfully update",
            })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err
        })
    }
}


//Active Product
const activeproduct = async (req, res) => {
    try {
        let status = req.body.status;
        let update = await ProductModel.findByIdAndUpdate(req.body.id, {
            status: status
        })
        if (status == 0) {
            return res.status(200).send({
                sucess: true,
                message: "product Inactive"
            })
        } else if (status == 1) {
            return res.status(200).send({
                sucess: true,
                message: "product active,"
            })
        } else {
            return res.status(400).send({
                sucess: false,
                message: "product invalid choice",
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}


module.exports = {
    productAdd, productView, deleteproduct, updateproduct, activeproduct
}