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

Executando seeds
#### Migrates em desenvolvimento
```
docker-compose run web rails db:seed
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


#### Rodando os testes
---

Criando a base de teste:
```
rails db:drop RAILS_ENV=test
rails db:create RAILS_ENV=test
rails db:schema:load RAILS_ENV=test
```

Rodando os testes:
```
RAILS_ENV=test rspec
```

## Realizando o Deploy
---

Em produção, execute o script:
```
./deploy_production.sh
```

Acesse a aplicação em produção:
[https://vote-no-destino-2312.herokuapp.com/](https://vote-no-destino-2312.herokuapp.com/)
