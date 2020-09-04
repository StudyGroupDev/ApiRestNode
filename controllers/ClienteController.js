const ClienteModel = require('../model/ClienteModel')

module.exports = app =>{
    app.get('/Cliente',(req, res)=> {
        ClienteModel.listar(res)
    })

    app.get('/Cliente/:id',(req,res) =>{
        const id = parseInt(req.params.id)
        ClienteModel.buscarPorId(id,res)
    })

    app.post('/Cliente',(req,res)=>{ 
        let cliente = req.body
       ClienteModel.adicionar(cliente, res)
    })

    app.patch('/Cliente/:id',(req,res)=>{
        let id = parseInt(req.params.id)
        ClienteModel.editar(id,req.body,res)
    })

    app.delete('/Cliente/:id',(req,res)=>{
        let id = parseInt(req.params.id)
        ClienteModel.deletar(id,res)
    })


}
