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
          @conversations = Conversation.find(:all, :conditions => ["user_id = ? OR friend_id = ?", @user.id, @user.id], :order => "updated_at DESC")
          @conversations.each do |c|
            if @user.id == c.user_id 
              c.finalid = c.friend_id
            elsif @user.id != c.user_id  
              c.finalid = c.user_id
            end  
            if c.subject == @user.username && c.user_id == @user.id
              c.subject = User.find(c.friend_id).username
              if User.find(c.friend_id).facebook_img != nil
                c.thump = User.find(c.friend_id).facebook_img
              else
                 c.thump = "http://www.gravatar.com/avatar?d=mm"
              end
              c.save
              
            elsif c.subject == @user.username && c.friend_id == @user.id
              c.subject = User.find(c.user_id).username
              if User.find(c.user_id).facebook_img != nil
                c.thump = User.find(c.user_id).facebook_img
              else
                 c.thump = "http://www.gravatar.com/avatar?d=mm"
              end
              c.save
            elsif c.subject != @user.username && c.user_id == @user.id
              if User.find(c.friend_id).facebook_img != nil
                c.thump = User.find(c.friend_id).facebook_img
              else
                 c.thump = "http://www.gravatar.com/avatar?d=mm"
              end
            elsif c.subject != @user.username && c.friend_id == @user.id
              if User.find(c.user_id).facebook_img != nil
                c.thump = User.find(c.user_id).facebook_img
              else
                 c.thump = "http://www.gravatar.com/avatar?d=mm"
              end  
            end 
          end  
          respond_with_success(@conversations, :v1_conver)
        end


        desc "GET messages"
        params do
          requires :cid, :type => Integer, :desc => "cid."
          requires :uid, :type => Integer, :desc => "uid."
        end 
        get "messages" do
          @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])

          @messages = Notification.find_all_by_conversation_id(params[:cid])
          @messages.each do |m|
            if m.sender_id == @user.id
              m.me = true
            else
              m.me = false  
            end  
            m.username = User.find(m.sender_id).username
            if User.find(m.sender_id).facebook_img != nil
              m.thump = User.find(m.sender_id).facebook_img
            else
               m.thump = "http://www.gravatar.com/avatar?d=mm"
            end  
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


         desc "GET unread Messages"
        params do
          requires :id, :type => Integer, :desc => "id."
        end 
        get "unread" do
            #@messages = Notification.find_all_by_conversation_id(params[:cid])
            @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])
             @unread_count = @user.mailbox.inbox(:read => false).count
           respond_with_success(@unread_count.to_s)
        end

        desc "GET unread Messages by Conver"
        params do
          requires :id, :type => Integer, :desc => "id."
          requires :cid, :type => Integer, :desc => "cid."
        end 
        get "unreadconver" do
            #@messages = Notification.find_all_by_conversation_id(params[:cid])
            @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:id].to_i, params[:id].to_i])

            @messages = Notification.find_all_by_conversation_id(params[:cid])
            @count = []
            @messages.each do |m|
              @count << m if m.is_unread?(@user)
            end  
             
           respond_with_success(@count.count.to_s)
        end

        desc "Set unread Messages"
        params do
          requires :id, :type => Integer, :desc => "id."
          requires :uid, :type => Integer, :desc => "uid."
        end 
        post "read" do
           @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])
          conversation = Conversation.find(params[:id])
          conversation.mark_as_read(@user)
           respond_with_success("okay")
        end


        desc "CREATE Conversation"
        params do
          requires :uid, :type => Integer, :desc => "uid."
          requires :fid, :type => Integer, :desc => "fid."
          requires :message, :type => String, :desc => "messages."
        end
        post "conver" do
          @user = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:uid].to_i, params[:uid].to_i])
          @friend = User.find(:first, :conditions => ["id = ? OR uid = ?", params[:fid].to_i, params[:fid].to_i])
          @name = @user.username
          @c = Conversation.find(:first, :conditions => ["user_id = ? AND friend_id = ? OR user_id = ? AND friend_id = ? ", @user.id, @friend.id, @friend.id, @user.id])
           
           if @c != nil 
             @messages = Notification.find_all_by_conversation_id(@c.id)
             @user.reply_to_conversation(@c, params[:message])
           else
             @receipt = @user.send_message(@friend, params[:message], @name)
            @notify = Notification.find(@receipt.notification_id)
            @message1 = Conversation.find(@notify.conversation_id)
            @message1.user_id = @user.id
            @message1.friend_id = @friend.id
            @message1.save
            @conversations = Conversation.find(:all, :conditions => ["user_id = ? OR friend_id = ?", @user.id, @user.id])
             @messages = Notification.find_all_by_conversation_id(@message1.id)
           end 
          @messages.each do |m|
            if m.sender_id == @user.id
              m.me = true
            else
              m.me = false  
            end  
            m.username = User.find(m.sender_id).username
            if User.find(m.sender_id).facebook_img != nil
              m.thump = User.find(m.sender_id).facebook_img
            else
               m.thump = "http://www.gravatar.com/avatar?d=mm"
            end  
          end  
          respond_with_success(@messages, :v1_msgddd)
        end  


       

    end
  end
end        