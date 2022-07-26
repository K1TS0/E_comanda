<?php
     //Conexão com o banco de dados
     include('../../conexao/conn.php');

     //$requestData > Array que recebe todas as informações enviadas pelo formulário de uma vez só
     //$_REQUEST > Garante que não vai dar bug
     $requestData = $_REQUEST;

     //Confere se esses campos estão vazios
     if(empty($requestData['NOME']) && empty($requestData['LOGIN']) && empty($requestData['SENHA'])){
          $dados = array(
               "tipo" => 'error',
               "mensagem" => 'Preencha todos os campos antes de enviar.'
          );
     }else{
          //isset > Vê se ele está setado/definido
          $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
               /* Versão curta de:
                    if(isset($requestData['ID'])){
                         $ID = $requestData['ID'];
                    }else{
                         $ID = '';
                    }
               */
          $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';
          //Para poder atualizar e salvar um novo registro com o mesmo código

          //'insert' > Criar novo registro 
          if($operacao == 'insert'){
               try{
                    /*$stmt > Estado da conexão, recebe o PDO
                    prepare > Prepara o comando
                    INSERT INTO EMPRESA > Pegar os dados da tabela EMPRESA, especificados dentro dos parênteses
                    VALUES > Variáveis temporárias que vão coletar esses dados
                    */
                    $stmt = $pdo -> prepare("INSERT INTO EMPRESA(NOME, LOGIN, SENHA) VALUES (:a, :b, :c)");

                    /* execute > Executa o comando */
                    $stmt -> execute(array(
                         /*utf8_decode > Decodifica o texto para que o banco consiga salvar os acentos e coisas do tipo 
                         $requestData['NOME'] > O dado que vai ser inserido nessas variáveis
                         md5 > Para criptografar as senhas
                         */
                         ':a' => utf8_decode($requestData['NOME']),
                         ':b' => $requestData['LOGIN'],
                         ':c' => md5($requestData['SENHA'])
                    ));
                    $dados = array(
                         "tipo" => 'success',
                         "mensagem" => 'Registro salvo com sucesso!'
                    );
               } catch(PDOException $e) {
                    $dados = array(
                         "tipo" => 'error',
                         "mensagem" => 'Não foi possível salvar o registo.'.$e
                    );
               }

          }else { //Para atualizar
               try{
                    /* UPDATE NOMETABELA > Atualizar tal tabela
                    SET > Vai indicar quais variáveis os dados da primeira tabela serão substituídos
                    WHERE > Quando tal dado for = tal variável
                    */
                    $stmt = $pdo -> prepare("UPDATE EMPRESA SET NOME = :a, LOGIN = :b, SENHA = :c WHERE ID = :id");
                    $stmt -> execute(array(
                         ':id' => $ID,
                         ':a' => utf8_decode($requestData['NOME']),
                         ':b' => $requestData['LOGIN'],
                         ':c' => md5($requestData['SENHA'])
                    ));
                    $dados = array(
                         "tipo" => 'success',
                         "mensagem" => 'Registro atualizado com sucesso!'
                    );
               } catch(PDOException $e) {
                    $dados = array(
                         "tipo" => 'error',
                         "mensagem" => 'Não foi possível atualizar o registo.'.$e
                    );
               }
          }
     }

     //Para dar retorno para o save-empresa.js
     echo json_encode($dados); //$dados > Variável que salva os arrays dos erros e sucessos