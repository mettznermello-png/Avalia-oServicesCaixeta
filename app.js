import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

import swaggerUi from 'swagger-ui-express'
import swagger from './sawwager.js'

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger))

const missoes = [
    {
        "id": 1,
        "nome": "Apollo",
        "ano": 1969,
        "agencia": "NASA",
        "status": "concluida"
    },

    {
        "id": 2,
        "nome": "Voyager 1",
        "ano": 1977,
        "agencia": "NASA",
        "status": "em operação"
    },

    {
        "id": 3,
        "nome": "Artemis II",
        "ano": 2026,
        "agencia": "NASA",
        "status": "planejada"
    }
]

app.get('/status', (req, res) => {
    res.status(200).json({ message: "Tudo dando certo!"})
})

app.get('missoes', (_, res) => {
    res.status(200).json(missoes)
})

app.get('/missoes/:id', (req, res) => {
    const id = Number(req.params?.id)

    const livro = livro.find(id => id.id === id )

    if ( !livro ) {
        return res.status(404).json({ error: "Missoão não encontrada"})
    }

    res.status(200).json({ sucess: livro })
})

app.post('/missoes', (req, res) => {

    const id = req.body?.id || null
    const nome = req.body?.nome || null
    const ano = req.body?.ano || null
    const agencia = req.body?.agencia || null
    const status = req.body?.status || null
    if(!id){
        return res.status(400).json({error: "ID é obrigatório"})
      }

      if(!nome){
        return res.status(400).json({error: "Nome é obrigatório"})
      }
      if(!ano){
        return res.status(400).json({error: "Ano é obrigatório"})
      }

      if(!agencia){
        return res.status(400).json({error: "Agencia é obrigatório"})
      }
      if(!status){
        return res.status(400).json({error: "Status é obrigatório"})
      }

      const newMission = {
        id : missoes.length + 1,
        nome : nome,
        ano : ano,
        agencia : agencia,
        status : req.body?.status || false
      }

      livros.push(newMission)
      res.status(200).json(newMission)

})

app.put('/missoes/:id', (req, res) => {
    const id = Number(req.params.id);
    const missao = missoes.find(it => it.id === id);
    if(!missao){
        return res.status(404).json({error: "Missão não encontrado"})
    }

    if(req?.body?.nome && req.body.nome !== ""){
        missao.nome = req.body.nome;
    }

    if(req?.body?.ano && req.body.ano !== ""){
        missao.ano = req.body.ano;
    }

    if(req?.body?.agencia && req.body.agencia !== ""){
        missao.agencia = req.body.agencia;
    }

    if(req?.body?.status && req.body.status !== ""){
        missao.status = req.body.status;
    }

    res.status(200).json(missao)
})

app.delete('/missoes/:id', (req, res) =>{
    const id = Number(req.params.id);
    const indice = missoes.findIndex(it => it.id === id)

    if(indice === -1){
        return res.status(404).json({ error: "Missão não encontrado" })
    }

    missoes.splice(indice, 1);

    res.status(204).send('')

});

export default app
