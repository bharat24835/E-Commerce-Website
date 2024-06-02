import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
// slugify is used to remove white spaces from the string , so that we can easily pass them in req.params
import fs from 'fs'
// import { getSingleProductController } from './productController';

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
        res.status(201).send({status : "Success" ,  message  : ` "${name}" Product Created Successfully ` , product });
        
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

// delete the product

export const deleteProductController   =async(req ,res)=>{
    try {
        
       await productModel.findByIdAndDelete(req.params.pid).select("-photo");
       res.status(200).send({status : "Success" ,  message  : "Product Delete Successfully" });


    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" ,  message  : "Error while Deleting Product " , error});
    }
}


// update the product data
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

// filter the product

export const productFilterController = async(req ,res)=>{
    try {
        const{checked, radio}  =req.body;
        let  args = {}
        // there are the queries that are stored in args
        if(checked.length > 0 ) args.category = checked
        if(radio.length ) args.price = {$gte:radio[0] , $lte:radio[1]}
        const products = await productModel.find(args);
        res.status(201).send({status : "Success" , message : "Products are filtered" , products} );
    } catch (error) {
        console.log(error);
        res.status(500).send({status : "Failed" , message  : "Error while Filtering Product " , error})
    }
}


// getting the total number of Products
export const getProductCountController = async(req ,res)=>{
    try {
        const total  = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({status : "Success" , message : "Products Count Find . " , total} );

        
    } catch (error) {
        console.log(error);
        res.status(400).send({status : "Failed" , message  : "Error while Retrieving Product Count " , error})

    }
}


// getting the list of products per page`
export const productListController = async(req ,res)=>{
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1 
        const products = await productModel
        .find({})
        .select("-photo")
        .skip((page-1)*perPage)
        .limit(perPage)
        .sort({createdAt : -1});
        res.status(200).send({status : "Success" , message : "Products List is Created . " , products} );

        
        
    } catch (error) {
        console.log(error);
        res.status(400).send({status : "Failed" , message  : "Error while Retrieving Product List per page " , error})

    }
}

// search the product

export const searchProductController = async(req ,res)=>{
    try {

        const {keyword} = req.params;
        const result = await productModel.find({
            $or: [
              {name : {$regex : keyword , $options : "i"}},
              {description : {$regex : keyword , $options : "i"}}
            ]
        }).select("-photo")

        res.json(result);
        
    } catch (error) {
        console.log(error);
        res.status(400).send({status : "Failed" , message  : "Error while Searching the Product " , error})

    }
}


// search teh related product controller

export const relatedProductController =  async(req ,res)=>{
    try {

        const{pid , cid} = req.params;

        const products = await productModel.find({
            category : cid,
            _id  : {$ne : pid}
        }).select('-photo').limit(3).populate("category");

        res.status(200).send({
            status:  "Success" , message : "Related Product Searched Successfully" , products 
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).send({status : "Failed" , message : "Error while searching related product "  , error});
    }
}


// get all product of particular category 

export const productCategoryController = async(req, res)=>{
try {
    // since product mai sirf category ki id hai na ki uski information , so we moving towards category modek to get its id from particular category slug
    const category = await categoryModel.findOne({slug: req.params.slug});
    const products = await productModel.find({category}).populate('category')
    res.status(200).send({status :  "Success" ,message : "Retrived Successfully" , category ,products});
} catch (error) {
    console.log(error);
    res.status(400).send({status : "Failed" , message : "Error while Retrieving Products of a category  "  , error});

}
}