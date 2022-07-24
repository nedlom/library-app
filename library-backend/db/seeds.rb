# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

genres = Genre.create([{name: "Fiction"}, {name: "Non-Fiction"}, {name: "Science Fiction"}, {name: "Philosophy"}])

Book.create(title: "Moby Dick", author: "Herman Melville", description: "One of the great works of American literature, Moby Dick is the epic tale of one man's fight against a force of nature. The outcast youth Ishmael, succumbing to wanderlust during a dreary New England autumn, signs up for passage aboard a whaling ship. The Pequod sails under the command of the one-legged Captain Ahab, who has set himself on a monomaniacal quest to capture the cunning white whale that robbed him of his leg: Moby-Dick. Capturing life on the sea with robust realism, Melville details the adventures of the colorful crew aboard the ship as Ahab pursues his crusade of revenge, heedless of all cost. This masterfully symbolic drama of the conflict between man and his fate has a special intensity that listeners will not soon forget.", genre: Genre.first)