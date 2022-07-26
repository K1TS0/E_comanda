<?php 
     include('../../conexao/conn.php');

     $ID = $_REQUEST['ID'];

     $sql = "DELETE FROM EMPRESA WHERE ID = $ID";

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