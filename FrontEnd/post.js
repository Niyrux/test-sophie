const form = document.getElementById('form-envoi');
const img = document.getElementById('file-input');
const title = document.getElementById('title');
const select = document.getElementById('select-cat');
const gallery = document.getElementsByClassName('gallery');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    let Formdata = new FormData();
    Formdata.append('image', img.files[0]);
    Formdata.append('title', title.value);
    Formdata.append('category', select.value);

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: Formdata,
      headers: {
        'Authorization': 'Bearer ' + key,
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Erreur lors de l\'envoi des données');
      }
    })
    .then(data => {
      let div = document.createElement('div');
      div.classList.add('gallery-item');
      
      let p = document.createElement('p');
      p.textContent = data.title;
      
      let img = document.createElement('img');
      img.setAttribute('src', data.imageUrl);
      img.crossOrigin = 'anonymous';
      
      div.appendChild(img);
      div.appendChild(p);
      
      gallery[0].appendChild(div);
      
      console.log('Données envoyées avec succès');
    })
    .catch(error => {
      console.log('Erreur lors de la communication avec l\'API : ', error);
    });

  })
}

const deleteImg = document.getElementById('avatar')
const disparait = document.getElementById('disparait')
const imgPreview = document.querySelector('#mySecondModal #test');
const inputFile = document.getElementById('file-input');
const test = document.getElementById('test')
inputFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    imgPreview.src = objectURL;
    img.style.opacity = '0';
    imgPreview.style.display = 'flex';
    imgPreview.style.margin = 'auto';
    imgPreview.style.width = '129px';
    imgPreview.style.height = '169px';
    imgPreview.style.objectFit  = 'contain';
    deleteImg.style.display = 'none';
    disparait.style.display = 'none';
});
const change = document.getElementById('change')

    if(img.files.length > 0 && title.value != "" && select.value != "")  {
        change.style.background='#1D6154'
    }


