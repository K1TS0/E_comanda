$(document).ready(function(){

     $('#table-cliente').on('click', 'button.btn-delete', function(e) {
          e.preventDefault()

          /*Sinal de crase (``) > Easter Egg no javascript > Quando você quer inserir uma informação muito grande que vai emplementar uma variável no JS
          ${} > Inclusão de um código JS puro, no caso pegando o btn-save e seu atributo data-operation
          ID=${$(this).attr('id')} > O ID vai receber o atributo id do elemento clicado
          */
          let ID = `ID=${$(this).attr('id')}`

          //"Tem certeza que quer fazer isso?" com o SweetAlert
          Swal.fire({
               title: 'e-Comanda',
               text: 'Deseja realmente excluir este registro?',
               icon: 'question',
               showCancelButton: true, //Pode desistir da operação
               confirmButtonText: 'Sim',
               cancelButtonText: 'Não'
          }).then(result => { //.then > Tipo um 'if', "Se o resultado for valido..."
               if (result.value) { //Quando o botão confirm é clicado, ele ganha o value 'true'
                    $.ajax({
                         type: 'POST', //Como a informação vai ser mandada para o php (GET ou POST)
                         dataType: 'json', //O retorno que o PHP ta esperando
                         assync: true, //Se o comando vai ser assíncrono ou não, ou seja, se for assíncrono, o frontend vai ser executado, e o backend vai estar sendo processado e só depois vai ser executado, se for síncrono, ambos precisam estar rodando juntos, sendo assíncrono melhor para o site rodar mais rápido
                         data: ID, //Quais dados serão manipulados
                         url: 'src/cliente/model/delete-cliente.php',//Para onde as informações serão enviadas
                         success: function(dados){
                                   //SweetAlert
                              Swal.fire({
                                   title: 'e-Comanda', //Título
                                   text: dados.mensagem, //Mensagem, vindo do PHP
                                   icon: dados.tipo, //Ícone que vai aparecer, também vindo do PHP (tipo = success / tipo = error)
                                   confirmButtonText: 'OK' //Texto do botão de confirmar
                                   })
                              $('#table-cliente').DataTable().ajax.reload() //Atualiza a tabela com as informações salvas
                         }
                    })
               }
          })
     })
})