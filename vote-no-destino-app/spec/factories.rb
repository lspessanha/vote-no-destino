FactoryBot.define do
  factory :destination, class: Destination do
    destination_name { Faker::Address.unique.country }
  end

  factory :user, class: User do
    name { Faker::Name.unique.name }
    email { Faker::Internet.unique.email }
  end

  factory :voted_destination, class: VotedDestination do
    destination_id { Faker::Number.between(from: 1, to: 10) }
    user_id { Faker::Number.between(from: 1, to: 10) }
  end
end