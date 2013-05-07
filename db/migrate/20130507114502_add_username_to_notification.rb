class AddUsernameToNotification < ActiveRecord::Migration
  def change
    add_column :notifications, :username, :string
  end
end
