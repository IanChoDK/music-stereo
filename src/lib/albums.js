export const albums = [
  {
    id: 1,
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    cover: "/albums/random-access-memories.jpg",
  },
  {
    id: 2,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    cover: "/albums/abbey-road.jpg",
  },
  {
    id: 3,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    cover: "/albums/thriller.jpg",
  },
  {
    id: 4,
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    cover: "/albums/back-in-black.jpg",
  },
  {
    id: 5,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    cover: "/albums/nevermind.jpg",
  },
  {
    id: 6,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    cover: "/albums/dark-side-of-the-moon.jpg",
  },
]

export const getAlbum = () => albums

export const getAlbumById = (id) =>
    albums.find((album) => album.id === id)