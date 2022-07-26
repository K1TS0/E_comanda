$(document).ready(function(){

     /*Como o botão está dentro da tabela, é preciso monitorar a tal também, utilizando o '.on'
     on('click', 'button.btn-view') > Vai monitorar o clique no botão com a classe btn-view
     */
     $('#table-cliente').on('click', 'button.btn-edit', function(e){
          e.preventDefault()

          //Limpando as coisas dentro do modal
          $('.modal-title').empty()
          $('.modal-body').empty()

          $('.modal-title').append('Edição de registro')

          /*Sinal de crase (``) > Easter Egg no javascript > Quando você quer inserir uma informação muito grande que vai emplementar uma variável no JS
          ${} > Inclusão de um código JS puro, no caso pegando o btn-save e seu atributo data-operation
          ID=${$(this).attr('id')} > O ID vai receber o atributo id do elemento clicado
          */
          let ID = `ID=${$(this).attr('id')}`

          $.ajax({
               type: 'POST',
               dataType: 'json',
               assync: true,
               data: ID,
               url: 'src/cliente/model/view-cliente.php',

               success: function(dado) {
                    //Se tudo ocorrer corretamente
                    if(dado.tipo == 'success'){
                         //Vai abrir o formulário no modal junto com os dados
                         $('.modal-body').load('src/cliente/view/form-cliente.html', function(){
                              /*#NOME > vem do ID da list-cliente
                              val(dado.dados.NOME) > Esse campo vai receber um valor, onde a variável 'dado' (criada nesse arquivo) vai receber o valor localizado no PHP (view-cliente.php) na variável 'dados', pegando o valor 'NOME'
                              */
                              $('#NOME').val(dado.dados.NOME)
                              $('#TELEFONE').val(dado.dados.TELEFONE)
                              $('#ID').val(dado.dados.ID) //Para atribuir o ID também
                         })

                         $('.btn-save').show() //Mostra o botão salvar
                         $('.btn-save').removeAttr('data-operation') //Para tirar o atributo 'data-operation' e não correr o risco de dobrar registros, e também para atualizar o registro atual ao invés de criar um novo

                         $('#modal-cliente').modal('show') //Para aparecer o modal
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