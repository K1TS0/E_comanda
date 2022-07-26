/* jQuery sempre começa com uma função para desenvolver algo */
$(document).ready(function() {
     
     //Quando clicar num link com a classe "nav-link", vai entrar nessa função
     $('.nav-link').click(function(e){
          e.preventDefault() //preventDefault > Previne que o link resete a página inteira, pradrão do html

          let url = $(this).attr('href') //Previne que a url mude

          $('#content').empty() //Limpa o conteúdo do meio da página (definido pelo id 'content')

          $('#content').load(url) //Coloca esse link dentro desse conteúdo
     })
})
