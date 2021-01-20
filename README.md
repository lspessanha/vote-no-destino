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

Para subir o projeto, execute:
---
```
docker-compose up web
```
Utilize a flag '-d' para executar em background.

Caso a aplicação não encontre o Bootstrap, execute o comando:
---
```
docker-compose run web yarn
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

#### Rodando os testes
---

Criando a base de teste:
```
docker-compose run web rails db:drop RAILS_ENV=test
docker-compose run web rails db:create RAILS_ENV=test
docker-compose run web rails db:schema:load RAILS_ENV=test
```

Rodando os testes:
```
docker-compose run -e RAILS_ENV=test web rspec
```

## Realizando o Deploy
---

Em produção, execute o script:
```
./deploy_production.sh
```

Acesse a aplicação em produção:
Desativado
