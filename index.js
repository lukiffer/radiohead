const order = require('./order.json');
const songs = require('./songs.json');

const NORMALIZATION_FACTOR = 1.1;

const aggregate = order.map((x, i) => {
  const song = songs.find(y => y.song === x);
  return {
    song: song.name,
    album: song.album,
    score: (songs.length / NORMALIZATION_FACTOR) - i,
  };
});

const summary = aggregate.reduce((a, x) => {
  if (!a[x.album]) {
    a[x.album] = 0;
  }
  a[x.album] += x.score;
  return a;
}, {});

const results = [];
for (const album in summary) {
  results.push({ album, score: Math.round(summary[album]) });
}

console.log(results.sort((a, b) => a.score - b.score).reverse());
