# Desafio Técnico Luizalabs - Web

![Build status](https://travis-ci.com/guilhermehrq/desafio-luizalabs-web.svg?token=NMRqR1XzXHw8yVERNabp&branch=master)

Frontend desenvolvido para consumo dos serviços disponibilizados pela [API de Desafio Técnico](https://github.com/guilhermehrq/desafio-luizalabs) do [Luizalabs](https://www.99jobs.com/luizalabs).

- Desenvolvido com [ReactJS](https://pt-br.reactjs.org/)
- Interface criada com [Semantic UI](https://react.semantic-ui.com/)
- Testes automatizados com [Jest](https://jestjs.io/) e [Enzyme](https://airbnb.io/enzyme/)
- Integração continua com [TravisCI](https://travis-ci.com/)
- Deploy automático com [Heroku](https://www.heroku.com/)
- Padronização do projeto seguindo especificações da [Airbnb](https://github.com/airbnb/javascript) configuradas com o uso do [ESLint](https://eslint.org/)

## Índice

- [A aplicação](#id1)
- [Demo](#id2)
- [Executando a aplicação](#id3)
  - [Configurando variáveis de ambiente](#id4)
  - [Iniciando a aplicação](#id5)
- [Testes automatizados](#id6)

<div id='id1' />

## A aplicação

Esta aplicação web foi desenvolvida como desafio técnico para a vaga de desenvolvedor do Luizalabs, com o objetivo de consumir os serviços disponibilizados pela API criada para o mesmo desafio.

> Mais infomações sobre a API podem ser encontradas em seu [repositório](https://github.com/guilhermehrq/desafio-luizalabs).

A aplicação foi inteiramente desenvolvida com a biblioteca JavaScript **ReactJS** com elementos da framework de interface de usuário **Semantic UI**.

Com uma interface simples e amigável disponibiliza os serviços de Busca, Inserção, Atualização e Exclusão de funcionários, além de possuir uma tabela para analise da quantidade de funcionários nascidos em cada estado brasileiro. Todos estes serviços consumidos da API criada para o desafio.

<div id='id2' />

## Demo

Uma versão em funcionamento da aplicação está disponível para demonstração e pode ser acessada através do endereço:

[Desafio Luizalabs (Web)](http://desafio-luizalabs.herokuapp.com/)

<div id='id3' />

## Executando a aplicação

Para executar a aplicação certifique-se de ter instalado em sua máquina o [NodeJS](https://nodejs.org/en/download/) juntamente com o [Git](https://git-scm.com/downloads).

Execute os seguintes comandos no terminal de sua máquina:

```sh
$ git clone https://github.com/guilhermehrq/desafio-luizalabs-web.git
$ cd desafio-luizalabs-web
$ npm install
```

<div id='id4' />

**Configurando variáveis de ambiente**

Em seguida, abra o arquivo _.env_ e configure a variável de ambiente com a rota base para requisições na API:

```js
REACT_APP_API_URL=http://localhost:3001
// Também pode ser configurado com a rota: https://desafio-luizalabs-api.herokuapp.com
```

> Certifique-se de ter iniciado a API, o guia para utilização pode ser encontrado aqui: [Desafio Luizalabs - API](https://github.com/guilhermehrq/desafio-luizalabs)

<div id='id5' />

**Iniciando a aplicação**

Após realizados os passos acima, basta ir até o terminal e executar o seguinte comando:

```sh
$ npm start
```

E pronto! Seu navegador padrão será aberto com a aplicação em funcionamento.

<div id='id6' />

## Testes automatizados

Para execução dos testes automatizados com Jest e Enzyme, basta executar o comando:

```sh
$ npm test
```
