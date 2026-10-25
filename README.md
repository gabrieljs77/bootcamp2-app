# Pokédex Web

## Autor

GABRIEL GUIMARÃES AGUIAR — Matrícula 22504655

## Descrição

Pokédex que consulta a PokéAPI (`https://pokeapi.co/api/v2/pokemon/{nome-ou-id}`) e permite **favoritar** Pokémon, salvando-os em um banco de dados real (Supabase / PostgreSQL), com anotação pessoal para cada um.

## Links

* **Repositório GitHub:** https://github.com/gabrieljs77/bootcamp2-app
* **Aplicação (GitHub Pages):** https://gabrieljs77.github.io/bootcamp2-app/
* **Docker Hub:** https://hub.docker.com/r/gabrielagaguiar/bootcamp2-app

## Executar com Docker

```bash
docker run -d -p 8080:80 gabrielagaguiar/bootcamp2-app:1.0
```

Depois abra http://localhost:8080

## Persistência de dados

* **Banco escolhido:** Supabase (PostgreSQL), acessado direto do frontend com `supabase-js`.
* **Tabela `pokemons_favoritos`:**

| Coluna | Tipo | Descrição |
|---|---|---|
| id | bigint (PK, automático) | identificador |
| nome | text | nome do Pokémon favoritado |
| pokemon_id | int | número na Pokédex |
| nota | text | anotação do usuário |
| criado_em | timestamptz | data do cadastro |

* **O que é salvo:** a lista de Pokémon favoritos e a anotação de cada um. Os dados sobrevivem ao fechamento do navegador.
* **CRUD:** Create (⭐ Favoritar), Read (lista "Meus favoritos"), Update (anotação) e Delete (Excluir).
* **Segurança:** RLS ativado, com políticas de select/insert/update/delete para o papel `anon` (script em `supabase.sql`). A chave usada é a *publishable* (pública por design).

## Docker e Sidequests

* **Imagem:** `nginx:alpine` servindo os arquivos estáticos (`Dockerfile`).
* **SQ1 · .dockerignore:** exclui `.git`, `README.md`, testes, `node_modules` etc. Isso deixa a imagem menor (só vai o que o site precisa) e o build mais rápido (menos arquivos para enviar ao Docker).
* **SQ2 · Versionamento:** publicadas as tags `1.0`, `1.1` e `latest` no Docker Hub.
* **SQ3 · Descrição no Docker Hub:** overview preenchido com o que é a app, o comando `docker run` e o link do GitHub.
* **SQ4 · Orquestração:** dois containers simultâneos nas portas 8080 e 8081:

  ![docker ps](docs/sq4-docker-ps.png)

  **"Se eu tivesse 100 containers, como gerenciaria?"** Gerenciar 100 containers à mão é inviável. O **Kubernetes** é um orquestrador: reúne várias máquinas em um **cluster**; a menor unidade que ele executa é o **pod** (um ou mais containers); e uma **réplica** é uma cópia de um pod. Você declara "quero 100 réplicas desta imagem" e ele distribui entre as máquinas, reinicia as que caem, escala conforme a carga e atualiza versões sem derrubar o serviço.

## Testes

```bash
npm install
npm test
```
