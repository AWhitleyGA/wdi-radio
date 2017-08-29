class Artist < ApplicationRecord
  has_many :albums, dependent: :destroy
  has_many :songs, dependent: :destroy

  before_create :populate_artist
  after_create :populate_albums
  after_create :populate_songs

  private

  def populate_artist
    artist_data = JSON.parse(HTTParty.get("https://itunes.apple.com/search?term=#{self.name}&media=music&entity=musicArtist"))["results"][0]
    self.name = artist_data["artistName"]
    self.genre = artist_data["primaryGenreName"]
    self.itunes_id = artist_data["artistId"]
  end

  def populate_albums
    album_list = JSON.parse(HTTParty.get("https://itunes.apple.com/lookup?id=#{self.itunes_id}&media=music&entity=album"))["results"]
    album_list.shift
    album_list.sample(5).each do |album|
      new_album = Album.create!(
        name: album["collectionName"],
        image_url: album["artworkUrl100"],
        itunes_id: album["collectionId"],
        artist: self
      )
    end
  end

  def populate_songs
    self.albums.each do |album|
      song_list = JSON.parse(HTTParty.get("https://itunes.apple.com/lookup?id=#{album.itunes_id}&media=music&entity=song"))["results"]
      song_list.shift
      song_list.sample(3).each do |song|
        new_song = Song.create!(
          name: song["trackName"],
          preview_url: song["previewUrl"],
          itunes_id: song["trackId"],
          album: album,
          artist: self
        )
      end
    end
  end

end
