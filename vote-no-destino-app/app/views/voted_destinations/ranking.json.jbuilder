json.general_results @general_results do |result|
  json.destino result.destination_name
  json.votos result.count
end

if @user_results
  json.user_results @user_results do |result|
    json.destino result.destination_name
    json.votos result.count
  end
end