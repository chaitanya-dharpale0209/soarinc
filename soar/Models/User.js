const mongoose = require(`mongoose`)

const userStructure = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum:[`superAdmin`, `schoolAdmin`], required: true},
        schoolId: {type: mongoose.Schema.Types.ObjectId, ref: `School`},
    },
    
);


module.exports = mongoose.model(`User`, userStructure);