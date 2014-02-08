###############################
#
# Capistrano Deployment on shared Webhosting by RailsHoster
#
# maintained by support@railshoster.de
#
###############################

def gemfile_exists? 
  File.exists? "Gemfile"
end

def gemfile_lock_exists?
  File.exists? "Gemfile.lock"
end

def rails_version
  stdout = `bundle list rails`
  matches = stdout.scan(/\/rails-(\d+\.\d+\.\d+)$/).first
  matches ? matches.first : nil
end

def rails_version_supports_assets?
  rv = rails_version
  rv ? rv >= "3.1.0" : false
end

if gemfile_exists? && gemfile_lock_exists?
  require 'bundler/capistrano'
end

#### Use the asset-pipeline

if rails_version_supports_assets?
  load 'deploy/assets'
end



# railshoster bundler settings
set :bundle_flags, "--deployment --binstubs"

############################################
# Default Tasks by RailsHoster.de
############################################
namespace :deploy do
  desc "Restarting mod_rails with restart.txt"
  task :restart, :roles => :app, :except => { :no_release => true } do
  end

  desc "Additional Symlinks ( database.yml, etc. )"
  task :additional_symlink, :roles => :app do
    run "ln -sf #{shared_path}/config/database.yml #{release_path}/config/database.yml"
  end
end

namespace :railshoster do
  desc "Show the url of your app."
  task :appurl do
    puts "\nThe default RailsHoster.com URL of your app is:"
    puts "\nhttp://user46572014-1.ny.railshoster.de"    
    puts "\n"
  end
end

if rails_version_supports_assets?
  before "deploy:assets:precompile", "deploy:additional_symlink"
  after "deploy:create_symlink", "deploy:migrate"
else
  after "deploy:create_symlink", "deploy:additional_symlink", "deploy:migrate"
end

