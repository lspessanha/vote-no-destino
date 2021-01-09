require 'rails_helper'

describe "Registrando os votos nos destinos e o usuário", :type => :request do
  let!(:user) { FactoryBot.create(:user) }

  let!(:destination_1) { FactoryBot.create(:destination) }
  let!(:destination_2) { FactoryBot.create(:destination) }
  let!(:destination_3) { FactoryBot.create(:destination) }

  describe "POST /voted_destinations" do
    context 'ao realizar uma votação com sucesso' do
      before do
        post '/voted_destinations', params: {
          :destinations => {
            :ids => [destination_1.id, destination_2.id, destination_3.id]
          },
          :user => {
            :email => user.email,
            :name => user.name
          }
        }
      end

      it 'deve retornar a mensagem de votos computados' do
        expect(JSON.parse(response.body)['message']).to eq('Votos computados.')
      end

      it 'deve retornar o id do usuário cadastrado no voto' do
        expect(JSON.parse(response.body)['userId']).to eq(user.id)
      end

      it 'deve retornar o HTTP status created' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'ao realizar uma votação sem informar os destinos votados' do
      before do
        post '/voted_destinations', params: {
          :destinations => {
            :ids => []
          },
          :user => {
            :email => user.email,
            :name => user.name
          }
        }
      end

      it 'deve retornar a mensagem de erro ao salvar o voto' do
        expect(JSON.parse(response.body)['error']).to eq('Não foi possível salvar o voto.')
      end

      it 'deve retornar o HTTP status unprocessable_entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'ao realizar uma votação informando um usuário inválido' do
      before do
        post '/voted_destinations', params: {
          :destinations => {
            :ids => [destination_1.id, destination_2.id, destination_3.id]
          },
          :user => {
            :email => user.name,
            :name => user.name
          }
        }
      end

      it 'deve retornar a mensagem de erro ao criar o usuário' do
        expect(JSON.parse(response.body)['error']).to eq('Não foi possível criar o usuário.')
      end

      it 'deve retornar o HTTP status unprocessable_entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
