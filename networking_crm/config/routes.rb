require 'sidekiq/web'

Rails.application.routes.draw do
    authenticate :user, lambda { |u| u.admin? } do
        mount Sidekiq::Web => '/sidekiq'
    end
    devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
    get '*path', to: 'pages#index', constraints: ->(request){ request.format.html? }
    root to: 'pages#index'
end
