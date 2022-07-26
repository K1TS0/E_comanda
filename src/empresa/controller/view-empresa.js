$(document).ready(function(){

     /*Como o botão está dentro da tabela, é preciso monitorar a tal também, utilizando o '.on'
     on('click', 'button.btn-view') > Vai monitorar o clique no botão com a classe btn-view
     */
     $('#table-empresa').on('click', 'button.btn-view', function(e){
          e.preventDefault()

          //Limpando as coisas dentro do modal
          $('.modal-title').empty()
          $('.modal-body').empty()

          $('.modal-title').append('Visualização de registro')

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
               url: 'src/empresa/model/view-empresa.php',

               success: function(dado) {
                    //Se tudo ocorrer corretamente
                    if(dado.tipo == 'success'){
                         //Vai abrir o formulário no modal junto com os dados
                         $('.modal-body').load('src/empresa/view/form-empresa.html', function(){
                              /*#NOME > vem do ID da list-empresa
                              val(dado.dados.NOME) > Esse campo vai receber um valor, onde a variável 'dado' (criada nesse arquivo) vai receber o valor localizado no PHP (view-empresa.php) na variável 'dados', pegando o valor 'NOME'
                              */
                              $('#NOME').val(dado.dados.NOME)
                              $('#NOME').attr('readonly', 'true') //Coloca o atributo 'readonly' para que só seja possível ler a informação e não alterá-la

                              $('#LOGIN').val(dado.dados.LOGIN)
                              $('#LOGIN').attr('readonly', 'true')

                              $('#SENHA').val(dado.dados.SENHA)
                              $('#SENHA').attr('readonly', 'true')
                         })

                         $('.btn-save').hide() //Esconde o botão de salvar para não dar erro

                         $('#modal-empresa').modal('show') //Para aparecer o modal
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