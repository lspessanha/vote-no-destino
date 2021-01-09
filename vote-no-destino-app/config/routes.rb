Rails.application.routes.draw do
  root to: 'voted_destinations#index'
  get '/vote-no-destino', to: 'voted_destinations#index'
  get '/ranking', to: 'voted_destinations#ranking'
  resources :voted_destinations, only: [:create]
end
