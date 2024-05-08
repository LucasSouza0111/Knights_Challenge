const mongoose = require('../database');
const mongoose_delete = require('mongoose-delete');


const Knights_Schema = mongoose.Schema({
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
    keyAttribute : String
})

Knights_Schema.plugin(mongoose_delete,{
    overrideMethods: ['find', 'findOne']
});

const Knights = mongoose.model("Knights",Knights_Schema);

module.exports = Knights;