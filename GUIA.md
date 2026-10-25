# GUIA — passo a passo (Etapa 02 + Etapa 03)

## Etapa 02 (individual)

1. **Copie os arquivos** da pasta `pacote/` para a raiz do seu repositório `bootcamp2-app` (substitua index.html, script.js, style.css, README.md). Crie também a pasta `docs/`.
2. **Supabase:** Dashboard > SQL Editor > New query > cole `supabase.sql` > Run. (Isso cria a tabela e as políticas RLS. Sem isso dá erro silencioso.)
3. **Teste local:** abra o `index.html`, favorite um Pokémon, recarregue (F5): ele deve continuar na lista. Se falhar, F12 > Console.
4. **Commits** (mínimo 6 novos, em partes):
   ```bash
   git add supabase.sql && git commit -m "Adiciona script SQL da tabela e RLS"
   git add utils.js && git commit -m "Extrai funcoes puras para utils.js"
   git add script.js index.html style.css && git commit -m "Persiste favoritos no Supabase (CRUD)"
   git add Dockerfile && git commit -m "Adiciona Dockerfile com nginx"
   git add .dockerignore .gitignore && git commit -m "SQ1: adiciona .dockerignore"
   git add package.json utils.test.js .github && git commit -m "Adiciona testes Jest e workflow de CI"
   git push
   ```
5. **Docker** (troque `SEU_USUARIO` pelo seu usuário do Docker Hub):
   ```bash
   docker build -t bootcamp2-app .
   docker run -d -p 8080:80 bootcamp2-app      # teste em http://localhost:8080
   docker login
   docker tag bootcamp2-app SEU_USUARIO/bootcamp2-app:1.0
   docker push SEU_USUARIO/bootcamp2-app:1.0
   ```
6. **SQ2:** faça uma melhoria pequena (ex.: mude um texto), rebuild e:
   ```bash
   docker build -t bootcamp2-app .
   docker tag bootcamp2-app SEU_USUARIO/bootcamp2-app:1.1
   docker tag bootcamp2-app SEU_USUARIO/bootcamp2-app:latest
   docker push SEU_USUARIO/bootcamp2-app:1.1
   docker push SEU_USUARIO/bootcamp2-app:latest
   ```
   Confira em hub.docker.com que a imagem está **Public** e mostra as 3 tags.
7. **SQ3:** Docker Hub > seu repositório > edite o *Overview* (o que é, o comando `docker run`, link do GitHub).
8. **SQ4:**
   ```bash
   docker run -d -p 8080:80 --name app1 SEU_USUARIO/bootcamp2-app:1.0
   docker run -d -p 8081:80 --name app2 SEU_USUARIO/bootcamp2-app:1.0
   docker ps
   ```
   Tire print do `docker ps`, salve como `docs/sq4-docker-ps.png` e dê commit/push.
9. **README:** troque `SEU_USUARIO` pelo seu usuário. Entregue **somente o README.md** no Moodle.
10. Confirme que o GitHub Pages continua funcionando (o `docker run` e o Pages usam o mesmo código).

## Etapa 03 (em grupo, 2 a 5 pessoas)

Eu não consigo fazer esta por você: ela exige colegas e vários PRs de contas diferentes (o professor confere o histórico). Mas o código já está pronto: pode ser a base do grupo (consome API externa, tem banco, Docker e testes).

1. Um integrante cria o repositório público (ex.: `bootcamp2-projeto-final`) e sobe o código do `pacote/`. Em **Settings > Collaborators**, adicione todos; todos aceitam o convite.
2. No README, crie a tabela de integrantes (nome, matrícula, usuário GitHub, funcionalidade, link do PR). Cada pessoa precisa ser dona de uma funcionalidade **de código**. Sugestão: busca/API, persistência, favoritos/notas (CRUD), testes, Docker/CI.
3. **Proteger a main:** Settings > Branches > Add ruleset para `main`: exigir Pull Request, exigir 1 aprovação, e **Require status checks to pass** marcando o check **test** (do workflow `ci.yml`; ele só aparece na lista depois de rodar uma vez em um PR).
4. **Fluxo de cada membro:**
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   # edite o código
   git add . && git commit -m "Adiciona X"
   git push -u origin feature/nome-da-funcionalidade
   ```
   Abra o PR no GitHub (título claro, descrição, revisor = outro membro). O colega comenta e aprova; o Actions fica verde; merge.
5. **Evidências:** crie um PR com teste quebrado de propósito (ex.: mude o `expect` em `utils.test.js`), tire print dele **bloqueado**, depois corrija. Relate um conflito de merge resolvido, se houver.
6. Publique a imagem no Docker Hub (conta de um membro). O README leva o `docker run`, instruções de execução local e `npm test`.
7. **Entrega:** todos postam o mesmo README.md no Moodle.

Atenção: PR "fantasma" (mudar uma vírgula) e um só membro fazendo tudo derrubam a nota.
