class Song < ApplicationRecord
  belongs_to :album
  belongs_to :artist


  def populate_artist
    artist_data = JSON.parse(HTTParty.get("https://itunes.apple.com/lookup?id=#{self.artist_id}"))["results"][0]
    self.artist = Artist.find_or_create_by({
      name: artist_data["artistName"],
      genre: artist_data["primaryGenreName"],
      itunes_id: artist_data["artistId"]
    })
  end

  def populate_album
    album_data = JSON.parse(HTTParty.get("https://itunes.apple.com/lookup?id=#{self.album_id}"))["results"][0]
    self.album = Album.find_or_create_by({
      name: album_data["collectionName"],
      image_url: album_data["artworkUrl100"],
      itunes_id: album_data["collectionId"],
      artist: self.artist
    })
  end
end
