$(document).ready(function() {
     $.ajax({
               type: 'POST', //Como a informação vai ser mandada para o php (GET ou POST)
               dataType: 'json', //O retorno que o PHP ta esperando
               assync: true, //Se o comando vai ser assíncrono ou não, ou seja, se for assíncrono, o frontend vai ser executado, e o backend vai estar sendo processado e só depois vai ser executado, se for síncrono, ambos precisam estar rodando juntos, sendo assíncrono melhor para o site rodar mais rápido
               //data: dados, > Não precisa dos dados já que o validate não vai receber nenhuma variável
               url: 'src/empresa/model/validate-empresa.php',//Para onde as informações serão enviadas

               success: function(dados){

                    if(dados.tipo == 'success'){
                         //SweetAlert
                         Swal.fire({
                              title: 'e-Comanda', //Título
                              text: dados.mensagem, //Mensagem, vindo do PHP
                              icon: dados.tipo, //Ícone que vai aparecer, também vindo do PHP (tipo = success / tipo = error)
                              confirmButtonText: 'OK' //Texto do botão de confirmar
                         })
                    }else if(dados.tipo == 'error'){
                         /*location > Comando padrão do jQuery > Faz redirecionamento
                         attr('href', 'index.html') > Redireciona para o index.html
                         */
                         $(location).attr('href', 'index.html')
                    }

               }
          })
})