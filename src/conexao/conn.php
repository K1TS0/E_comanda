<?php
/* Esse arquivo vai ser chamado por todas as outras pastas 
PHP > Linguagem 100% web, Server side > Compilada e traduzida no servidor enquanto a resposta é feita pela máquina (navegador)
Como vamos usar o PHP separado do html, não será necessário fechar a tag
*/

     /*Para criar variáveis é só utilizar $nomevar | Termina sempre em ';'*/
     $hostname = "mysql.adsolucoestecnologia.com.br"; //$hostname > "Nome" do host
     $dbname = "adsolucoestecn15"; //$dbname > Nome do banco de dados
     $username = "adsolucoestecn15"; //$username > Nomo do usuário do banco de dados
     $password = "TR31NAM3NT0"; //$password > Senha

     /* try-catch > Parecido com o if-else porém ele debugga quando dá erro */
     try{ //try > Quando dá certo
          /*Conexão com o banco de dados*/
          $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname,$username,$password); 
          /*new PDO('informações do banco de dados'.$variavel)
          -mysql:host= > Define que a conexão PDO vai se conectar com um banco de dados do mysql
          -dbname= > Recebe as informações que ele quer dentro desse banco, por isso que as informações estão em vírgula (ponto '.' > concatenação / virgula ',' > continuação)
          */

          /*setAttribute > Dá retorno de erros
          PDO::ATTR_ERRMODE > Deixa debuggar
          PDO::ERRMODE_EXCEPTION > Ele vai mostrar a linha (aproximada, 2 linhas acima ou abaixo) onde o erro aparece
          */
          $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          //echo 'A conexão com o banco de dados '.$dbname.' foi realizado com sucesso';
          //Comenta o sucesso para que mostre só o erro
     } catch (PDOException $e){ //Para debuggar o erro ($e)
          echo 'Error: '.$e -> getMessage(); //Para mostrar o erro de modo específico
     }
     //Para testar é só ir no código da página e colocar o endereço desse arquivo (/srs/conexao/conn.php)