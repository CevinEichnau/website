class User < ActiveRecord::Base
  acts_as_api
  include WebsiteAPI::V1::Templates::User

  has_many :playlists
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :token_authenticatable

   #Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username
  #attr_accessor :password
  #attr_accessible :email, :name, :password


end
