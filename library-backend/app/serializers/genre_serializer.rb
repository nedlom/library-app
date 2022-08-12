class GenreSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  has_many :books
end
