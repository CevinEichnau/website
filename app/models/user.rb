class User < ActiveRecord::Base
  acts_as_api
  include WebsiteAPI::V1::Templates::User
  include Amistad::FriendModel
  acts_as_messageable


  has_many :playlists
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable, :omniauthable

   #Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :provider, :uid, :facebook_img
  #attr_accessor :password
  #attr_accessible :email, :name, :password
  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    puts "=>>>>>>>>>>>>>"
    puts auth
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    logger.debug(auth)
    unless user
      user = User.create(username:auth.extra.raw_info.name,
                           provider:auth.provider,
                           uid:auth.uid,
                           email:auth.info.email,
                           password:Devise.friendly_token[0,20],
                           facebook_img:"http://graph.facebook.com/"+auth.uid+"/picture?type=large"
                           )
    end
    user
  end

  def self.find_for_facebook_api(auth)
      puts "=>>>>>>>>>>>>>"
      puts auth
      user = User.where(:provider => "facebook", :uid => auth["id"]).first
      logger.debug(auth)
      unless user
        user = User.create(username:auth["name"],
                             provider:"facebook",
                             uid:auth["id"],
                             email:auth["email"],
                             password:Devise.friendly_token[0,20],
                             facebook_img:"http://graph.facebook.com/"+auth["id"]+"/picture?type=large"
                             )
      end
      user
    end

end