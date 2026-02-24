const express = require('express')
const cors = require('cors')
const app = express()

// Configurações para entender JSON e permitir acesso do frontend
app.use(express.json())
app.use(cors())

// Simulando o banco de dados em memória para você testar agora
let pedro_otavio = []
let idAtual = 1

// 1. Rota para MOSTRAR os produtos (GET)
app.get('/produtos', (req, res) => {
  res.json(pedro_otavio)
})

// 2. Rota para CADASTRAR um produto (POST)
app.post('/produtos', (req, res) => {
  const { nome, preco, descricao } = req.body
  const novoProduto = { id: idAtual, nome, preco, descricao }
  
  pedro_otavio.push(novoProduto)
  idAtual++
  
  res.status(201).json({ mensagem: 'Produto salvo com sucesso na tabela pedro_otavio!' })
})

// 3. Rota para APAGAR um produto (DELETE)
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  pedro_otavio = pedro_otavio.filter(produto => produto.id !== id)
  
  res.json({ mensagem: 'Produto apagado!' })
})

app.listen(3000, () => {
  console.log('Backend rodando na porta 3000')
})