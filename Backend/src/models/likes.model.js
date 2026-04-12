const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "post id is required for liking post"],
    },

    user: {
        type: String,
        required: [true, "username is required for creating a like"],
    },
},
{
    timestamps: true,
}
);

likeSchema.index({ post: 1, user: 1 }, { unique: 1 })

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel;
