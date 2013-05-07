class AddThumpToNotification < ActiveRecord::Migration
  def change
    add_column :notifications, :thump, :string

  end
end
