<div id="header" align="center">
  <img src="https://media.giphy.com/media/2z956IUc3J0noEOXUL/giphy.gif" width="400"/>
</div>



# Criação de  API com Firebase 
**Introdução**
  
Este projeto é um guia abrangente para criar uma API utilizando Node.js e Firebase. Ele é projetado para orientar você passo a passo, desde a configuração do seu ambiente até a implementação e teste da sua API.

**Objetivo**

O objetivo é fornecer um conjunto claro e detalhado de instruções para desenvolvedores, especialmente aqueles novos em Node.js ou Firebase, para construir suas próprias APIs de forma eficaz.

**Visão Geral dos Passos**

* Configuração Básica
* Instalação do Node.js e npm

Criação de um novo projeto Node.js

* Instalação do Express

* Configuração do Firebase

* Criação de um projeto no Firebase

* Configuração do Firestore Database

* Obtenção de credenciais do Firebase

**Estrutura do Projeto**

* Organização das pastas do projeto (modelos, rotas, controladores)

* Criação de arquivos principais como app.js

* Integração com o Firebase

* Inicialização do Firebase no projeto usando as credenciais baixadas

* Configuração do Firebase Admin SDK

* Implementação da API

* Criação de rotas e controladores

* Implementação de operações CRUD usando o Firebase


**Testando a API**

Uso de ferramentas como Postman ou Insomnia para testar as rotas da API

**Principais Recursos**

* Orientação detalhada e amigável para iniciantes

* Ênfase na implementação prática e aplicação no mundo real

* Focado na integração com o Firebase para serviços de backend





**1. Configurar o Projeto Node.js**

Abra um terminal ou prompt de comando.
Navegue até o diretório onde deseja criar o projeto.
Execute npm init -y para criar um novo projeto Node.js com um arquivo package.json padrão.

**2. Instalar Dependências**

Instale o Express e o Firebase Admin SDK executando o comando:

npm install express firebase-admin

**3. Configurar o Firebase**

Acesse o Console do Firebase e crie um novo projeto, se ainda não tiver um. Na seção de configurações do projeto, navegue até "Contas de serviço" e gere uma nova chave privada para o Admin SDK. Salve o arquivo JSON da chave privada  no diretório raiz do seu projeto.

**4. Estruturar o Projeto**

Crie um arquivo  app.js  e cole o código fornecido.
Crie um diretório routes e, dentro dele, os arquivos produtosRoutes.js, entradasRoutes.js e saidasRoutes.js. Defina as rotas conforme a lógica desejada para produtos, entradas e saídas.


**5. Executar o Servidor**

No terminal, no diretório raiz do seu projeto, execute o comando:

node app.js
Isso iniciará o servidor na porta especificada (por padrão, 3001) e exibirá a mensagem "ServidCopy codeor rodando na porta 3000" no console.

**6. Acessar a Aplicação**

Abra um navegador ou use uma ferramenta como Postman para enviar requisições HTTP para as rotas definidas (por exemplo, http://localhost:3001/api/produtos para acessar as rotas de produtos).


# Notas Importantes:

Certifique-se de adicionar o arquivo JSON da chave privada do Firebase ao .gitignore antes de comitar seu código, para evitar expor informações sensíveis.
Verifique a documentação do Express e do Firebase Admin SDK para mais detalhes sobre como expandir e personalizar sua aplicação.




