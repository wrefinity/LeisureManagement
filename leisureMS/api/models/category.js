import mongoose, { Document } from "mongoose"
const Schema = mongoose.Schema


const Category = new Schema({
    name: {type: String},
    desc: {type: String},
    isDeleted:{type:Boolean, default:false},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
{timestamps: true}
)

const CategoryModel = mongoose.model("Category", Category);
export default CategoryModel;
export const createCategory =(values) =>
  new CategoryModel(values).save().then(cat => cat.toObject());
export const getCategory = async () => await CategoryModel.find({ });
export const deleteCategory =async (id) => await CategoryModel.findByIdAndDelete(id);
export const updateCategory = async(id, values) => await CategoryModel.findByIdAndUpdate(id, values, { new: true })
