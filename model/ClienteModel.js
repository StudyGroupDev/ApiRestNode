const moment = require('moment')
const conexao = require('../infra/conexaoMySql')

class ClienteModel{
        adicionar(cliente, res){
            let DataCadastro = new Date()
            let DataNascimento = moment(cliente.DATANASCIMENTO,'DD/MM/YYYY')
            cliente.DATANASCIMENTO = DataNascimento
            cliente.DATACADASTRO = DataCadastro
            
            let dataNacimentoValida = moment().subtract(18, "years").isSameOrBefore(DataNascimento)
            console.log(DataNascimento)
            let nomeValido =  cliente.NOME.length >=5 
            let sobrenome = cliente.SOBRENOME.length > 4
            let cpf = this.validarCpf(cliente.CPF)
           
            
            let validacoes =[
                {
                nome:'nome',
                valido:nomeValido,
                mensagem:'O nome do cliente deve possuir no minimo 5 letras'
                },
                {
                    nome:'sobrenome',
                    valido:sobrenome,
                    mensagem:'O sobrenome do cliente deve possuir no minimo 4 letras'
                },
                {
                    nome:'cpf',
                    valido:cpf,
                    mensagem:'cpf invalido'
                },
                {
                    nome:'dataNascimento',
                    valido:dataNacimentoValida,
                    mensagem:'O cliente tem que ter no minino 18 anos de idade'
                }
            ]
            let erros = validacoes.filter(x => !x.valido)
            
            const contemErros = erros.length
            
            if(contemErros){
                res.status(400).json(erros)
            }else{
                
                let sql = "INSERT INTO CLIENTE SET ?"
                    conexao.query(sql,cliente,(erro,resultados)=>{
                        if(erro){
                           res.status(400).json(erro)
                        }else{
                            res.status(201).json(cliente)
                        }
                    })
            }
        }

        validarCpf(cpf){
            let Soma;
            let Resto;
            Soma = 0;
            if (cpf == "00000000000") return false;

            for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

            Soma = 0;
                for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;

                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
                return true;
        }

        listar(res){
            let sql = 'select * from CLIENTE'

            conexao.query(sql,(erro,resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(resultados)
                }
            })
        }


        buscarPorId(id,res){
            let sql = 'select * from Cliente where id = ?'

            conexao.query(sql,id,(erro,resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(resultados[0])
                }
            })
        }

        editar(id,valores,res){
            let sql = 'UPDATE CLIENTE SET ? WHERE ID = ?'

            conexao.query(sql,[valores,id],(erro,resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json({...valores,id})
                }
            })
        }

        deletar(id,res){
            let sql = 'delete from Cliente where id = ?'

            conexao.query(sql,id,(erro,resultados)=>{
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json({id})
                }
            })
        }
}

module.exports = new ClienteModel