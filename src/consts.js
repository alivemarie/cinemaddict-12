export const POSTERS = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`];
export const COMMENT_EMOJI = [`./images/emoji/smile.png`, `./images/emoji/angry.png`,
  `./images/emoji/puke.png`, `./images/emoji/sleeping.png`];
export const COMMENT_TEXT = [`Interesting setting and a good cast`, `Booooooooooring`,
  `Very very old. Meh`, `Almost two hours? Seriously?`];
export const COMMENT_AUTHOR = [`John Doe`, `Tim Macoveev`, `Vasya Pupkin`, `D.Watson`, `Emma`, `Diana`];
export const FILM_NAME = [`Avengers: Endgame`, `Avatar`, `Titanic`, `Star Wars: The Force Awakens`, `Avengers: Infinity War`,
  `Jurassic World`, `The Lion King`, `The Avengers`, `Furious 7`, `Frozen II`, `Avengers: Age of Ultron`,
  `Black Panther`, `Harry Potter and the Deathly Hallows – Part 2`, `Star Wars: The Last Jedi`,
  `Jurassic World: Fallen Kingdom`, `Frozen`, `Beauty and the Beast`, `Incredibles 2`, `The Fate of the Furious`,
  `Iron Man 3`, `Minions`, `Captain America: Civil War`, `Aquaman`, `The Lord of the Rings: The Return of the King`,
  `Spider-Man: Far From Home`, `Captain Marvel`, `Transformers: Dark of the Moon`, `Skyfall`,
  `Transformers: Age of Extinction`, `The Dark Knight Rises`, `Joker`, `Star Wars: The Rise of Skywalker`,
  `Toy Story 4`, `Toy Story 3`, `Pirates of the Caribbean: Dead Man's Chest`, `Rogue One: A Star Wars Story`,
  `Aladdin`, `Pirates of the Caribbean: On Stranger Tides`, `Despicable Me 3`, `Jurassic Park`, `Finding Dory`,
  `Star Wars: Episode I – The Phantom Menace`, `Alice in Wonderland`, `Zootopia`, `The Hobbit: An Unexpected Journey`,
  `The Dark Knight`, `Harry Potter and the Philosopher's Stone`, `Harry Potter and the Deathly Hallows – Part 1`,
  `Despicable Me 2`, `The Lion King`];
export const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
export const FILM_GENRE = [`Action`, `Comedy`, `Cartoon`, `Drama`, `Fantasy`, `Horror`,
  `Mystery`, `Romance`, `Thriller`, `Western`];
export const DURATIONS = [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`, `1h 18m`, `1h 32m`];
export const FILM_DIRECTORS = [`Anthony Mann`, `Quentin Tarantino`, `Hayao Miyazaki`, `Alejandro González Iñárritu`,
  `Wes Anderson`, `Christopher Nolan`, `Denis Villeneuve`];
export const SCREENWRITERS = [`Billy Wilder`, `Ethan Coen and Joel Coen`, `Robert Towne`, `Quentin Tarantino`,
  `Francis Ford Coppola`, `William Goldman`, `Charlie Kaufman`, `Woody Allen`];
export const ACTORS = [`Chris Evans`, `Adam Sandler`, `Bradley Cooper`, `Jackie Chan`, `Akshay Kumar`, `Robert Downey Jr.`,
  `Chris Hemsworth`, `Dwayne Johnson`, `Jennifer Lawrence`, `Emma Stone`, `Emma Watson`, `Angelina Jolie`];
export const COUNTRIES = [`USA`, `Russia`, `Australia`, `India`, `Spain`, `UK`];
export const AGE_RATINGS = [`0+`, `6+`, `12+`, `16+`, `18+`];

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  REMOVE_COMMENT: `REMOVE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const FilterType = {
  ALL: ``,
  WATCHLIST: `watchlist`,
  WATCHED: `history`,
  FAVORITES: `favorites`
};

export const MenuMode = {
  FILMS: `films`,
  STATISTICS: `statistics`
};

// servers consts

export const AUTHORIZATION = `Basic fmsl423432nda`; // `Basic fmsldfn4r3nfsda`;
export const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const apiHeaders = {"Content-Type": `application/json`};

export const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};
