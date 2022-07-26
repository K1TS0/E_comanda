<?php
     include('../../conexao/conn.php');

//Código do DataTable, não feito pelo professor
     $requestData = $_REQUEST;

     //Só serão mostrados os clientes da empresa logada
     session_start();
     $EMPRESA_ID = $_SESSION['ID']; //Para ficar mais fácil de manusear dentro desse código

     $colunas = $requestData['columns'];//Gera as colunas da tabela que vai aparecer na tela

     $sql = "SELECT * FROM CLIENTE WHERE EMPRESA_ID = $EMPRESA_ID AND 1=1 ";//1=1 > Traz tudo
     //SELECT * > Traz todos os dados da tabela (Nesse caso, seria: SELECT ID, NOME, TELEFONE)
     //WHERE EMPRESA_ID = $EMPRESA_ID > Para filtrar somente os clientes da empresa logada

     $resultado = $pdo->query($sql);
     $qtdeLinhas = $resultado->rowCount(); //rowCount() > Conta quantos registros foram encontrados


     $filtro = $requestData['search']['value']; //Verificando se há filtro determinado (ou seja, filtrar por nome, ID, etc)
     if( !empty( $filtro ) ){//Se esse filtro não estiver vazio (!empty > '!' é negação)
          //Opções de filtro
          $sql .= " AND (ID LIKE '$filtro%' "; //Por ID
          $sql .= " OR NOME LIKE '$filtro%') "; //Por Nome
          $sql .= " OR TELEFONE LIKE '$filtro%' "; //Por Telefone
     }

     $resultado = $pdo->query($sql);
     $totalFiltrados = $resultado->rowCount();//Faz uma nova contagem para contar as linhas encontradas com o filtro

    //Reordenar as colunas   
    $colunaOrdem = $requestData['order'][0]['column']; //Obtém a posição da coluna na ordenação (começa no 0)
    $ordem = $colunas[$colunaOrdem]['data']; //Obtém o nome da coluna para a ordenação
    $direcao = $requestData['order'][0]['dir']; //Obtém a direção da ordenação

    //Obter valores para o LIMIT > Quantos registros ao máximo você quer que aparece na tela
    $inicio = $requestData['start']; //Ínicio do limite
    $tamanho = $requestData['length']; //Tamanho do limite

    //Para fazer a filtragem com esse limite | ORDER BY > Ordenado por , LIMIT > Limites delimitados
     $sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
     $resultado = $pdo->query($sql);
     $dados = array();
     while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
          $dados[] = array_map('utf8_encode', $row);
     }
    //Monta o objeto json para retornar ao DataTable
     $json_data = array(
          //Padrões do DataTable
          "draw" => intval($requestData['draw']), //Como vai ser "desenhado" na tela
          "recordsTotal" => intval($qtdeLinhas), //Total de linhas
          "recordsFiltered" => intval($totalFiltrados), //Se tem linhas filtradas
          "data" => $dados
     );

     echo json_encode($json_data);