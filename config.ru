require './app'
require 'pry-remote'
$stdout.sync = true

run Sinatra::Application
