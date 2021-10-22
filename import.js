const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

async function main() {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

  const songs = [];
  const albums = await spotifyApi.getArtistAlbums('4Z8W4fKeB5YxbusRsdQVPb');
  for (const album of albums.body.items) {
    const tracks = await spotifyApi.getAlbumTracks(album.id);
    songs.push(...tracks.body.items.map(x => ({
      album: album.name,
      song: x.name,
    })));
  }

  fs.writeFileSync('songs.json', JSON.stringify(songs, null, 2));
  fs.writeFileSync('order.json', JSON.stringify(songs.map(x => x.song), null, 2));
}

main().then(() => {
  console.log('fin.');
});
