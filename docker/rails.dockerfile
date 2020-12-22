FROM ruby:2.7.0

WORKDIR /app

COPY ./vote-no-destino-app/Gemfile ./vote-no-destino-app/Gemfile.lock ./

RUN bundle install

COPY ./vote-no-destino-app .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]