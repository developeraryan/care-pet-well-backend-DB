//imports
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
    await mongoose.connect(db).then(()=> {console.log("database connected");}).catch((e)=> {console.log(e);})
}


module.exports = connectDb;