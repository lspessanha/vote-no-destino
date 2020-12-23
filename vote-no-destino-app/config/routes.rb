Rails.application.routes.draw do
  get '/vote-no-destino', to: "destinations#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
