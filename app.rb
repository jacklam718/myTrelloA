require "rubygems"
require "sinatra"
require "sinatra/cross_origin"
require "dotenv"
require "trello"
require "pry"
require "sinatra/content_for"

Dotenv.load

set :sessions, true
set :static, true

use Rack::Static, :urls => ['stylesheets', 'javascripts', 'vendor'], :root => 'public/app'

Trello.configure do |config|
  config.developer_public_key = ENV["KEY"]
  config.member_token = ENV["TRELLO_MEMBER_TOKEN"]
end

module Sinatra::Partials
  def partial(template, *args)
    template_array = template.to_s.split('/')
    template = template_array[0..-2].join('/') + "/_#{template_array[-1]}"
    options = args.last.is_a?(Hash) ? args.pop : {}
    options.merge!(:layout => false)
    locals = options[:locals] || {}
    if collection = options.delete(:collection) then
      collection.inject([]) do |buffer, member|
        buffer << erb(:"#{template}", options.merge(:layout =>
        false, :locals => {template_array[-1].to_sym => member}.merge(locals)))
      end.join("\n")
    else
      erb(:"#{template}", options)
    end
  end
end

helpers Sinatra::Partials

configure do
  enable :cross_origin
end

helpers do
  def get_boards(username = "me")
    Trello::Member.find(username)
  end

  # extra boards names urls
  def user_boards
    boards = Trello::Board.all
  end

  def get_board_by_id(id)
    lists = Trello::Board.find(id)
  end

  def html(template)
    File.read(File.join('public/app/templates', "#{template.to_s}.html"))
  end
end

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, 'public/app/'
  set "views", settings.root + "public/templates"
end

templatesPath = "public/app/templates/";

get "/" do
  html :layout
end

post "/" do
  puts params
end

get "/boards/:id" do
  html :layout
end

get "/boards" do
  html :layout
end

# get "/trelloCallbacks" do
# end

post "/trelloCallback" do
  puts "post trelloCallbacks"

  puts request.body.read
end
