$(document).ready(function() {

     //Monitorar os cliques do botão 'btn-logout'
     $('.btn-logout').click(function(e) {
          e.preventDefault()

          //Chama o php e mandar ele executar
          $.ajax({
               type: 'POST', //Como a informação vai ser mandada para o php (GET ou POST)
               dataType: 'json', //O retorno que o PHP ta esperando
               assync: true, //Se o comando vai ser assíncrono ou não, ou seja, se for assíncrono, o frontend vai ser executado, e o backend vai estar sendo processado e só depois vai ser executado, se for síncrono, ambos precisam estar rodando juntos, sendo assíncrono melhor para o site rodar mais rápido
               url: 'src/empresa/model/logout-empresa.php',//Para onde as informações serão enviadas

               success: function(dados){
                    if(dados.tipo == 'success'){
                         $(location).attr('href', 'index.html')
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