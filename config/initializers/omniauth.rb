Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin, Rails.application.credentials.linkedin[:client_id], Rails.application.credentials.linkedin[:client_secret], :scope => 'r_liteprofile r_emailaddress'
end
