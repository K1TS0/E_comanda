<?php
     session_start();

     if(!isset($_SESSION['ID'])){//Se não existir uma sessão com ID
          $dados = array(
               'tipo' => 'error',
               'mensagem' => 'Você não está autenticado.'
          );
     }else{ //Se houver uma sessão com ID
          $dados = array(
               'tipo' => 'success',
               'mensagem' => 'Seja bem vindo ao sistema!'
          );
     }

     echo json_encode($dados);