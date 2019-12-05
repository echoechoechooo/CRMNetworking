Rails.application.routes.draw do
    get '/auth/:provider/callback', to: 'sessions#create'
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
    resources :contacts
    resources :todos
    root to: 'pages#index'
end
