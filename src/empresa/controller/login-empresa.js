$(document).ready(function() {

     //Monitorar os cliques do botão 'btn-login'
     $('.btn-login').click(function(e) {
          e.preventDefault()

          /* dados > Variável que vai pegar todos os dados digitados no form
          .serialize() > Transforma esses dados em um array*/
          let dados = $('#form-login').serialize()

          //Chama o php e mandar ele executar
          $.ajax({
               type: 'POST', //Como a informação vai ser mandada para o php (GET ou POST)
               dataType: 'json', //O retorno que o PHP ta esperando
               assync: true, //Se o comando vai ser assíncrono ou não, ou seja, se for assíncrono, o frontend vai ser executado, e o backend vai estar sendo processado e só depois vai ser executado, se for síncrono, ambos precisam estar rodando juntos, sendo assíncrono melhor para o site rodar mais rápido
               data: dados, //Quais dados serão manipulados
               url: 'src/empresa/model/login-empresa.php',//Para onde as informações serão enviadas

               success: function(dados){
                    if(dados.tipo == 'success'){
                         $(location).attr('href', 'controle.html')
                    }else{
                    //SweetAlert
                         Swal.fire({
                              title: 'e-Comanda', //Título
                              text: dados.mensagem, //Mensagem, vindo do PHP
                              icon: dados.tipo, //Ícone que vai aparecer, também vindo do PHP (tipo = success / tipo = error)
                              confirmButtonText: 'OK' //Texto do botão de confirmar
                         })
                    }

               }
          })

     })
})