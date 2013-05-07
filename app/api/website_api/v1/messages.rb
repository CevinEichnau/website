 module WebsiteAPI::V1 
  class Conversations < Grape::API

    helpers do
      include WebsiteAPI::Helper
      
      def logger
        Users.logger
      end 
    end

    resource :conversations do

      desc "GET Conversations"
        params do
          requires :uid, :type => Integer, :desc => "uid."
        end  
        get "convers" do
          @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])

          @messages = []
          @conversations = Conversation.find(:all, :conditions => ["user_id = ? OR friend_id = ?", @user.id, @user.id])
          @conversations.each do |c|
            if c.subject == @user.username && c.user_id == @user.id
              c.subject = User.find(c.friend_id).username
              c.save
            elsif c.subject == @user.username && c.friend_id == @user.id
              c.subject = User.find(c.user_id).username
              c.save
            end  
          end  
          respond_with_success(@conversations, :v1_conver)
        end


        desc "GET messages"
        params do
          requires :cid, :type => Integer, :desc => "cid."
        end 
        get "messages" do
         # @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])

          @messages = Notification.find_all_by_conversation_id(params[:cid])
          @messages.each do |m|
            m.username = User.find(m.sender_id).username
          end  
          respond_with_success(@messages, :v1_msgddd)
        end

        desc "SEND messages"
        params do
          requires :cid, :type => Integer, :desc => "cid."
          requires :uid, :type => Integer, :desc => "uid."
          requires :message, :type => String, :desc => "messages."
        end 
        post "messages" do
     
         @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])
         @name = @user.username

          @conver = Conversation.find(params[:cid])
          
          if @conver 
            @user.reply_to_conversation(@conver, params[:message])
          end

           respond_with_success("okay")
        end


       

    end
  end
end        