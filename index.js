const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexaoMySql')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/NodeJSMongo',{useMongoClient:true})

const app = customExpress()

conexao.connect((error)=>{
    if(error){
        console.log(error+'deu ruim')
    }else{
        console.log('conectou')
        app.listen(3000,()=> console.log('servidor na roda 3000'))
    }
})


