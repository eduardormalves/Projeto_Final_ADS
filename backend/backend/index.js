const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());  

//models

sequelize.sync().then(() => {
  console.log('Base de dados e tabelas criadas!');
});

const Cliente = require('./models/modelCliente');
const Produto = require('./models/modelProduto');
const Agendamento = require('./models/modelAgendamento');
const Barbeiro = require('./models/modelBarbeiro');
const Corte = require('./models/modelCorte');
const Venda = require('./models/modelVenda');

//Cliente - id, name, email, telefone, senha, , 

//Cliente - POST

app.post('/modelCliente', async(req, res) => {
  try{
    const { name, email, telefone, senha } = req.body;

    const newCliente = await Cliente.create({name, email, telefone, senha });

    res.status(202).json(newCliente);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Usuario'});
  }
})

//Cliente - GET

app.get('/modelCliente/', async(req, res) => {
  try{

    const cliente = await Cliente.findAll();
    
    res.status(202).json(cliente)
  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Usuario'})
  }
})

//Cliente - PUT

app.put('/modelCliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, telefone, senha } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (cliente) {

      cliente.name = name;
      cliente.email = email;
      cliente.senha = senha;
      cliente.telefone = telefone;

      await cliente.save();
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar cliente' });
  }
});
  
//Cliente - DELETE

app.delete('/modelCliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    //Teste
    console.log(id);

    //Teste
    console.log(cliente);

    if (cliente) {
      await cliente.destroy();
      res.json({ message: 'Cliente apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover cliente' });
  }
});

//Produto - id, quantidadeEstoque, preco, , 

//Produto - POST

app.post('/modelProduto', async(req, res) => {
  try{
    const { id, name, quantidadeEstoque, preco } = req.body;

    const newProduto = await Produto.create({name, quantidadeEstoque, preco});

    res.status(202).json(newProduto);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Produto'});
  }
})

//Produto - GET

app.get('/modelProduto', async(req, res) => {
  try{
    const { id } = req.params;

    const produtos = await Produto.findAll();
    res.status(202).json(produtos)

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Produto'})
  }
})

//Produto - PUT

app.put('/modelProduto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantidadeEstoque, preco } = req.body;

    const produto = await Produto.findByPk(id);

    if (produto) {

      produto.quantidadeEstoque = quantidadeEstoque;
      produto.preco = preco;
      produto.name = name;

      await produto.save();
      res.json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar produto' });
  }
});

//Produto - DELETE

app.delete('/modelProduto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (produto) {
      await produto.destroy();
      res.json({ message: 'Produto apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover produto' });
  }
});


//Agendamento - id, dataHora, fkIdBarbeiro, fkIdCorte, fkIdCliente

//Agendamento - POST

app.post('/modelAgendamento', async(req, res) => {
  try{
    const { dataHora, fkIdBarbeiro, fkIdCliente } = req.body;
      
    const newAgendamento = await Agendamento.create({dataHora, fkIdBarbeiro, fkIdCliente });

    res.status(202).json(newAgendamento);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Agendamento'});
  }
})

//Agendamento - GET

app.get('/modelAgendamento', async(req, res) => {
  try{
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id, {include: Agendamento});
    res.status(202).json(cliente.agendamentos)

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Agendamentos'})
  }
})

//Agendamento - PUT

app.put('/modelAgendamento/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dataHora } = req.body;

    const agendamento = await Agendamento.findByPk(id);

    if (agendamento) {

      agendamento.dataHora = dataHora;

      await agendamento.save();
      res.json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar agendamento' });
  }
});

//Agendamento - DELETE

app.delete('/modelAgendamento/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id);

    if (agendamento) {
      await agendamento.destroy();
      res.json({ message: 'Agendamento apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover agendamento' });
  }
});

//Barbeiro - id, name, email, telefone, senha, , 

//Barbeiro - POST

app.post('/modelBarbeiro', async(req, res) => {
  try{
    const { name, email, telefone, senha } = req.body;
      
    const newBarbeiro = await Barbeiro.create({name, email, telefone, senha});

    res.status(202).json(newBarbeiro);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Barbeiro'});
  }
})

//Barbeiro - GET

app.get('/modelBarbeiro', async(req, res) => {
  try{

    const barbeiro = await Barbeiro.findAll();
    res.status(202).json(barbeiro)

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Barbeiro'})
  }
});

