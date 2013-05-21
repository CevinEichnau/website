class AddFinalIdToConversation < ActiveRecord::Migration
  def change
    add_column :conversations, :finalid, :string
    
  end
end
