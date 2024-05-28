import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async( req , res)=>{
      try {
         const {name} = req.body;
         if(!name ){
            return res.status(401).send({status :"Failed" , message : "Name is Required"})
         }

         const existingCategory = await categoryModel.findOne({name : name})
         if(existingCategory){
          return   res.status(200).send({status :"Failed" , message : "Category Already Exist"})
         }
         const category = await new categoryModel({name : name , slug  : slugify(name)}).save();
         return res.status(201).send({status :"Success" , message : "New Category Created " , category});



      } catch (error) {
        console.log(error);
        res.status(500).send({status :"Failed" , message : "Error while Creating Category"})
      }
}

export const updateCategoryController = async(req ,res)=>{
    try {
        const {name} = req.body;
        const{id} = req.params;
        // to update we need to pass third parameter :  {new: true};
        const category = await categoryModel.findByIdAndUpdate( id , {name , slug : slugify(name)} , {new : true});
        res.status(200).send({status :"Success" , message : "Category Updated Successfully " , category});
    } catch (error) {
        console.log(error);
        res.status(500).send({status :"Failed" , message : "Error while Updating Category"})
    }
}

export const getCategoryController = async(req ,res)=>{
     try {
        const category = await categoryModel.find({});
        res.status(200).send({status :"Success" , message : "All Categories List" , category})

     } catch (error) {
        console.log(error);
        res.status(500).send({status :"Failed" , message : "Error while Getting Categories" , error})

     }
}


export const getSingleCategoryController = async(req ,res)=>{
    try {

        const{slug} = req.params;
       const category = await categoryModel.findOne({slug : slug });
       res.status(200).send({status :"Success" , message : "Particular Category List" , category})

    } catch (error) {
       console.log(error);
       res.status(500).send({status :"Failed" , message : "Error while Getting Single Category" , error})

    }
}
export const  deleteCategoryController = async(req ,res)=>{
    try {

        const{id} = req.params;
        await categoryModel.findByIdAndDelete(id );
       res.status(200).send({status :"Success" , message : "Particular Category get Deleted" })

    } catch (error) {
       console.log(error);
       res.status(500).send({status :"Failed" , message : "Error while Deleting Category" , error})

    }
}
