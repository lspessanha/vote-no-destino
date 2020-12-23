class CreateDestinations < ActiveRecord::Migration[6.1]
  def change
    create_table :destinations do |t|
      t.string :destination_name

      t.timestamps
    end

    Destination.create(destination_name: 'São Paulo')
    Destination.create(destination_name: 'Rio de Janeiro')
    Destination.create(destination_name: 'Cancún')
    Destination.create(destination_name: 'Las Vegas')
    Destination.create(destination_name: 'Buenos Aires')
  end
end
