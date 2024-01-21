//importing field validations
import CoupounModel, { createCoup, deleteUserCoupoun, getCoupByUserId } from "../models/coup.js";
import User from "../models/User.js";
import generateOtp from "../utils/general.js"

class CoupController {

    createCoup = async (req, res) => {
        try {
            // data validations
            const createdBy = req.user.id;

            if (!req.body)
                return res.status(400).json({
                    error: true,
                    message: error.details[0].message,
                });

            //check if user has coupon
            const hasCoup = await getCoupByUserId(req.body._id);
            if (hasCoup.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: "user has coupon already",
                })
            }

            const token = generateOtp()

            const coup = await createCoup({ user: req.body._id, token, country: "dubai", createdBy });
            if (!coup)
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong while creating user coupon',
                })

            return res.status(200).json({
                error: false,
                message: "coupon created",
                data: coup
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
    }


    // delete category 
    deleteCoup = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) return res.status(400).json({ error: true, message: "please supply category id" });
            const deleted = await deleteUserCoupoun(id);

            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "coupon not deleted"
                });

            // return the user information 
            return res.status(200).json({
                error: false,
                message: "user's coupon deleted",
                data:{_id:id}
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
    getCoupons = async (req, res) => {

        // check that current user is adm
        const isAdmin = req.user?.isAdmin;
        let query = {};
        // If the user is not an admin, filter coups by userId
        if (!isAdmin) {
            query.user = req.user.id;
        }
        const data = await CoupounModel.find(query).populate({
            path: 'user',
            model: User,
            select: 'username email phone',
        });;
        return res.status(200).json(data);
    }
}

export default new CoupController();