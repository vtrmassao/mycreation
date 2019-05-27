// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {
  console.log(banco.conexao);


  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);


    return banco.sql.query(`select pers_play1, pers_play2, pers_vida1, pers_vida2, nome1_jog, nome2_jog from tb_personagens where id_personagem=1`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);


    if (consulta.recordset.length == 1) {

      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    var personagem_1 = req.body.jogador1; // depois de .body, use o nome (name) do campo em seu formulário de login
    var personagem_2 = req.body.jogador2; // depois de .body, use o nome (name) do campo em seu formulário de login
    var vida_1 = req.body.vida1;
    var vida_2 = req.body.vida2;
    var nome_1 = req.body.nome1;
    var nome_2 = req.body.nome2;


    if (personagem_1 == undefined || personagem_2 == undefined || vida_1 == undefined || vida_2 == undefined || 
      nome_1 == undefined || nome_2 == undefined) {
      throw new Error(`Dados de cadastro não chegaram completos: ${personagem_1} / ${personagem_2} / ${vida_1} ${vida_2} 
      / ${nome_1} / ${nome_2}`);
    }
    return banco.sql.query(`UPDATE tb_personagens set pers_play1 = '${personagem_1}',
     pers_play2 = '${personagem_2}', pers_vida1 = '${vida_1}', pers_vida2 = '${vida_2}', nome1_jog = '${nome_1}',
     nome2_jog = '${nome_2}' where id_personagem=1`);

  }).then(consulta => {

    res.sendStatus(200);
    // console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    // if (consulta.recordset.length==1) {
    //   res.send(consulta.recordset[0]);
    // } else {
    //   res.sendStatus(404);
    // }

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/login', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.user; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.password; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from tb_usuarios where login_usuario='${login}' and senha_usuario='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// não mexa nesta linha!
module.exports = router;