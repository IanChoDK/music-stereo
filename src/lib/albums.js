export const albums = [
  {
    id: 1,
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    cover: "https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png",
    songs: [
      "Give Life Back to Music",
      "The Game of Love",
      "Giorgio by Moroder",
      "Instant Crush",
      "Lose Yourself to Dance",
      "Get Lucky",
    ],
  },
  {
    id: 2,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    cover: "https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/10/06032902/abbey-road-the-beatles.jpg",
    songs: [
      "Come Together",
      "Something",
      "Maxwell's Silver Hammer",
      "Oh! Darling",
      "Here Comes the Sun",
      "Because",
    ],
  },
  {
    id: 3,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    cover: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    songs: [
      "Wanna Be Startin' Somethin'",
      "Baby Be Mine",
      "The Girl Is Mine",
      "Thriller",
      "Beat It",
      "Billie Jean",
    ],
  },
  {
    id: 4,
    title: "Back in Black",
    artist: "AC/DC",
    year: 1980,
    cover: "https://upload.wikimedia.org/wikipedia/commons/9/92/ACDC_Back_in_Black.png",
    songs: [
      "Hells Bells",
      "Shoot to Thrill",
      "What Do You Do for Money Honey",
      "Back in Black",
      "You Shook Me All Night Long",
      "Rock and Roll Ain't Noise Pollution",
    ],
  },
  {
    id: 5,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    country: "Estados Unidos",
    genre: ["Grunge", "Alternative Rock"],
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/NirvanaNevermindalbumcover.jpg/250px-NirvanaNevermindalbumcover.jpg",
    songs: [
      "Smells Like Teen Spirit",
      "In Bloom",
      "Come as You Are",
      "Breed",
      "Lithium",
      "Drain You",
    ],
  },
  {
    id: 6,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    cover: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/960px-Dark_Side_of_the_Moon.png",
    songs: [
      "Speak to Me",
      "Breathe",
      "Time",
      "Money",
      "Us and Them",
      "Brain Damage",
    ],
  },
];

export const getAlbum = () => albums

export const getAlbumById = (id) =>
    albums.find((album) => album.id === Number(id))