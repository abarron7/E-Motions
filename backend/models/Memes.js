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
    URL: {
        type: String,
        required: true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    liked: {
        type: Boolean,
        default: false
    }
});

// Create a mongoose model using the Schema
var Memes = mongoose.model("Memes", MemesSchema);

// Export the Events model
module.exports = Memes;
