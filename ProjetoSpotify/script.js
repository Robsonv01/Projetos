// ====== DADOS INICIAIS ======
let artists = JSON.parse(localStorage.getItem("artists")) || [];
let albums = JSON.parse(localStorage.getItem("albums")) || [];

// ====== ELEMENTOS ======
const artistsGrid = document.querySelector(".artists-grid");
const albumsGrid = document.querySelector(".albums-grid");
const searchInput = document.querySelector("input");

// ====== SALVAR NO LOCALSTORAGE ======
function saveData() {
  localStorage.setItem("artists", JSON.stringify(artists));
  localStorage.setItem("albums", JSON.stringify(albums));
}

// ====== RENDER ARTISTAS ======
function renderArtists(list = artists) {
  artistsGrid.innerHTML = "";

  list.forEach((artist, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${artist.image}" onerror="this.src='https://via.placeholder.com/150'" />

      <div class="play-btn">
        <i class="fa-solid fa-play"></i>
      </div>

      <h4>${artist.name}</h4>
      <p>Artista</p>

      <div class="actions">
        <button onclick="editArtist(${index})">✏️</button>
        <button onclick="deleteArtist(${index})">🗑️</button>
        <button onclick="downloadImage('${artist.image}')">⬇️</button>
      </div>
    `;

    artistsGrid.appendChild(card);
  });
}
// ====== RENDER ALBUNS ======
function renderAlbums(list = albums) {
  albumsGrid.innerHTML = "";

  list.forEach((album, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h4>${album.name}</h4>
      <p>${album.artist}</p>
      <button onclick="editAlbum(${index})">Editar</button>
      <button onclick="deleteAlbum(${index})">Excluir</button>
    `;

    albumsGrid.appendChild(card);
  });
}

// ====== CREATE ======
function addArtist() {
  const name = prompt("Nome do artista:");
  const image = prompt("URL da imagem do artista:");

  if (!name || !image) return;

  artists.push({ name, image });
  saveData();
  renderArtists();
}

function addAlbum() {
  const name = prompt("Nome do álbum:");
  const artist = prompt("Nome do artista:");

  const image = prompt("Cole a URL da imagem OU use um link da internet:");

  if (!name || !artist) return;

  albums.push({
    name,
    artist,
    image: image || "https://via.placeholder.com/150",
  });

  saveData();
  renderAlbums();
}
// ====== UPDATE ======
function editArtist(index) {
  const newName = prompt("Novo nome:", artists[index].name);
  const newImage = prompt("Nova imagem:", artists[index].image);

  if (!newName) return;

  artists[index] = {
    name: newName,
    image: newImage || artists[index].image,
  };

  saveData();
  renderArtists();
}

function editAlbum(index) {
  const newName = prompt("Novo nome do álbum:", albums[index].name);
  const newArtist = prompt("Novo artista:", albums[index].artist);

  if (!newName || !newArtist) return;

  albums[index] = { name: newName, artist: newArtist };
  saveData();
  renderAlbums();
}

// ====== DELETE ======
function deleteArtist(index) {
  if (!confirm("Excluir artista?")) return;

  artists.splice(index, 1);
  saveData();
  renderArtists();
}

function deleteAlbum(index) {
  if (!confirm("Excluir álbum?")) return;

  albums.splice(index, 1);
  saveData();
  renderAlbums();
}

// ====== SEARCH ======
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(value)
  );

  const filteredAlbums = albums.filter((a) =>
    a.name.toLowerCase().includes(value)
  );

  renderArtists(filteredArtists);
  renderAlbums(filteredAlbums);
});

// ====== BOTÕES (CRIAR DINAMICAMENTE) ======
const content = document.querySelector(".content");

const addArtistBtn = document.createElement("button");
addArtistBtn.innerText = "Adicionar Artista";
addArtistBtn.onclick = addArtist;

const addAlbumBtn = document.createElement("button");
addAlbumBtn.innerText = "Adicionar Álbum";
addAlbumBtn.onclick = addAlbum;

content.prepend(addAlbumBtn);
content.prepend(addArtistBtn);

// ====== INIT ======
renderArtists();
function renderAlbums(list = albums) {
  albumsGrid.innerHTML = "";

  list.forEach((album, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${album.image}" onerror="this.src='https://via.placeholder.com/150'" />
      
      <div class="play-btn">
        <i class="fa-solid fa-play"></i>
      </div>

      <h4>${album.name}</h4>
      <p>${album.artist}</p>

      <div class="actions">
        <button onclick="editAlbum(${index})">✏️</button>
        <button onclick="deleteAlbum(${index})">🗑️</button>
        <button onclick="downloadImage('${album.image}')">⬇️</button>
      </div>
    `;

    albumsGrid.appendChild(card);
  });
}
function downloadImage(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "album.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
