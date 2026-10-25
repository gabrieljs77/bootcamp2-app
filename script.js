/* =========================================================
   Pokédex — lógica da aplicação
   API: PokéAPI  (https://pokeapi.co/api/v2/pokemon/{nome-ou-id})
   ========================================================= */
// Conectando com o Supabase
const supabaseUrl = 'https://edkldthpcbbtncxqjtzq.supabase.co';
const supabaseKey = 'sb_publishable__YC4reEpsydGFkwbXjKXCw_7ZHtalID';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função para salvar o favorito
async function favoritarPokemon(nomeDoPokemon) {
  const { data, error } = await supabase
    .from('pokemons_favoritos')
    .insert([{ nome: nomeDoPokemon }]);

  if (error) {
    alert("Erro ao salvar!");
    console.log(error);
  } else {
    alert(nomeDoPokemon + " foi salvo nos favoritos!");
  }
}
const campo = document.getElementById("campo-busca");
const botaoBuscar = document.getElementById("botao-buscar");
const botaoSorte = document.getElementById("botao-sorte");
const tela = document.getElementById("resultado");

const TOTAL_DE_POKEMON = 1025;

// Nomes dos atributos como vêm da API -> como mostramos na tela
const NOMES_DOS_STATS = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defesa",
};

/* ---------------------------------------------------------
   1) Consulta à API
   --------------------------------------------------------- */

async function buscarPokemon(termo) {
  mostrarAviso("Consultando a Pokédex...");

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

    // 404 = a API respondeu, mas esse Pokémon não existe
    if (resposta.status === 404) {
      mostrarAviso(
        "Nenhum Pokémon com esse nome",
        "Confira a grafia ou tente um número entre 1 e " + TOTAL_DE_POKEMON + "."
      );
      return;
    }

    // Qualquer outro código fora da faixa 200 = problema no servidor
    if (!resposta.ok) {
      mostrarAviso(
        "A PokéAPI não respondeu",
        "O serviço pode estar fora do ar. Tente de novo em alguns instantes."
      );
      return;
    }

    const dados = await resposta.json();
    exibirPokemon(dados);

  } catch (erro) {
    // Cai aqui quando não há internet ou a requisição falha antes de responder
    console.error(erro);
    mostrarAviso(
      "Sem conexão com a PokéAPI",
      "Verifique sua internet e tente buscar novamente."
    );
  }
}

/* ---------------------------------------------------------
   2) Montagem do resultado na tela
   --------------------------------------------------------- */

function exibirPokemon(dados) {
  const numero = String(dados.id).padStart(3, "0");
  const altura = (dados.height / 10).toFixed(1).replace(".", ",");  // decímetros -> metros
  const peso = (dados.weight / 10).toFixed(1).replace(".", ",");    // hectogramas -> quilos
  const habilidade = dados.abilities[0].ability.name.replace("-", " ");

  const imagem =
    dados.sprites.other["official-artwork"].front_default ||
    dados.sprites.front_default;

  const tipos = dados.types
    .map((item) => `<li class="tipo tipo--${item.type.name}">${item.type.name}</li>`)
    .join("");

  const stats = dados.stats
    .filter((item) => NOMES_DOS_STATS[item.stat.name])
    .map((item) => {
      const largura = Math.min((item.base_stat / 150) * 100, 100);
      return `
        <div class="stat">
          <span>${NOMES_DOS_STATS[item.stat.name]}</span>
          <span class="stat__barra">
            <span class="stat__preenchimento" style="width: ${largura}%"></span>
          </span>
          <span class="stat__valor">${item.base_stat}</span>
        </div>`;
    })
    .join("");

  tela.innerHTML = `
    <article class="cartao">
      <img class="cartao__sprite" src="${imagem}" alt="Ilustração de ${dados.name}">
      <p class="cartao__numero">Nº ${numero}</p>
      <h2 class="cartao__nome">${dados.name}</h2>
      <ul class="tipos">${tipos}</ul>
      <dl class="dados">
        <div><dt>Altura</dt><dd>${altura} m</dd></div>
        <div><dt>Peso</dt><dd>${peso} kg</dd></div>
        <div><dt>Habilidade</dt><dd>${habilidade}</dd></div>
      </dl>
      <div class="stats">${stats}</div>
    </article>`;
}

function mostrarAviso(titulo, detalhe = "") {
  tela.innerHTML = `
    <p class="aviso">
      <strong>${titulo}</strong>
      ${detalhe}
    </p>`;
}

/* ---------------------------------------------------------
   3) Interação do usuário
   --------------------------------------------------------- */

function buscarDoCampo() {
  const termo = campo.value.trim().toLowerCase();

  if (termo === "") {
    mostrarAviso("Digite algo para buscar", "Por exemplo: pikachu, eevee ou 448.");
    campo.focus();
    return;
  }

  buscarPokemon(termo);
}

botaoBuscar.addEventListener("click", buscarDoCampo);

// Buscar também ao apertar Enter dentro do campo
campo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    buscarDoCampo();
  }
});

botaoSorte.addEventListener("click", () => {
  const numero = Math.floor(Math.random() * TOTAL_DE_POKEMON) + 1;
  campo.value = numero;
  buscarPokemon(numero);
});

// Ao abrir a página já mostramos um Pokémon, para a tela não nascer vazia
window.addEventListener("load", () => {
  botaoSorte.click();
});
