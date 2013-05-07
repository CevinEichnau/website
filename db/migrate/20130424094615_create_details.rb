class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.string :gender
      t.string :location
      t.string :relationship
      t.string :birthday
      t.string :work
      t.string :status
      t.string :favorit_artist
      t.string :favorit_song
      t.string :favorit_music
      t.string :telephone_number

      t.timestamps
    end
  end
end
