require 'sinatra/base'
require 'json'

class Thermo_API < Sinatra::Base

  get "/users/1" do
    json_hash = { curent_temp: "18", power_saving: "on", current_city: "Stockholm" }
    json_hash.to_json
  end


  run! if app_file == $0

end
