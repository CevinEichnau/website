require 'spec_helper'

describe UsersController do

  include Helpers

  before(:each) do
    @user = create :user
    sign_in @user
    # https://github.com/plataformatec/devise#test-helpers
    request.env["devise.mapping"] = Devise.mappings[:user]
  end

  describe "GET 'show'" do
    
    
    
  end

end
