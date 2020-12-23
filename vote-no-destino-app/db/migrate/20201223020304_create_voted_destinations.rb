class CreateVotedDestinations < ActiveRecord::Migration[6.1]
  def change
    create_table :voted_destinations do |t|
      t.references :destination, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
