const mongoose = require('../database');

const Heroes_Schema = mongoose.Schema({
    name:{
        type:String,
        //required:true,
    }, 
    nickname:{
        type:String,
        //required:true,
    },
    birthday:{
        type:Date,
         //required:true,
    },
    weapons: [ 
        { 
            name: String, 
            mod: Number, 
            attr: String, 
            equipped: Boolean 
        } 
    ], 
    attributes: { 
        strength: Number,  
        dexterity: Number , 
        constitution: Number , 
        intelligence: Number , 
        wisdom: Number , 
        charisma: Number , 
    },
    keyAttribute : String,
})


const Heroes = mongoose.model("Heroes",Heroes_Schema);

module.exports = Heroes;