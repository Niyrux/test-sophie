

const api = fetch('http://localhost:5678/api/works')
    .then(function(res) {
        if (res.ok) {
            return res.json();

        }
    })
    .then(function(value) {
        affichage(value);
        displayImg(value)        
        supprimer(value)
    })
    .catch(function(err) {
        // Une erreur est survenue
    });



function affichage(value) {
    const gallery = document.getElementsByClassName('gallery');
    for (i = 0; i < value.length; i++) {
        let newDiv = document.createElement('figure');
        let img = document.createElement('img');
        let Titre = document.createElement('figcaption');
        img.src = value[i]['imageUrl'];
        img.setAttribute('data-id', value[i]['id']);
        img.crossOrigin = "anonymous"
        Titre.innerHTML = value[i]['title']
        gallery[0].appendChild(newDiv);
        newDiv.appendChild(img);
        newDiv.appendChild(Titre);
        newDiv.className = 'card ';
        newDiv.className += value[i]['id']
        newDiv.className += ' '
        newDiv.className += value[i]['category']['name']
      

    }

}
function afffichageSelect(value) {
    let cate = document.getElementById('select-cat');
    value.forEach(i => { 
        let categoryName = i.name;
            let option = document.createElement('option');
            option.value = i.id;

            option.textContent = categoryName;
            cate.appendChild(option);
          });

    
}


/**************************************** CATEGORIES ***************************************************/


const apifilter = fetch('http://localhost:5678/api/categories')

.then(function(res) {
        if (res.ok) {
            return res.json();

        }
    })
    .then(function(value) {
        button(value)
        afffichageSelect(value)
        filter()
    })
    .catch(function(err) {
    });


function button(value) {
    const containerButton = document.getElementsByClassName('container-filter')
    const gallery = document.getElementsByClassName('gallery');
    for (i = 0; i < value.length; i++) {
        let button = document.createElement('button');
        button.innerHTML = value[i]['name']
        button.className = 'filter '
        button.className += value[i]['name']
        button.style.cursor = 'pointer';
        containerButton[0].appendChild(button)

    }
    let buttons = document.querySelectorAll('.filter');

    buttons.forEach(element => {
      if(key){
        element.style.display='none'
      }
      element.addEventListener('click', e => {
        let isActive = element.classList.contains('active');
        buttons.forEach(button => button.classList.remove('active'));
        if (!isActive) {
          element.classList.add('active');
        }
      });
    });
}

function filter() {
  let buttons = document.querySelectorAll('.filter');
  let cards = document.querySelectorAll('.card');

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      if (button === buttons[0]) { 
        cards.forEach(card => {
          card.style.display = "block"; 
        });
      } else { 
        for (let i = 0; i < cards.length; i++) {
          let cardClasses = cards[i].classList;
          if (cardClasses.contains(button.classList[1])) {
            cards[i].style.display = "block"; 
          } else {
            cards[i].style.display = "none"; 
          } 
        }
      }
    });
  });
}

let modals = document.getElementById('myModal')
let modif = document.getElementById('modifier')
let close = document.getElementById('close')
let close2 = document.getElementById('close2')
let ajouter = document.getElementById('ajouter')
let arrow = document.getElementsByClassName('arrow')
let Secondmodals = document.getElementById('mySecondModal')
if (modif) {
    modif.addEventListener('click', function() {
        modals.style.display = 'block'
    })

    close.addEventListener('click', function() {
        modals.style.display = 'none'
        document.getElementById("avatar").value = "";
        document.getElementById("title").value = "";
        document.getElementById("select-cat").value = "";
    })
}

if (ajouter) {
    ajouter.addEventListener('click', function() {
        Secondmodals.style.display = 'block';
        modals.style.display='none'
    })

    close2.addEventListener('click', function() {
        Secondmodals.style.display = 'none'
        document.getElementById("avatar").value = "";
        document.getElementById("title").value = "";
        document.getElementById("select-cat").value = "";
    })
    arrow[0].addEventListener('click', function() {
        Secondmodals.style.display = 'none';
        modals.style.display = 'block';
    })
}

let key = sessionStorage.getItem('token')

function displayImg(value) {
    let affichageImgs = document.getElementsByClassName('image');
    let test = document.querySelectorAll('figure.card img');
    let dataidimg = [];
    for (let i = 0; i < test.length; i++) {
      dataidimg.push(test[i].getAttribute('data-id'));
    }
    
    for (let i = 0; i < value.length; i++) {
      let newDiv = document.createElement('div');
      let img = document.createElement('img');
      let edit = document.createElement('p');
      let bin = document.createElement('img');
      img.src = value[i]['imageUrl'];
      bin.classList = 'bin';
      bin.setAttribute('data-id', value[i]['id']);
      bin.src = "assets/images/bin.png";
      img.crossOrigin = "anonymous";
      img.style.width = '80px';
      edit.innerHTML = 'éditer';
      newDiv.classList = 'container-edit-img';
      affichageImgs[0].appendChild(newDiv);
      newDiv.appendChild(img);
      newDiv.appendChild(bin);
      newDiv.appendChild(edit);
      let bins = document.querySelectorAll('.bin');
     
      bins.forEach((bin, i) => {
        bin.addEventListener('click', e => {
          e.preventDefault();
          if (e.target === bin) {
            let parentNode = bin.parentNode;
            let id = bin.getAttribute('data-id');
            console.log(id);
            fetch(`http://localhost:5678/api/works/` + id, {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + key,
              }
            }).then(response => {
              if (response.ok) {
                console.log('Objet supprimé avec succès');
                parentNode.remove();
                let index = dataidimg.indexOf(id);
                if (index !== -1) {
                    document.querySelector('img[data-id="' + dataidimg[index] + '"]').parentNode.remove();
                }
              } else {
                console.log('Erreur lors de la suppression de l\'objet');
              }
            }).catch(error => {
              console.log('Erreur lors de la communication avec l\'API : ', error);
            });
          }
        });
      });
    }
  }
  


if (!key) {

    const bandeau = document.getElementById('bandeau-noir');
    const modifier = document.getElementById('modifier');
    const modify = document.querySelectorAll('.modifier');
    console.log(test)
    modify[0].style.display='none';
    modify[1].style.display='none';
    modifier.style.display='none';
    bandeau.style.display='none';
}
if (key){
    const replace = document.getElementById('log-in');
    replace.innerHTML = 'Logout';
  
}

  const fileButton = document.getElementById("avatar");
  fileButton.addEventListener("click", (e)  => {
    e.preventDefault()
    document.getElementById("file-input").click();
  });

   const titleInput = document.getElementById('title');
   const catSelect = document.getElementById('select-cat');
  const fileInput = document.getElementById('file-input');
   const submitButton = document.getElementById('change');
  
  submitButton.disabled = true;
  
  function checkFields() {
    if (titleInput.value && catSelect.value && fileInput.value) {
      submitButton.disabled = false;
      submitButton.style.background = '#1D6154'
    } else {
      submitButton.disabled = true;
    }
  }
  
  titleInput.addEventListener('input', checkFields);
  catSelect.addEventListener('input', checkFields);
  fileInput.addEventListener('input', checkFields);

