const express = require("express");
const Knight = require("../models/knights");
const router = express.Router();
const{getKnights,getKnight,createKnights,updateKnights,deleteKnights} = require('../controllers/knightController');

/*
    1 - Exibe a lista com todos os knights.
    2 - Mostra informações de um knight.
    3 - Cria um knight. 
    4 - Permite alterar o apelido.
    5 - Remove um guerreiro. Esse guerreiro deve entrar no Hall of Heroes. 
    6 - Foi solicitado que as rotas sempre inicie com "/knights", portanto à defini como padrão.
*/

//1
router.get('',  getKnights);

//2
router.get('/:id',  getKnight);

//3
router.post('', createKnights);

//4
router.put("/:id", updateKnights);

//5
router.delete("/:id", deleteKnights);

//6
module.exports = app => app.use('/knights',router);

