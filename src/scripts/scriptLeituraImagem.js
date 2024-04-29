function loadImages() {
    fetch('http://localhost:3000/imagens')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 4).forEach((image, index) => {
                const div = document.getElementById(`img${index + 1}`)
                const img = document.createElement('img')

                img.src = image.url

                div.appendChild(img)
            })
        })
        .catch(error => console.error('Erro ao carregar JSON:', error))
}

// fazer toda essa porra aqui 

document.getElementById('img1').addEventListener('click', function () {
    fetch('http://localhost:3000/imagens')
        .then(response => response.json())
        .then(data => {
            const image = data.find(image => image.id === 1);
            if (image) {
                alert(`ID: ${image.id}\nTítulo: ${image.titulo}\nAutor: ${image.autor}\nDescrição: ${image.descricao}`);
            } else {
                console.log("Imagem não encontrada.");
            }
        })
        .catch(error => console.error('Erro:', error));
});

document.getElementById('img2').addEventListener('click', function () {
    fetch('http://localhost:3000/imagens')
    .then(response => response.json())
    .then(data => {
        const image = data.find(image => image.id === 2);
        if (image) {
            alert(`ID: ${image.id}\nTítulo: ${image.titulo}\nAutor: ${image.autor}\nDescrição: ${image.descricao}`);
        } else {
            console.log("Imagem não encontrada.");
        }
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('img3').addEventListener('click', function () {
    fetch('http://localhost:3000/imagens')
    .then(response => response.json())
    .then(data => {
        const image = data.find(image => image.id === 3);
        if (image) {
            alert(`ID: ${image.id}\nTítulo: ${image.titulo}\nAutor: ${image.autor}\nDescrição: ${image.descricao}`);
        } else {
            console.log("Imagem não encontrada.");
        }
    })
    .catch(error => console.error('Erro:', error));
});

document.getElementById('img4').addEventListener('click', function () {
    fetch('http://localhost:3000/imagens')
    .then(response => response.json())
    .then(data => {
        const image = data.find(image => image.id === 4);
        if (image) {
            alert(`ID: ${image.id}\nTítulo: ${image.titulo}\nAutor: ${image.autor}\nDescrição: ${image.descricao}`);
        } else {
            console.log("Imagem não encontrada.");
        }
    })
    .catch(error => console.error('Erro:', error));
});

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