const Categories = require("../models/categoryModel");
const { findByIdAndDelete, findByIdAndUpdate } = require("../models/userModel");



const categoryControl = {
  getCategories: async (req, res) => {
    try {
        const Category = await Categories.find()
      res.json({ msg: Category });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },
  createCategories: async (req,res) => {
    try {

        const name = req.body.name
        const category = await Categories.findOne({name});
        if(category) return res.status(400).json({ msg: "Category already exist" });
        const newCategory = new Categories({name})
        await newCategory.save();
        return res.json({msg: "new Category Created"})
    } catch (error) {
      res.status(500).json({ msg: error});
    }
  },
  deleteCategory: async (req,res) => {
    try {
        await Categories.findByIdAndDelete({_id: req.params.id})
        res.json({msg: "Deleted Successfully"})
    } catch (error) {
      res.status(500).json({ msg: error});
    }
  },
  updateCategory: async (req,res) =>{
    try {
        const name = req.body.name
        await Categories.findByIdAndUpdate({_id: req.params.id}, {name})
        res.json({msg: "Update Successfully"})
    } catch (error) {
      res.status(500).json({ msg: error});
    }
  }
};

module.exports = categoryControl