//Código do DataTable
$(document).ready(function() {
    $('#table-empresa').DataTable({ //Dá a funcionalidade 'DataTable' para a tabela empresa
        "processing": true, //Como está no true, ele tem que processar no servidor
        "serverSide": true, //Processa "por trás" do servidor
        "ajax": {
            "url": "src/empresa/model/list-empresa.php", //Onde o arquivo está
            "type": "POST" //Como ele vai ser enviado
        },
        "language": {
            "url": "libs/DataTables/pt_br.json" //Traduz o DataTable para português
        },
        "columns": [{ //Define as colunas que a tabela vai ter (especificada anteriormente no php)
                "data": 'ID', //O nome da coluna
                "className": 'text-center' //Classe CSS que vai ser utilizada nessa coluna, 'text-center' sendo uma classe do Bootstrap
            },
            {
                "data": 'NOME',
                "className": 'text-center'
            },
            {
            //Refaz a coluna ID novamente para que as ações funcionem
                "data": 'ID',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    //Todos os botões tem o mesmo ID (${data}), já que todos eles irão buscar as informações no php, assim como a criação de outras classes falsas (btn-view/edit/delete) para mais especificações
                    return `
                    <button id="${data}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button id="${data}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash"></i></button>
                    `
                }
            }
        ]
    })
})