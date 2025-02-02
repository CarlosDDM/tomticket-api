# TOMTICKET - API

## Descrição

    O objeto da aplicação é pegar os dados da sua conta do tomticket e disponibilizar um banco de dados,
dessa forma ajudando você a pegar os dados para mostralos em um power bi ou em outra aplicação que 
desejar.
    A aplicação foi costruida com node usando a blibliteca de axios para fazer as requisições, express para 
poder entregar o endpoint caso o usuário tenha o webhook, prisma para facilitar o uso do banco e o banco utilizado
e testado é o PostgresSQL. Existe outras bibliotecas no projeto para fazer ele funcionar como deveria como o Cron, Logger
e Crypto.
    Um dos motivos da sua criação foi a necessidade de mostrar mais dados das informações que eram disponibilizadas pelo
power bi, devido o power bi não poder fazer requisições paginadas na plaforma web e existe o objeto de ser automático.

## Instrução de uso

    Para inicar recomando ir no projeto no caminho "src/services/tomticketApi/tickets.js" e fazer a adição pedida da linha 129, é basicamente inserir os atendentes manualmente para não haver problema com os chamados internos, aproveite e crie a organização com o nome de sua empresa para deixar organizado la no site do tomticket, para vizualizar qual é o id da organização que foi criada pode usar a api do tomticket para o endereço "https://api.tomticket.com/v2.0/organization/list" ai basta jogar o id na onde foi pedido.

### Passo a Passo usando Docker

1. Edite o .env.exemple para somente .env.
2. Coloque o que é pedido no .env.
**API_TOKEN, WEBHOOK_TOKEN, CERT_PATH, KEY_CERT_PATH**
3. Instale o docker e docker compose.
**Caso já tenha instalado pula para a proxima etapa**
4. Com o docker instalado faça:
```
# Entrando no diretorio
cd tomticket

# Fazendo compose do arquivo
docker compose up -d

# Visualizando se ele subiu as duas instancia necessárias 
docker ps

# Deve existir 2 container com os nomes: postgres-Tomticket e get-Tomticket
```
**Dessa forma ele fara o que já esta configurado no Docker-compose**
5. Verificando logs do sistema para validar se esta tudo ok.
```
# Encontrando o container
docker ps

# Entrando dentro do container
docker exec -it get-Tomticket ash

# Usando o pm2 para ver os logs
pm2 monit
# Usando ctrl + c você sai do monit e com exit você para a interação com o ash


# Dessa forma você ira ver os logs de execução do TOMTICKET - API
```

### Passo a Passo sem usar o docker

1. Edite o .env.exemple para somente .env.
2. Coloque o que é pedido no .env.
**API_TOKEN, WEBHOOK_TOKEN, DATABASE_URL, CERT_PATH, KEY_CERT_PATH**
3. Instale o nodeJS.
4. Instale o postgres.
5. Com o node instalado faça:
```
# Entrnado na pasta raiz do projeto
cd tomticket-api

# Instalando dependencias
npm install

# Criando o banco de dados
npx prisma migrate dev --nomeDaMigração

# Inicializando aplicação.
npm start

# Dessa forma ele estara rodando de forma local.
```
## Alertas

>[!WARNING]
> Mudar a porta no .env vai causar falha de comunicação no container caso não fazer o ajuste no docker-compose.yml e no Dockerfile.

>[!CAUTION]
> A falta dos certificados SSL pode causar o não funcionamento da aplicação se for usar para testes gera os certificados auto assinados.




