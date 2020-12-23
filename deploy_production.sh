#!/bin/bash
echo 'Realizando login no Heroku'
heroku login

echo 'Limpando pasta de logs'
rm -rf ./vote-no-destino-app/tmp/* && rm -rf ./vote-no-destino-app/log/*

echo 'Realizando login no registry do Heroku'
heroku container:login

echo 'Realizando o push da imagem docker para o Heroku'
heroku container:push web -a vote-no-destino-2312

echo 'Realizando o deploy da aplicação no Heroku'
heroku container:release web -a vote-no-destino-2312