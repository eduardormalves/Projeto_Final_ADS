const express = require('express');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

//models

sequelize.sync();

const Cliente = require('./models/modelCliente');
const Produto = require('./models/modelProduto');
const Agendamento = require('./models/modelAgendamento');
const Barbeiro = require('./models/modelBarbeiro');
const Corte = require('./models/modelCorte');
const Venda = require('./models/modelVenda');
const VendaProduto = require('./models/modelVendaProduto');

//Cliente - id, name, email, senha

//Cliente - POST

app.post('/modelCliente', async(req, res) => {
  try{
    const { name, email, senha } = req.body;

    //Teste
    console.log(name, email, senha);

    const newCliente = await Cliente.create({name, email, senha});

    //Teste
    console.log(newCliente);

    res.status(202).json(newCliente);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Usuario'});
  }
})

//Cliente - GET

app.get('/modelCliente', async(req, res) => {
  try{
    const { id } = req.params;
        
    //Teste
    console.log(id);

    const cliente = await Cliente.findByPk(id);
    res.status(202).json(cliente)

    //Teste
    console.log(cliente);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Usuario'})
  }
})

//Cliente - PUT

app.put('/modelCliente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, senha } = req.body;

    //Teste
    console.log(id, name, email, senha);

    const cliente = await Cliente.findByPk(id);

    //Teste
    console.log(cliente);

    if (cliente) {

      cliente.name = name;
      cliente.email = email;
      cliente.senha = senha;

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

//Produto - id, name, quantidadeEstoque, preco, descricao

//Produto - POST

app.post('/modelProduto', async(req, res) => {
  try{
    const { name, quantidadeEstoque, preco, descricao } = req.body;
      
    //Teste
    console.log(name, quantidadeEstoque, preco, descricao);

    const newProduto = await Produto.create({name, quantidadeEstoque, preco, descricao});

    //Teste
    console.log(newProduto);

    res.status(202).json(newProduto);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Produto'});
  }
})

//Produto - GET

app.get('/modelProduto', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const produtos = await Produto.findAll();
    res.status(202).json(produtos)

    //Teste
    console.log(produtos);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Produto'})
  }
})

//Produto - PUT

app.put('/modelProduto/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantidadeEstoque, preco, descricao } = req.body;

    //Teste
    console.log(id, name, quantidadeEstoque, preco, descricao);

    const produto = await Produto.findByPk(id);

    //Teste
    console.log(produto);

    if (produto) {

      produto.name = name;
      produto.quantidadeEstoque = quantidadeEstoque;
      produto.preco = preco;
      produto.descricao = descricao;

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

    //Teste
    console.log(id);

     //Teste
     console.log(produto);

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


//Agendamento - id, dataHora, status, fkIdBarbeiro, fkIdCorte, fkIdCliente

//Agendamento - POST

app.post('/modelAgendamento', async(req, res) => {
  try{
    const { dataHora, status, fkIdBarbeiro, fkIdCorte, fkIdCliente } = req.body;
      
    //Teste
    console.log(dataHora, status, fkIdBarbeiro, fkIdCliente, fkIdCorte);

    const newAgendamento = await Agendamento.create({dataHora, status, fkIdBarbeiro, fkIdCliente, fkIdCorte});

    //Teste
    console.log(newAgendamento);

    res.status(202).json(newAgendamento);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Agendamento'});
  }
})

//Agendamento - GET

app.get('/modelAgendamento', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const cliente = await Cliente.findByPk(id, {include: Agendamento});
    res.status(202).json(cliente.agendamentos)

    //Teste
    console.log(cliente.agendamentos);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Agendamentos'})
  }
})

//Agendamento - PUT

app.put('/modelAgendamento/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dataHora, status, fkIdBarbeiro, fkIdCliente, fkIdCorte } = req.body;

    //Teste
    console.log(id, dataHora, status, fkIdBarbeiro, fkIdCliente, fkIdCorte);

    const agendamento = await Agendamento.findByPk(id);

    //Teste
    console.log(agendamento);

    if (agendamento) {

      agendamento.dataHora = dataHora;
      agendamento.status = status;

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

    //Teste
    console.log(id);

     //Teste
     console.log(agendamento);

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

//Barbeiro - id, name, email, telefone, especialidade

//Barbeiro - POST

app.post('/modelBarbeiro', async(req, res) => {
  try{
    const { name, email, telefone, especialidade } = req.body;
      
    //Teste
    console.log(name, email, telefone, especialidade);

    const newBarbeiro = await Barbeiro.create({name, email, telefone, especialidade});

    //Teste
    console.log(newBarbeiro);

    res.status(202).json(newBarbeiro);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Barbeiro'});
  }
})

//Barbeiro - GET

app.get('/modelBarbeiro', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const barbeiro = await Barbeiro.findByPk(id);
    res.status(202).json(barbeiro)

    //Teste
    console.log(barbeiro);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Barbeiro'})
  }
})

