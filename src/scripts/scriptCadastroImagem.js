// imagens banco de dados
const imageForm = document.getElementById('image-form')
const imageList = document.getElementById('image-list')


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

function deleteImage(id) {
    fetch(`http://localhost:3000/imagens/${id}`, {
        method: 'DELETE'
    })
        .then(() => listImages())
        .catch(error => console.error('Erro', error))
}

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
                imageForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listImages()