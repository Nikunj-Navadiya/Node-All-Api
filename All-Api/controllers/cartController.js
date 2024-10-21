const addcartmodel = require('../models/addcartmodel');
const productModel = require('../models/ProductModel');


//Add Cart
const addcart = async (req, res) => {
    try {
        const { id, userId, qty } = req.body;
        let product = await productModel.findById(id)

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found"
            });
        }
        let cartItem = await addcartmodel.create({
            categoryId: product.categoryId,
            subcategoryId: product.subcategoryId,
            userId: userId,
            name: product.name,
            price: product.price,
            qty: product.qty,
            description: product.description,
            image: product.image,
        });

        return res.status(200).send({
            success: true,
            message: "Product successfully added to cart",
            cartItem
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Failed to add product to cart",
            error: error.message,
        });
    }
};


//View Cart
const viewcart = async (req, res) => {
    try {
        let viewcart = await addcartmodel.find({}).populate('categoryId').populate('subcategoryId')

        let TotalBill = viewcart.reduce((sum, item) => {
            let price = item.price || 0;
            let qty = item.qty || 1;
            return sum + price * qty;
        }, 0);

        return res.status(200).send({
            success: true,
            message: "Products successfully fetched",
            viewcart,
            TotalBill,
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
};


//Delete Cart
const deletecart = async (req, res) => {
    try {
        let id = req.query.id;
        
        
        // let old = await addcartmodel.findById(id);
        // await cloudinary.uploader.destroy(old.public_id);

        await addcartmodel.findByIdAndDelete(id);

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


//Update Cart
const updatecart = async (req, res) => {
    try {
        let editid = req.body.id;
        const { qty } = req.body;

        await addcartmodel.findByIdAndUpdate(editid, { qty }, { new: true });

        return res.status(200).send({
            success: true,
            message: "Quantity successfully updated",
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};


module.exports = ({
    addcart, viewcart, deletecart, updatecart
})