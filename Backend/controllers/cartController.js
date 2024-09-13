import userModel from "../Modules/userModel.js"


const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        if (!userData) {
            return res.status(404).json({
                success: false, message: "User not found"
            });
        }

        let cardData = userData.cardData || {};

        if (!cardData[req.body.itemId]) {
            cardData[req.body.itemId] = 1;
        } else {
            cardData[req.body.itemId] += 1;
        }

        await userModel.findOneAndUpdate(
            { _id: req.body.userId },
            { cardData },
            { new: true }
        );

        res.json({
            success: true, message: "Added to cart"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, message: "Server Error"
        });
    }
};


const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cardData = await userData.cardData;
        if (cardData[req.body.itemId] > 0) {
            cardData[req.body.itemId] -= 1;
        }

        await userModel.findOneAndUpdate({ _id: req.body.userId },
            { cardData },
            { new: true });
        res.json({
            success: true, message: "Removed from cart"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false, message: "ERROR"
        })
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cardData = userData.cardData;
        res.json({
            success: true,cardData
        })

    } catch (error) {
  console.log(error)
  res.json({
    success:false,message:"ERROR"
  })
    }
}



export { addToCart, removeFromCart, getCart }

