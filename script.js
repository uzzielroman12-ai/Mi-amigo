const pages = document.querySelectorAll('.page');

const openPage = (id) => {
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);

  /* Si sales de canciones, se detiene el video y el disco */
  if (id !== 'playlist') {
    const youtubePlayer = document.getElementById('youtubePlayer');
    const vinyl = document.getElementById('vinyl');

    if (youtubePlayer) {
      youtubePlayer.src = "";
    }

    if (vinyl) {
      vinyl.classList.remove('playing');
    }
  }
};

document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', () => {
    openPage(button.dataset.page);
  });
});

document.querySelectorAll('.back').forEach(button => {
  button.addEventListener('click', () => {
    openPage('home');
  });
});

/* CONTADOR */
/* Fecha en la que empezaron a ser amigos */
const startDate = new Date('2025-12-28T00:00:00');

function updateCounter() {
  const now = new Date();

  let diff = Math.max(0, now - startDate);

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;

  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;

  const minutes = Math.floor(diff / 60000);
  diff %= 60000;

  const seconds = Math.floor(diff / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCounter();
setInterval(updateCounter, 1000);

/* REPRODUCTOR CON YOUTUBE */
const youtubePlayer = document.getElementById('youtubePlayer');
const vinyl = document.getElementById('vinyl');
const discImage = document.getElementById('discImage');
const songTitle = document.getElementById('songTitle');
const dedicationText = document.getElementById('dedicationText');
const songButtons = document.querySelectorAll('.song-btn');

/* Permite pegar links completos de YouTube */
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  return url;
}

songButtons.forEach(button => {
  button.addEventListener('click', () => {
    const title = button.dataset.title;
    const youtubeLink = button.dataset.youtube;
    const youtubeId = getYouTubeId(youtubeLink);
    const cover = button.dataset.cover;
    const dedication = button.dataset.dedication;

    songButtons.forEach(btn => btn.classList.remove('active-song'));
    button.classList.add('active-song');

    songTitle.textContent = title;
    discImage.src = cover;
    dedicationText.textContent = dedication;

    youtubePlayer.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

    vinyl.classList.add('playing');
  });
});

/* ¿? */
const message = document.getElementById('gameMessage');

document.getElementById('yesBtn').addEventListener('click', () => {
  message.innerHTML = `
    ¿Por qué? 😭 Si ya sabes que estoy bien culero jajaja.
    Tú mereces a alguien que te cuide bonito, que te valore todos los días
    y que te haga sentir seguro. Aun así, gracias por existir,
    por hacerme feliz y por ser tan especial para mí. 💚
  `;
});

document.getElementById('noBtn').addEventListener('click', () => {
  message.innerHTML = `
    Elegiste la mejor opción 😌.
    Te deseo mucha suerte encontrando a alguien que te quiera bonito,
    que te cuide, que te haga reír y que vea lo la gran persona que eres.
    Aunque no sea yo, siempre voy a querer que estés bien y seas feliz. 💚
  `;
});