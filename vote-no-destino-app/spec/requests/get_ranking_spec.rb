require 'rails_helper'

describe "Listando o ranking de votos", :type => :request do
  let!(:user_1) { FactoryBot.create(:user) }
  let!(:user_2) { FactoryBot.create(:user) }

  let!(:destination_1) { FactoryBot.create(:destination) }
  let!(:destination_2) { FactoryBot.create(:destination) }
  let!(:destination_3) { FactoryBot.create(:destination) }

  describe "GET /ranking" do
    let!(:voted_destination_1) { FactoryBot.create(:voted_destination, destination_id: destination_1.id, user_id: user_1.id) }
    let!(:voted_destination_2) { FactoryBot.create(:voted_destination, destination_id: destination_2.id, user_id: user_1.id) }
    let!(:voted_destination_3) { FactoryBot.create(:voted_destination, destination_id: destination_3.id, user_id: user_1.id) }
    let!(:voted_destination_4) { FactoryBot.create(:voted_destination, destination_id: destination_1.id, user_id: user_2.id) }

    it 'deve listar somente o ranking geral' do
      headers = { 'ACCEPT' => 'application/json' }
      get '/ranking', :headers => headers

      json = JSON.parse(response.body)
      expect(json.keys).to contain_exactly('general_results')
      expect(response).to have_http_status(:success)
    end

    it 'deve listar o ranking geral e o ranking do usuário' do
      headers = { 'ACCEPT' => 'application/json' }
      get '/ranking', :params => { :user_id => user_1.id }, :headers => headers

      json = JSON.parse(response.body)
      expect(json.keys).to contain_exactly('general_results', 'user_results')
      expect(response).to have_http_status(:success)
    end
  end
end