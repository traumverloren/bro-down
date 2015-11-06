Rails.application.routes.draw do
  root to: 'application#angular'

  post 'auth' => 'auth#authenticate'
end
