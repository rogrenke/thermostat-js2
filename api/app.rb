require 'sinatra/base'
require 'json'

class Thermo_API < Sinatra::Base

  enable :sessions

  get "/users/1" do
    headers "Access-Control-Allow-Origin" => "*"
    json_hash = { current_temp: 18, power_saving: true, current_city: "Stockholm" }
    json_hash.to_json
  end

  post "/users/" do
    headers "Access-Control-Allow-Origin" => "*"
    session[:current_temp] = params["current_temp"]
    session[:power_saving] = params["power_saving"]
    session[:current_city] = params["current_city"]
  end


  run! if app_file == $0

end
