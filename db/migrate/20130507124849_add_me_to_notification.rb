class AddMeToNotification < ActiveRecord::Migration
  def change
    add_column :notifications, :me, :boolean
   
  end
end
