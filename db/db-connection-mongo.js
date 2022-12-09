const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        /*const MONGO_URI = 'mongodb+srv://root:qggvmJkaXVx4iIzB@cluster1.eyiym1l.mongodb.net/?retryWrites=true&w=majority';

        await mongoose.connect(process.env.MONGO_URI);*/
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    
        console.log('Conexión exitosa');

    }catch (error){
        console.log(error)
    }

}

module.exports = {
    getConnection,
}