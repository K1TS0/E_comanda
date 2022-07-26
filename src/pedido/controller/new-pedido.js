/* jQuery sempre começa com uma função para desenvolver algo */
$(document).ready(function(){

     $('.btn-new').click(function(e){
          e.preventDefault();

          //Limpando as coisas dentro do modal
          $('.modal-title').empty()
          $('.modal-body').empty()

          //.append > Adicionar algo novo
          $('.modal-title').append('Adicionar novo pedido')

          //Carrega o form
          $('.modal-body').load('src/pedido/view/form-pedido.html', function(){
          //function() > Para carregar os dados dos 'all' e coloca-los no select

               $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    assync: true,
                    url: 'src/cliente/model/all-cliente.php',

                    success: function(dados){
                         /*Para que ele percorra pelo $resultado e atribuir para algum lugar
                         const result of dados > A constante result só vai existir enquanto dados também existir no laço
                         */
                         for(const result of dados){

                              /*Os clientes estão dentro do select #CLIENTE_ID
                              .append > Adicionar algo novo
                              Sinal de crase (``) > Easter Egg no javascript > Quando você quer inserir uma informação muito grande que vai emplementar uma variável no JS
                              ${} > Inclusão de um código JS puro, no caso pegando o btn-save e seu atributo data-operation

                              >>Os clientes devem aparecer dentro do option, por isso o ${result.NOME}, já o value está pegando o ID do cliente
                              */
                              $('#CLIENTE_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                         }
                    }
               })

          })

          //Garante que o botão save aparece
          $('.btn-save').show()

          /*.attr > Adiciona um novo atributo, qual vai aparecer quando se inspeciona o botão porém não no html
          'data-operation' > Variável dentro do html que podem ser alteradas depois
          */
          $('.btn-save').attr('data-operation', 'insert')
                    
          //Só aparece quando é clicado
          $('#modal-pedido').modal('show')
     })
})