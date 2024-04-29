const dados = require('./data/imagens.json')
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcional");
})

server.get('/', (req, res) => {
    return res.json({ mensagem: "Estou funcionando!" })
})

// CRUD DA API

// Create da API
server.post('/imagens', (req, res) => {
    const { url, titulo, autor, descricao } = req.body

    if (!url || !titulo || !autor || !descricao) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        const novaImagem = {
            id: dados.Imagens.length + 1,   
            url: url,
            titulo: titulo,
            autor: autor,
            descricao: descricao
        }

        dados.Imagens.push(novaImagem)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" })
    }
})

// Read da API
server.get('/imagens', (req, res) => {
    return res.json(dados.Imagens)
})

// Update da API
server.put('/imagens/:id', (req, res) => {
    const imagemId = parseInt(req.params.id)
    const atualizarUser = req.body

    const indiceImagem = dados.Imagens.findIndex(u => u.id === imagemId)

    if (indiceImagem === -1) {
        return res.status(404).json({ mensagem: "Imagem não encontrada" })
    } else {
        dados.Imagens[indiceImagem].url = atualizarUser.url || dados.Imagens[indiceImagem].url
        
        dados.Imagens[indiceImagem].titulo = atualizarUser.titulo || dados.Imagens[indiceImagem].titulo

        dados.Imagens[indiceImagem].autor = atualizarUser.autor || dados.Imagens[indiceImagem].autor

        dados.Imagens[indiceImagem].descricao = atualizarUser.descricao || dados.Imagens[indiceImagem].descricao

        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})

//Delete da API
server.delete('/imagens/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // filtrar os Imagens, removendo pelo id correspondente
    
    dados.Imagens = dados.Imagens.filter(u => u.id !== id)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Imagem excluida com sucesso!" })
})

// Função que salva os dados
function salvarDados() {
    fs.writeFileSync(__dirname + '/data/imagens.json', JSON.stringify(dados, null, 2))
}