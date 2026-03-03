const express = require('express')
const mysql = require('mysql2/promise')
const path = require('path') 

const app = express()
const port = 3000

// Configurações do Express
app.use(express.json())
app.use(express.static('public')) // Diz pro Express servir os arquivos da pasta public

// Configuração do seu Banco de Dados
const dbConfig = {
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'web_03mc' 
}

// ==========================================
// 1. ROTAS DA API (O Backend que fala com o Banco)
// ==========================================

// Buscar todos os produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const conexao = await mysql.createConnection(dbConfig)
    const [linhas] = await conexao.execute('SELECT * FROM pedro_otavio')
    await conexao.end()
    res.json(linhas)
  } catch (erro) {
    console.error("ERRO AO BUSCAR:", erro.message)
    res.status(500).json({ erro: 'Erro ao buscar no banco', detalhes: erro.message })
  }
})

// Cadastrar um produto
app.post('/api/produtos', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body
    const conexao = await mysql.createConnection(dbConfig)
    
    await conexao.execute(
      'INSERT INTO pedro_otavio (nome, preco, descricao) VALUES (?, ?, ?)',
      [nome, preco, descricao]
    )
    
    await conexao.end()
    res.status(201).json({ mensagem: 'Produto salvo no banco com sucesso!' })
  } catch (erro) {
    console.error("ERRO AO CADASTRAR:", erro.message) 
    res.status(500).json({ erro: 'Erro ao salvar no banco', detalhes: erro.message })
  }
})

// Apagar um produto
app.delete('/api/produtos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const conexao = await mysql.createConnection(dbConfig)
    
    await conexao.execute('DELETE FROM pedro_otavio WHERE id = ?', [id])
    await conexao.end()
    
    res.json({ mensagem: 'Produto apagado do banco!' })
  } catch (erro) {
    console.error("ERRO AO APAGAR:", erro.message)
    res.status(500).json({ erro: 'Erro ao apagar', detalhes: erro.message })
  }
})

// ==========================================
// 2. ROTAS DO FRONTEND (As páginas HTML)
// ==========================================

app.get('/', (req, res) => {
  res.redirect('/produtos') // Redireciona a página principal direto para os produtos
})

app.get('/produtos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'produtos.html'))
})

app.get('/cadastrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastrar.html'))
})

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})