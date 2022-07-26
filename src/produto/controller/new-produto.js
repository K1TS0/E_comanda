/* jQuery sempre começa com uma função para desenvolver algo */
$(document).ready(function(){

     $('.btn-new').click(function(e){
          e.preventDefault();

          //Limpando as coisas dentro do modal
          $('.modal-title').empty()
          $('.modal-body').empty()

          //.append > Adicionar algo novo
          $('.modal-title').append('Adicionar novo produto')

          //Carrega o form
          $('.modal-body').load('src/produto/view/form-produto.html')

          //Garante que o botão save aparece
          $('.btn-save').show()

          /*.attr > Adiciona um novo atributo, qual vai aparecer quando se inspeciona o botão porém não no html
          'data-operation' > Variável dentro do html que podem ser alteradas depois
          */
          $('.btn-save').attr('data-operation', 'insert')
                    
          //Só aparece quando é clicado
          $('#modal-produto').modal('show')
     })
})