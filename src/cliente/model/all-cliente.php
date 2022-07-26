<?php

     include('../../conexao/conn.php');

     //Conexão com sessão para pegar os dados específicos da empresa logada
     session_start();
     $EMPRESA_ID = $_SESSION['ID'];

     $sql = "SELECT * FROM CLIENTE WHERE EMPRESA_ID = ".$EMPRESA_ID." ORDER BY NOME DESC";
     //ORDER BY NOME DESC > Nome em ordem decrescente


     $resultado = $pdo -> query($sql); //Executa
     //query > Mais rápido, basicamente compila todo o processo de prepare e execute

     //Verifica se o $resultado funcionou
     if($resultado){
          while($row = $resultado -> fetch(PDO::FETCH_ASSOC)){
               $dados[] = array_map('utf8_encode', $row);
          }
     }

     echo json_encode($dados);

     //https://youtu.be/32Vs6NmtVpo?t=5863 < Parei aqui



