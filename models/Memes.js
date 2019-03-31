// Creates the Memes DB model

                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

// MONGOOSE
var mongoose = require("mongoose");
// Reference the Schema constructor
var Schema = mongoose.Schema;


                ///                            ///
                ///           SCHEMA           ///
                ///                            ///

// Create a new Schema
var MemesSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    review: {
        type: String
        // can be liked, disliked, or new
    }
});

// Create a mongoose model using the Schema
var Memes = mongoose.model("Memes", MemesSchema);

// Export the Memes model
module.exports = Memes;