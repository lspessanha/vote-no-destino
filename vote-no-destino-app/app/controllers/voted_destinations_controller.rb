class VotedDestinationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @destinations = Destination.all
  end

  def create
    user = User.find_by_email(params[:user][:email])
    unless user
      user = User.new(name: params[:user][:name], email: params[:user][:email])
      
      return render json: { error: "Não foi possível criar o usuário." }, status: :unprocessable_entity unless user.save
    end

    params[:destinations][:ids].each do |id|
      voted_destination = VotedDestination.new(destination_id: id.to_i, user_id: user.id)

      return render json: { error: "Não foi possível salvar o voto." }, status: :unprocessable_entity unless voted_destination.save
    end

    render json: { message: "Votos computados.", userId: user.id }, status: :created
  end

  def ranking
    @general_results = VotedDestination.joins(:destination).select('destinations.destination_name, count(voted_destinations.id) AS count').group('voted_destinations.destination_id').order('count DESC')
    @user_results = @general_results.where(user_id: params[:user_id].to_i) if params[:user_id]
  end
end
