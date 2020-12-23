# vote-no-destino - Ruby on Rails

Requisitos
---
-> Docker

Configurando ambiente de desenvolvimento **DOCKER**
---

Criando o Banco de Dados pela primeira vez
```
docker-compose run web rails db:create
```

Executando as migrates
#### Migrates em desenvolvimento
```
docker-compose run web rails db:migrate
```

#### Migrates em produção
```
docker-compose run web-production rails db:migrate
```

Para subir o projeto, execute:
---
```
docker-compose up web
```
Utilize a flag '-d' para executar em background.
