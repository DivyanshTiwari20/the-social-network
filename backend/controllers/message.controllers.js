// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import mongoose from "mongoose";

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         // Check if receiverId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(receiverId)) {
//             return res.status(400).json({ message: "Invalid receiver ID" });
//         }

//         // Create a new message document
//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message,
//         });

//         // Save the message to the database
//         await newMessage.save();

//         // Find or create a conversation
//         let conversation = await Conversation.findOneAndUpdate(
//             { participants: { $all: [senderId, receiverId] } },
//             { $push: { messages: newMessage._id } },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//         );

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId],
//                 messages: [newMessage._id],
//             });
//         } else {
//             conversation.messages.push(newMessage._id);
//             await conversation.save();
//         }

//         res.status(201).json({ message: "Message sent successfully", newMessage });
//     } catch (error) {
//         console.log("Error in sendMessage controller", error.message);    
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Check if receiverId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid receiver ID" });
        }

        // Create a new message document
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Save the message to the database
        await newMessage.save();

        // Find or create a conversation
        let conversation = await Conversation.findOneAndUpdate(
            {
                $or: [
                    { participants: [senderId, receiverId] },
                    { participants: [receiverId, senderId] }
                ]
            },
            { $push: { messages: newMessage._id } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: [newMessage._id],
            });
            await conversation.save();
        }

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
