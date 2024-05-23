import productModel from "../models/productModel.js";
import slugify from "slugify";
// slugify is used to remove white spaces from the string , so that we can easily pass them in req.params
import fs from 'fs'

export const createProductController = async(req, res)=>{
    try { 
        // we use forbidden so that , when we receive image path , it is not be in form of string , it must be URL
        const{name ,slug ,description  , price , category , quantity , shipping  }  = req.fields;
        const{photo}  =req.files;

        // validation

        switch(true){
            case !name :
                return res.status(500).send({status : "Failed" , message : "Name is required"});
            case !description :
                return res.status(500).send({status : "Failed" , message : "Description is required"});
            case !price :
                return res.status(500).send({status : "Failed" , message : "Price is required"});    
            case !category :
                return res.status(500).send({status : "Failed" , message : "Category is required"});
            case !quantity :
                return res.status(500).send({status : "Failed" , message : "Quantity is required"});
            case photo && photo.size > 1000000 :
                return res.status(500).send({status : "Failed" , message : "Photo is required and should be less than 1 MB "});

        }


        const product = new productModel({...req.fields   , slug : slugify(name)})
        // saving the photo data in MongoDB
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({status : "Success" ,  message  : "Product Created Successfully " , product });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Creating Product" , error});
    }
}


// get all products
export const getAllProductsController = async(req ,res)=>{
    try {
        // we need to remove photo from API request to that API request and response fast
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt : -1})
        res.status(200).send({status : "Success" , total_Products  : products.length,  message  : "All Product List are : " , products  });

    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Getting All Products" , error});

    }
}

// get single product
export const getSingleProductController = async(req ,res)=>{
    try {
        
        const product  = await productModel.findOne({slug : req.params.slug}).select("-photo").populate('category');
        res.status(200).send({status : "Success" ,  message  : "Single Product Fetched: " , product});

        
    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Getting Single Products" , error});

    }
}

// get product photo
export const getProductPhotoController = async(req ,res)=>{
    try {
         
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type' , product.photo.contentType);
            return res.status(500).send( product.photo.data);


        }


    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Getting Product Photo " , error});

    }
}

export const deleteProductController   =async(req ,res)=>{
    try {
        
       await productModel.findByIdAndDelete(req.params.pid).select("-photo");
       res.status(200).send({status : "Success" ,  message  : "Product Delete Successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Deleting Product " , error});
    }
}

export const updateProductController = async(req ,res)=>{
    try {


        const{name ,slug ,description  , price , category , quantity , shipping  }  = req.fields;
        const{photo}  =req.files;

        // validation

        switch(true){
            case !name :
                return res.status(500).send({status : "Failed" , message : "Name is required"});
            case !description :
                return res.status(500).send({status : "Failed" , message : "Description is required"});
            case !price :
                return res.status(500).send({status : "Failed" , message : "Price is required"});    
            case !category :
                return res.status(500).send({status : "Failed" , message : "Category is required"});
            case !quantity :
                return res.status(500).send({status : "Failed" , message : "Quantity is required"});
            case photo && photo.size > 1000000 :
                return res.status(500).send({status : "Failed" , message : "Photo is required and should be less than 1 MB "});

        }

        const product = await productModel.findByIdAndUpdate(req.params.pid , 
            {...req.fields , slug : slugify(name)} , {new:true}
        )
        // saving the photo data in MongoDB
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({status : "Success" ,  message  : "Product Updated Successfully " , product });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Updating Product " , error});

    }
} 