//Barbeiro - PUT

app.put('/modelBarbeiro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, telefone, senha } = req.body;

    const barbeiro = await Barbeiro.findByPk(id);

    if (barbeiro) {

      barbeiro.name = name;
      barbeiro.email = email;
      barbeiro.telefone = telefone;
      barbeiro.senha = senha;

      await barbeiro.save();
      res.json(barbeiro);
    } else {
      res.status(404).json({ error: 'Barbeiro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar barbeiro' });
  }
});

//Barbeiro - DELETE

app.delete('/modelBarbeiro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const barbeiro = await Barbeiro.findByPk(id);

    if (barbeiro) {
      await barbeiro.destroy();
      res.json({ message: 'Barbeiro apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Barbeiro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover barbeiro' });
  }
});


//Corte - id, descricao, preco, , 

//Corte - POST

app.post('/modelCorte', async(req, res) => {
  try{
    const { descricao, preco } = req.body;
      
    const newCorte = await Corte.create({descricao, preco});

    res.status(202).json(newCorte);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Corte'});
  }
});

//Corte - GET

app.get('/modelCorte', async(req, res) => {
  try{
    const corte = await Corte.findAll();

    res.status(202).json(corte)

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Corte'})
  }
});

//Corte - PUT

app.put('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, preco } = req.body;

    const corte = await Corte.findByPk(id);

    if (corte) {
 
      corte.descricao = descricao;
      corte.preco = preco;

      await corte.save();
      res.json(corte);
    } else {
      res.status(404).json({ error: 'Corte não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar corte' });
  }
});

//Corte - DELETE

app.delete('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const corte = await Corte.findByPk(id);

    if (corte) {
      await corte.destroy();
      res.json({ message: 'Corte apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Corte não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover corte' });
  }
});

//Venda - id, descricao, preco, duracao, , 

//Corte - POST

app.post('/modelCorte', async(req, res) => {
  try{
    const { descricao, preco, duracao } = req.body;

    const newCorte = await Corte.create({descricao, preco, duracao});

    res.status(202).json(newCorte);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Corte'});
  }
})

//Corte - GET

app.get('/modelCorte', async(req, res) => {
  try{
    const { id } = req.params;
      
    const corte = await Corte.findByPk(id);
    res.status(202).json(corte)

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Corte'})
  }
})

//Corte - PUT

app.put('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, preco, duracao } = req.body;

    const corte = await Corte.findByPk(id);

    if (corte) {

      corte.descricao = descricao;
      corte.preco = preco;
      corte.duracao = duracao;

      await corte.save();
      res.json(corte);
    } else {
      res.status(404).json({ error: 'Corte não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar corte' });
  }
});

//Corte - DELETE

app.delete('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const corte = await Corte.findByPk(id);

    if (corte) {
      await corte.destroy();
      res.json({ message: 'Corte apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Corte não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover corte' });
  }
});


//Venda - id, dataVenda, fkIdCliente, fkIdProduto

//Venda - POST

app.post('/modelVenda', async(req, res) => {
  try{
    const { dataVenda, fkIdCliente, fkIdProduto } = req.body;

    console.log(req.body);
    
    const newVenda = await Venda.create({dataVenda, fkIdCliente, fkIdProduto});

    res.status(202).json(newVenda);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Venda'});
  }
})

//Venda - GET

app.get('/modelVenda', async(req, res) =>{
  try{
    const vendas = await Venda.findAll();
    res.status(202).json(vendas)
  }catch(error){
    res.status(500).json({error: 'Falha ao buscar Venda'})
  }
})

//Venda - PUT

app.put('/modelVenda/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dataVenda } = req.body;

    const venda = await Venda.findByPk(id);

    if (venda) {

      venda.dataVenda = dataVenda;

      await venda.save();
      res.json(venda);
    } else {
      res.status(404).json({ error: 'Venda não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar venda' });
  }
});

//Venda - DELETE

app.delete('/modelVenda/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const venda = await Venda.findByPk(id);

    if (venda) {
      await venda.destroy();
      res.json({ message: 'Venda apagado com sucesso' });
    } else {
      res.status(404).json({ error: 'Venda não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Falha ao remover venda' });
  }
});


app.listen(PORT, ()=>{
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})