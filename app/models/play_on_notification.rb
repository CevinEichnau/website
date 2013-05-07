class PlayOnNotification < Notification
  attr_accessor :username

  def username
  	@name = User.find(id).username
  	return @name
  end	
end
