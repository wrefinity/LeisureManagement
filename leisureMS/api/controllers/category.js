//importing field validations
import { createCategory, getCategory, deleteCategory, updateCategory} from "../models/category.js";


class CategoryController{

    createCategories = async (req, res) => {
        try {
            // data validations
            const createdBy = req.user.id;
            if (!req.body)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });

            const category = await createCategory({...req.body, createdBy});
            if(!category)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while creating user',
                })
    
            return res.status(200).json({
                error: false,
                message: "category created",
                data:category
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }

    updateCategories = async (req, res) => {
        try {
            // data validations
            const updatedBy = req.user;
            const {id} = req.params;
            
            // checking id and updateBy
            if (!(id && updatedBy)) return res.status(400).json({ error: true, message: "please supply category id" })
            
            // error checks for the input fields
            const { error } = categoryValidation(req.body);
            if (error)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                })

            // calling the update category function
            const updatedCategory = await updateCategory(id.toString(), {...req.body, updatedBy});
            if(!updatedCategory)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while updating category',
                })
            
            return res.status(200).json({
                error: false,
                message: "category updated",
                data:updatedCategory
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            }); 
        }
    }

    // delete category 
    deleteCategry = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply category id" });
            const deleted = deleteCategory(id);

            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "category not deleted"
                });

            // return the user information 
            return res.status(200).json({
                error: false,
                message: "user's profile deleted"
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: err
            }); 
            
        }
    }
    
    // getting all categories
    getCategories = async (req, res) => {
        const data = await getCategory();
        return res.status(200).json(data);
    }
}

export default new CategoryController();