//Barbeiro - PUT

app.put('/modelBarbeiro/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, telefone, especialidade } = req.body;

    //Teste
    console.log(id, name, email, telefone, especialidade);

    const barbeiro = await Barbeiro.findByPk(id);

    //Teste
    console.log(barbeiro);

    if (barbeiro) {

      barbeiro.name = name;
      barbeiro.email = email;
      barbeiro.telefone = telefone;
      barbeiro.especialidade = especialidade;

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

    //Teste
    console.log(id);

     //Teste
     console.log(barbeiro);

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


//Corte - id, descricao, preco, duracao

//Corte - POST

app.post('/modelCorte', async(req, res) => {
  try{
    const { descricao, preco, duracao } = req.body;
      
    //Teste
    console.log(descricao, preco, duracao);

    const newCorte = await Corte.create({descricao, preco, duracao});

    //Teste
    console.log(newCorte);

    res.status(202).json(newCorte);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Corte'});
  }
})

//Corte - GET

app.get('/modelCorte', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const corte = await Corte.findByPk(id);
    res.status(202).json(corte)

    //Teste
    console.log(corte);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Corte'})
  }
})

//Corte - PUT

app.put('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, preco, duracao } = req.body;

    //Teste
    console.log(id, descricao, preco, duracao);

    const corte = await Corte.findByPk(id);

    //Teste
    console.log(corte);

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

    //Teste
    console.log(id);

     //Teste
     console.log(corte);

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

//Venda - id, descricao, preco, duracao

//Corte - POST

app.post('/modelCorte', async(req, res) => {
  try{
    const { descricao, preco, duracao } = req.body;
      
    //Teste
    console.log(descricao, preco, duracao);

    const newCorte = await Corte.create({descricao, preco, duracao});

    //Teste
    console.log(newCorte);

    res.status(202).json(newCorte);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Corte'});
  }
})

//Corte - GET

app.get('/modelCorte', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const corte = await Corte.findByPk(id);
    res.status(202).json(corte)

    //Teste
    console.log(corte);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Corte'})
  }
})

//Corte - PUT

app.put('/modelCorte/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, preco, duracao } = req.body;

    //Teste
    console.log(id, descricao, preco, duracao);

    const corte = await Corte.findByPk(id);

    //Teste
    console.log(corte);

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

    //Teste
    console.log(id);

     //Teste
     console.log(corte);

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


//Venda - id, dataVenda, fkIdCliente

//Venda - POST

app.post('/modelVenda', async(req, res) => {
  try{
    const { dataVenda, fkIdCliente } = req.body;
      
    //Teste
    console.log(dataVenda, fkIdCliente);

    const newVenda = await Agendamento.create({dataVenda, fkIdCliente});

    //Teste
    console.log(newVenda);

    res.status(202).json(newVenda);
  } catch (error) {
    res.status(500).json({error: 'Falha ao criar Venda'});
  }
})

//Venda - GET

app.get('/modelVenda', async(req, res) => {
  try{
    const { id } = req.params;
      
    //Teste
    console.log(id);

    const cliente = await Cliente.findByPk(id, {include: Venda});
    res.status(202).json(cliente.vendas)

    //Teste
    console.log(cliente.vendas);

  } catch (error) {
    res.status(500).json({error: 'Falha ao buscar Venda'})
  }
})

//Venda - PUT

app.put('/modelVenda/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dataVenda, fkIdCliente } = req.body;

    //Teste
    console.log(id, dataVenda, fkIdCliente);

    const venda = await Venda.findByPk(id);

    //Teste
    console.log(venda);

    if (venda) {

      venda.dataHora = dataHora;

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

    //Teste
    console.log(id);

     //Teste
     console.log(venda);

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

//VendaProduto

//CRUD a fazer


app.listen(PORT, ()=>{
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})