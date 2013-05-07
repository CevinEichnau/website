class AddThumpToConversation < ActiveRecord::Migration
  def change
    add_column :conversations, :thump, :string
    
  end
end
