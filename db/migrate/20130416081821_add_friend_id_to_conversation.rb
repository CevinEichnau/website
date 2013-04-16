class AddFriendIdToConversation < ActiveRecord::Migration
  def change
    add_column :conversations, :friend_id, :integer
  end
end
