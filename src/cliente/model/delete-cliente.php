<?php 
     include('../../conexao/conn.php');

     $ID = $_REQUEST['ID'];

     //Nesse caso não será necessário o ID da empresa já que só vai mostrar o cliente em si
     $sql = "DELETE FROM CLIENTE WHERE ID = $ID";

     $resultado = $pdo -> query($sql);

     if($resultado){
          $dados = array(
               "tipo" => 'success',
               "mensagem" => 'Registro deletado com sucesso!'
          );
     }else {
          $dados = array(
               "tipo" => 'error',
               "mensagem" => 'Não foi possível excluir o registro.'
          );
     }

     echo json_encode($dados);


     //https://youtu.be/32Vs6NmtVpo?t=3601 < Onde eu parei