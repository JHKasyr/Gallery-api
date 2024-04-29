function loadImages() {
    fetch('http://localhost:3000/imagens')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 6).forEach((image, index) => {
                const div = document.getElementById(`img${index + 1}`);
                const img = document.createElement('img');

                img.src = image.url;

                // Adiciona o evento de clique na imagem
                img.addEventListener('click', function() {
                    openImageModal(image.url, image.titulo, image.autor, image.descricao);
                });

                div.appendChild(img);
            });
        })
        .catch(error => console.error('Erro ao carregar JSON:', error));
}

// Função para abrir o modal com os detalhes da imagem
function openImageModal(url, titulo, autor, descricao) {
    var modal = document.getElementById('imageModal');
    var urlInput = document.getElementById('edit-url');
    var tituloInput = document.getElementById('edit-titulo');
    var autorInput = document.getElementById('edit-autor');
    var descricaoInput = document.getElementById('edit-descricao');

    urlInput.value = url;
    tituloInput.value = titulo;
    autorInput.value = autor;
    descricaoInput.value = descricao;

    modal.style.display = 'block';

    // Adiciona o evento de clique no botão de fechar
    var closeModalBtn = document.getElementsByClassName("close")[1];
    closeModalBtn.onclick = function() {
      modal.style.display = "none";
    }

    // Adiciona o evento de clique fora do modal para fechá-lo
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
//-----------------------------------------------------------------------------------------------------------------------

// Get the modal
var modal = document.getElementById('modalCadastro');

// Get the button that opens the modal
var btn = document.getElementById('openModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// CRUD ABAIXO

// imagens banco de dados
const imageForm = document.getElementById('image-form')
const imageList = document.getElementById('image-list')
const imageModal = document.getElementById('edit-image-form')


// submit (GET)
imageForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const url = document.getElementById('url').value
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const descricao = document.getElementById('descricao').value

    fetch('http://localhost:3000/imagens',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, titulo: titulo, autor: autor, descricao: descricao }),
    })
        .then(response => response.json())
        .then(() => {
            listImages()
            imageForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//crud no modal
imageModal.addEventListener('submit', (e)=> {
    fetch(`http://localhost:3000/imagens/${id}`, {
        method: 'DELETE'
    })
        .then(() => listImages())
        .catch(error => console.error('Erro', error))
})

function updateImage(id){

    const url = document.getElementById('url').value
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const descricao = document.getElementById('descricao').value

    if(url.trim() === '' && titulo.trim() === '' && autor.trim() === '' && descricao.trim() === ''){
        alert("Preencha ao menos um dos campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/imagens/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url, titulo: titulo, autor: autor, descricao: descricao }),
        })
            .then(response => response.json())
            .then(() => {
                listImages()
                imageModal.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listImages()