<?php
     //Conexão com o banco de dados
     include('../../conexao/conn.php');

     //Só serão mostrados os produtos da empresa logada
     session_start();

     //$requestData > Array que recebe todas as informações enviadas pelo formulário de uma vez só
     //$_REQUEST > Garante que não vai dar bug
     $requestData = $_REQUEST;

     //Confere se esses campos estão vazios
     if(empty($requestData['NOME'])){
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
                    INSERT INTO PRODUTO > Pegar os dados da tabela PRODUTO, especificados dentro dos parênteses
                    VALUES > Variáveis temporárias que vão coletar esses dados
                    */
                    $stmt = $pdo -> prepare("INSERT INTO PRODUTO(NOME, VALOR, EMPRESA_ID) VALUES (:a, :b, :c)");

                    /* execute > Executa o comando */
                    $stmt -> execute(array(
                         /*utf8_decode > Decodifica o texto para que o banco consiga salvar os acentos e coisas do tipo 
                         $requestData['NOME'] > O dado que vai ser inserido nessas variáveis
                         $_SESSION['ID'] > Como só são mostrados os produtos da empresa logada, é só pegar o ID dessa sessão
                         */
                         ':a' => utf8_decode($requestData['NOME']),
                         ':b' => $requestData['VALOR'],
                         ':c' => $_SESSION['ID']
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
                    
                    */
                    $stmt = $pdo -> prepare("UPDATE PRODUTO SET NOME = :a, VALOR = :b WHERE ID = :id");
                    $stmt -> execute(array(
                         ':id' => $ID,
                         ':a' => utf8_decode($requestData['NOME']),
                         ':b' => $requestData['VALOR'],
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