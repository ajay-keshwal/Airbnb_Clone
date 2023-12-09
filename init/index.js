const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const initData  = require("./data.js");

main().then(()=>{
    
    console.log("connection succesfully");
    
}).catch((err) => {
    console.log(err);
})

async function main(){
    
    
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderLust");
    
}

 const  initDB = async ()=> {

    await listing.deleteMany({});
    let insertData = initData.data.map((obj) => ({
        ...obj,owner:"6566d49f086e0d2916a86ded",
    }));

    
    let data = await listing.insertMany(insertData,{runValidators:true});
    console.log(data);

    

}
initDB();