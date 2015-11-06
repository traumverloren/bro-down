class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  before_save { email.downcase }

  field :name,             type: String
  field :email,            type: String
  field :password,         type: String
  field :password_digest,  type: String
  
  validates :name,  presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }

  has_secure_password
end
