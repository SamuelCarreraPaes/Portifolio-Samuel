const data = window.PAES_LINKEDIN_REVIEW;
const statPosts = document.getElementById("statPosts");
const statAssets = document.getElementById("statAssets");
const statEvidence = document.getElementById("statEvidence");
const headlineList = document.getElementById("headlineList");
const assetGrid = document.getElementById("assetGrid");
const pillarFilter = document.getElementById("pillarFilter");
const postList = document.getElementById("postList");
const carouselList = document.getElementById("carouselList");
const copyAssets = document.getElementById("copyAssets");
const saveNotes = document.getElementById("saveNotes");
const notes = document.getElementById("notes");
const status = document.getElementById("status");

statPosts.textContent = data.posts.length;
statAssets.textContent = data.assets.length;
statEvidence.textContent = data.evidenceCount;

data.headlines.forEach((headline) => {
  const item = document.createElement("li");
  item.textContent = headline;
  headlineList.appendChild(item);
});

data.assets.forEach((asset) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `<img src="../${asset.final}" alt="Ativo ${asset.title}"><h3>${asset.title}</h3><p>${asset.source}</p>`;
  assetGrid.appendChild(card);
});

[...new Set(data.posts.map((post) => post.pilar))].forEach((pillar) => {
  const option = document.createElement("option");
  option.value = pillar;
  option.textContent = pillar;
  pillarFilter.appendChild(option);
});

function renderPosts() {
  postList.innerHTML = "";
  data.posts
    .filter((post) => pillarFilter.value === "all" || post.pilar === pillarFilter.value)
    .forEach((post) => {
      const item = document.createElement("article");
      item.className = "post";
      item.innerHTML = `<h3>${post.id} · ${post.title}</h3><p><strong>${post.hook}</strong></p><p>${post.body}</p><p>CTA: ${post.cta}</p><button type="button" data-copy="${post.id}">Copiar</button>`;
      postList.appendChild(item);
    });
}

pillarFilter.addEventListener("change", renderPosts);
renderPosts();

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const post = data.posts.find((item) => item.id === button.dataset.copy);
  await navigator.clipboard.writeText(`${post.hook}\n\n${post.body}\n\n${post.cta}`);
  status.textContent = `Copiado: ${post.id}`;
});

data.carousels.forEach((carousel) => {
  const item = document.createElement("article");
  item.className = "post";
  item.innerHTML = `<h3>${carousel.id} · ${carousel.title}</h3><ol>${carousel.pages.map((page) => `<li>${page}</li>`).join("")}</ol>`;
  carouselList.appendChild(item);
});

copyAssets.addEventListener("click", async () => {
  await navigator.clipboard.writeText(data.assets.map((asset) => `${asset.title}: ${asset.final}`).join("\n"));
  status.textContent = "Lista de ativos copiada";
});

saveNotes.addEventListener("click", () => {
  localStorage.setItem("paesLinkedinNotes", notes.value);
  status.textContent = "Observações salvas";
});

notes.value = localStorage.getItem("paesLinkedinNotes") || "";
