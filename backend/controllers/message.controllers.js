import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const {id} = req.params;
        const senderId = req.userId;

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};