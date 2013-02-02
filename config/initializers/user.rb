USER_ID   = "cevin"
PASSWORD  = "freakyceviin"

module ApplicationHelper
 def logged_in?
   not request.authorization.nil?
 end
end