import axios from "axios";

const api = axios.create({
 baseURL: "http://localhost:3000",
 headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    },
});

export default{
    getKnigthsAll(){
        return api.get("/knights")
    },  
    getKnigth(id){
        return api.get("/knights/"+id)
    }, 
    getHeroesAll(){
        return api.get("/knights?filter=heroes")
    },
    postKnight(data){
        return api.post("/knights",data)
    },
    upKnigth(id,data){
        return api.put("/knights/" + id,data)
    },
    deleteKnigth(id){
        return api.delete("/knights/" + id)
    }
}

//export default api