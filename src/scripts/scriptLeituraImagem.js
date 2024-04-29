function loadImages() {
    fetch('http://localhost:3000/imagens')
        .then(response => response.json())
        .then(data => {
            const shuffledData = shuffleArray(data);
            data.slice(0, 6).forEach((image, index) => {
                const div = document.getElementById(`img${index + 1}`);
                const img = document.createElement('img');

                img.src = image.url;

                // Adiciona o evento de clique na imagem
                img.addEventListener('click', function() {
                    openImageModal(image.id,image.url, image.titulo, image.autor, image.descricao);
                });
                
                div.appendChild(img);
            });
        })
        .catch(error => console.error('Erro ao carregar JSON:', error));
}

function openImageModal(id, url, titulo, autor, descricao) {
    var modal = document.getElementById('imageModal');
    var idInput = document.getElementById('show-id');
    var urlInput = document.getElementById('edit-url');
    var tituloInput = document.getElementById('edit-titulo');
    var autorInput = document.getElementById('edit-autor');
    var descricaoInput = document.getElementById('edit-descricao');

    idInput.textContent = id; // Atualiza o conteúdo do elemento de texto com o ID
    urlInput.value = url;
    tituloInput.value = titulo;
    autorInput.value = autor;
    descricaoInput.value = descricao;

    modal.style.display = 'block';

    // Adiciona o evento de clique no botão de fechar
    var closeModalBtn = document.getElementsByClassName("close")[1];
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
        clearForm(); 
    }

    // Adiciona o evento de clique fora do modal para fechá-lo
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Event listener para exclusão
    var deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', function() {
        deleteImage(id); // Certifique-se de que a função deleteImage está definida
    });

    // Event listener para atualização
    var updateBtn = document.getElementById('updateBtn');
    updateBtn.addEventListener('click', function() {
        updateImage(id); // Certifique-se de que a função updateImage está definida
    });
}

// Função para deletar uma imagem
function deleteImage(id) {
    fetch(`http://localhost:3000/imagens/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        listImages(); // Atualiza a lista de imagens após a exclusão
        closeModal(); // Fecha o modal após a exclusão
    })
    .catch(error => console.error('Erro ao excluir imagem:', error));
}

// Função para atualizar uma imagem
function updateImage(id) {
    const url = document.getElementById('edit-url').value;
    const titulo = document.getElementById('edit-titulo').value;
    const autor = document.getElementById('edit-autor').value;
    const descricao = document.getElementById('edit-descricao').value;

    if (url.trim() === '' || titulo.trim() === '' || autor.trim() === '' || descricao.trim() === '') {
        alert("Preencha todos os campos para prosseguir com a alteração");
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
            listImages(); // Atualiza a lista de imagens após a atualização
            closeModal(); // Fecha o modal após a atualização
        })
        .catch(error => console.error('Erro ao atualizar imagem:', error));
    }
}

// Função para fechar o modal
function closeModal() {
    var modal = document.getElementById('imageModal');
    modal.style.display = "none";
}
function clearForm() {
    var urlInput = document.getElementById('edit-url');
    var tituloInput = document.getElementById('edit-titulo');
    var autorInput = document.getElementById('edit-autor');
    var descricaoInput = document.getElementById('edit-descricao');

    urlInput.value = '';
    tituloInput.value = '';
    autorInput.value = '';
    descricaoInput.value = '';
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

    const url = document.getElementById('edit-url').value
    const titulo = document.getElementById('edit-titulo').value
    const autor = document.getElementById('edit-autor').value
    const descricao = document.getElementById('edit-descricao').value

    if(url.trim() === '' || titulo.trim() === '' || autor.trim() === '' || descricao.trim() === ''){
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

function shuffleImages() {
    // Seleciona todos os containers de imagens
    const containers = document.querySelectorAll('.container');

    // Para cada container, aleatoriza a ordem das imagens dentro deles
    containers.forEach(container => {
        // Seleciona a imagem dentro do container
        const img = container.querySelector('img');
        
        // Gera um número aleatório entre 1 e 6 (número de containers)
        const randomIndex = Math.floor(Math.random() * 6) + 1;

        // Seleciona um container aleatório
        const randomContainer = document.getElementById(`img${randomIndex}`);

        // Move a imagem para o container aleatório
        randomContainer.appendChild(img);
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
listImages()