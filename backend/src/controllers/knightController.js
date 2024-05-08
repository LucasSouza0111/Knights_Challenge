const Knight = require("../models/knights");
const Heroes = require("../models/heroes");

//[GET] /knights 
const getKnights = async (req, res) => {  
    let filter = req.query['filter'];
    if (filter) {
        try {
            const heroes = await Knight.findDeleted({});
            res.send(heroes);        
        } catch (error) {
            res.status(500).json({ message: error.message });
        }        
    }else{
        try {
            const knight = await Knight.find();
            res.send(knight);        
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
};

//[GET] /knights/:id 
const getKnight = async (req, res) => {  
    try {
        const { id } = req.params;
        const knight = await Knight.findById(id);
        res.send(knight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//[POST] /knights 
const createKnights = async (req, res) => {
    try{
        const knight = await Knight.create(req.body);
        res.send(knight)
    }catch (err){
        res.status(400).send({err: err});
    }
};

//[UPDATE] /knights/:id
const updateKnights = async (req, res) => {
    try {
      const { id } = req.params;  
      const knight = await Knight.findByIdAndUpdate(id, req.body);  
      if (!knight) {
        return res.status(404).json({ message: "Knight not found" });
      }  
      const updateKnights = await Knight.findById(id);
      res.status(200).json(updateKnights);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


//[DELETE] /knights/:id 
const deleteKnights = async (req, res) => {
    try {
      const { id } = req.params;   
      const knight = await Knight.deleteById(id);  
      if (!knight) {
        return res.status(404).json({ message: "Knight not found" });
      }           
      res.status(200).json({ message: "Knight deleted successfully" });
    } catch (error) {

      res.status(500).json({ message: error.message });
    }
};


module.exports = {   
    getKnights,
    getKnight,
    createKnights,
    updateKnights,
    deleteKnights,  
  };