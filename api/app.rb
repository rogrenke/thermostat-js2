require 'sinatra/base'
require 'json'

class Thermo_API < Sinatra::Base

  get "/users/1" do
    headers "Access-Control-Allow-Origin" => "*"
    json_hash = { current_temp: 18, power_saving: true, current_city: "Stockholm" }
    json_hash.to_json
  end


  run! if app_file == $0

end
