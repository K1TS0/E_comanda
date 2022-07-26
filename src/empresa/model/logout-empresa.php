<?php
     //Verifica se existe uma sessão startada
     session_start();

     //Destrói essa sessão
     session_destroy();

     $dados = array(
          'tipo' => 'success',
          'mensagem' => 'Sua sessão foi encerrada.'
     );

     echo json_encode($dados);