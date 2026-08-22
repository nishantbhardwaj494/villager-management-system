const express = require("express");
const {MongoClient, Collection} = require("mongodb");

const app = express();

app.use(express.static("public"));
app.use(express.json());


const client = new MongoClient("mongodb://127.0.0.1:27017");

let db;

async function connectDB(){
    await client.connect();

      db = client.db("villageDB");

    console.log("MongoDb Connected");


}
connectDB();

app.post("/add",async(req,res)=>{
    
   console.log(req.body);
    await
    db.collection("villages").insertOne(req.body);
    console.log("Data Saved");

    res.json({message:"Data Saved"});
});

app.get("/add",async(req,res)=>{
    const data = await db.collection("villages").find().toArray();

    res.json(data);
});

app.put("/add",async(req,res)=>{
    let data = req.body;
    await
    db.collection("villages").updateOne(
        {adhar: req.body.adhar},
        {
            $set:{
                name: data.name,
                villageName: data.villageName,
                age: data.age,
                gender: data.gender,
                mobile: data.mobile,
                occupation: data.occupation,
                adhar: data.adhar

            }
        }
        
    );
    res.json({message: "Updated Successfully"});

});
app.delete("/add",async(req,res)=>{
    await 
    db.collection("villages").deleteOne({
        name: req.body.name
    });
    res.json({message: "Deleted Successfully"});
});

app.listen(3000, () =>{
    console.log("Server running on port 3000");
});
