<?php
     include('../../conexao/conn.php');

     /*Verifica se a empresa fazendo login realmente existe no banco de dados
     count(ID) > Conta quantas vezes é possível achar determinado registro
     FROM EMPRESA WHERE LOGIN = '".$_REQUEST['LOGIN']."' > Procura se existe registros no banco com esse login e senha
     '".md5($_REQUEST['SENHA'])."' > md5 para criptografar a senha para ser o mesmo salvo no banco
     achou > Alias > Nome temporário para uma tabela, para facilitar a leitura (KeyWord > 'as')
     */
     $sql = $pdo -> query("SELECT *, count(ID) as achou FROM EMPRESA WHERE LOGIN = '".$_REQUEST['LOGIN']."' AND SENHA = '".md5($_REQUEST['SENHA'])."'");

     while($resultado = $sql -> fetch(PDO::FETCH_ASSOC)){
          //Se ele achar um registro, ele vai colocar como '1' dentro do achou
          if($resultado['achou'] == 1){ //Se der certo
               //Começa a sessão do PHP
               session_start();
               //Por conta do Alias e do * do SELECT, ele vai trazer todos os dados da tabela EMPRESA + o Alias
               $_SESSION['ID'] = $resultado['ID'];
               $dados = array(
                    'tipo' => 'success',
                    'mensagem' => 'Login efetuado com sucesso!'
               );

          }else{ //Se der errado
               $dados = array(
                    'tipo' => 'error',
                    'mensagem' => 'Login ou senha incorreto.'
               );
          }
     }

     echo json_encode($dados);