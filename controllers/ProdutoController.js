const produto = require('../model/ProdutoModel')

module.exports= app=>{
    app.post('/Produto',(req,res)=>{
        var produtos = new produto();

        produtos.nome = req.body.nome;
        produtos.preco = req.body.preco;
        produtos.descricao = req.body.descricao;
        
        produtos.save((error)=>{
            if(error)
                res.status(400).json('Erro ao tentar salvar o Produto....: ' + error);
            
            res.status(201).json({ message: 'Produto Cadastrado com Sucesso!', produto:produtos });
        });
    })

    app.get('/Produtos',(req,res)=>{
        produto.find((erro,produtos)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(produtos)
            }
        })
    })

    app.get('/Produto/:id',(req,res)=>{
        
        produto.findById(req.params.id,(erro,produtos)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(produtos)
            }
        })
    })

    app.delete('/Produto/:id',(req,res)=>{
        produto.remove({_id:req.params.id},(erro,produtos)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(produtos)
            }
        })
    })

    app.put('/Produto/:id',(req,res)=>{
        produto.findById(req.params.id,(erro,produto)=>{
            if(erro){
                res.status(400).json("Não encontrado")
            }else{
                produto.nome = req.body.nome
                produto.preco = req.body.preco
                produto.descricao = req.body.descricao

                produto.save((erro)=>{
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        res.status(200).json("Atualizado com sucesso")
                    }
                })
            }
        })
    })
}