require "rubygems"
require "sinatra"
require "sinatra/cross_origin"
require "pry"

set :cross_origin, true
set :sessions, true
set :static, true

use Rack::Static, :urls => ['stylesheets', 'javascripts', 'vendor'], :root => 'public/app'

helpers do
  def html(template)
    File.read(File.join('public/app/templates', "#{template.to_s}.html"))
  end
end

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, 'public/app'
  set "views", settings.root + "public/templates"
end

templatesPath = "public/app/templates/";

get "/" do
  html :layout
end

get "/boards/:id" do
  html :layout
end

get "/boards" do
  html :layout
end
