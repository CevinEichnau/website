path = Rails.root.join ("config/omniauth.yml")

OMNIAUTH = YAML.load_file(path)[Rails.env]