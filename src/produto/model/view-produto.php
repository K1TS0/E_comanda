<?php
     include('../../conexao/conn.php');
     
     $ID = $_REQUEST['ID']; //Pega o ID

     //Nesse caso não será necessário o ID da empresa já que só vai mostrar o produto em si
     $sql = "SELECT * FROM PRODUTO WHERE ID = $ID"; //Consulta o banco

     $resultado = $pdo -> query($sql); //Executa
     //query > Mais rápido, basicamente compila todo o processo de prepare e execute

     //Verifica se houve um resultado
     if($resultado){ //Se existe
          $result = array();

          /* $row > linha
          fetch > Percorre o array e associa todos os resultados para colocar em um novo array de modo ordenado (PDO::FETCH_ASSOC)
          */
          while($row = $resultado -> fetch(PDO::FETCH_ASSOC)){
               $result = array_map('utf8_encode', $row); //Mapeia o array e devolve os acentos para as palavras (utf8_encode)
          }

          $dados = array(
               'tipo' => 'success',
               'mensagem' => '',
               'dados' => $result
          );
     }else {
          $dados = array(
               'tipo' => 'error',
               'mensagem' => 'Não foi possível encontrar o registro solicitado.',
               'dados' => array()
          );
     }

     echo json_encode($dados);