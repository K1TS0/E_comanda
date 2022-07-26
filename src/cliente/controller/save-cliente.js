$(document).ready(function() {
     $('.btn-save').click(function(e) {
          e.preventDefault()

          /*Só para ver se o botão está funcionando
          alert('Você clicou no botão salvar')*/

          /* dados > Variável que vai pegar todos os dados digitados no form
          .serialize() > Transforma esses dados em um array 
          */
          let dados = $('#form-cliente').serialize();

          /*Sinal de crase (``) > Easter Egg no javascript > Quando você quer inserir uma informação muito grande que vai emplementar uma variável no JS
          ${} > Inclusão de um código JS puro, no caso pegando o btn-save e seu atributo data-operation
          */
          dados += `&operacao=${$('.btn-save').attr('data-operation')}`

          //Chama o php e mandar ele executar
          $.ajax({
               type: 'POST', //Como a informação vai ser mandada para o php (GET ou POST)
               dataType: 'json', //O retorno que o PHP ta esperando
               assync: true, //Se o comando vai ser assíncrono ou não, ou seja, se for assíncrono, o frontend vai ser executado, e o backend vai estar sendo processado e só depois vai ser executado, se for síncrono, ambos precisam estar rodando juntos, sendo assíncrono melhor para o site rodar mais rápido
               data: dados, //Quais dados serão manipulados
               url: 'src/cliente/model/save-cliente.php',//Para onde as informações serão enviadas

               //Se tudo isso der certo, essa manipulação vai acontecer, qual recebe os dados do save-cliente.php
               success: function(dados){
                    //SweetAlert
                    Swal.fire({
                         title: 'e-Comanda', //Título
                         text: dados.mensagem, //Mensagem, vindo do PHP
                         icon: dados.tipo, //Ícone que vai aparecer, também vindo do PHP (tipo = success / tipo = error)
                         confirmButtonText: 'OK' //Texto do botão de confirmar
                    })
                    $('#modal-cliente').modal('hide') //Esconde o modal
                    $('#table-cliente').DataTable().ajax.reload() //Atualiza a tabela com as informações salvas
               }
          })
     })
})