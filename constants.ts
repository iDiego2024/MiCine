
import { AfiEntry, OscarNomination } from './types';

// TMDB Configuration
export const TMDB_API_KEY = '506c9387e637ecb32fd3b1ab6ade4259';
export const OMDB_API_KEY = '1b00f496';
export const YOUTUBE_API_KEY = 'AIzaSyBV8-kbLUzPAT9Pi1JBXP9KQBAjF0gvRHo';

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// This string contains the raw CSV data provided in the prompt.
export const RAW_CSV_DATA = `Const,Your Rating,Date Rated,Title,Original Title,URL,Title Type,IMDb Rating,Runtime (mins),Year,Genres,Num Votes,Release Date,Directors
tt0086393,5,2025-11-18,"Superman III","Superman III",https://www.imdb.com/title/tt0086393,Movie,5.0,125,1983,"Sci-Fi, Comedy, Adventure, Action",80350,"1983-06-17","Richard Lester"
tt0081573,7,2025-11-18,"Superman II","Superman II",https://www.imdb.com/title/tt0081573,Movie,6.8,127,1980,"Action, Adventure, Sci-Fi",123141,"1981-06-19","Richard Lester,Richard Donner"
tt0078346,7,2025-11-18,"Superman","Superman",https://www.imdb.com/title/tt0078346,Movie,7.4,143,1978,"Action, Adventure, Sci-Fi",204968,"1978-12-15","Richard Donner"
tt0068646,10,2025-11-17,"The Godfather","The Godfather",https://www.imdb.com/title/tt0068646,Movie,9.2,175,1972,"Crime, Drama",2177236,"1972-03-24","Francis Ford Coppola"
tt0048728,7,2025-11-14,"To Catch a Thief","To Catch a Thief",https://www.imdb.com/title/tt0048728,Movie,7.4,106,1955,"Thriller, Drama, Romance, Mystery",85322,"1955-08-05","Alfred Hitchcock"
tt3281548,6,2025-11-14,"Little Women","Little Women",https://www.imdb.com/title/tt3281548,Movie,7.8,135,2019,"Drama, Romance",275996,"2019-12-25","Greta Gerwig"
tt14849194,7,2025-11-14,"The Holdovers","The Holdovers",https://www.imdb.com/title/tt14849194,Movie,7.9,133,2023,"Comedy, Drama",212225,"2023-11-10","Alexander Payne"
tt3704428,7,2025-11-14,"Elvis","Elvis",https://www.imdb.com/title/tt3704428,Movie,7.3,159,2022,"Biography, Drama, Music",255539,"2022-06-24","Baz Luhrmann"
tt14208870,7,2025-11-14,"The Fabelmans","The Fabelmans",https://www.imdb.com/title/tt14208870,Movie,7.5,151,2022,"Drama",131382,"2022-11-23","Steven Spielberg"
tt5040012,6,2025-11-04,"Nosferatu","Nosferatu",https://www.imdb.com/title/tt5040012,Movie,7.1,132,2024,"Horror, Fantasy, Mystery",247295,"2024-12-25","Robert Eggers"
tt5950044,6,2025-09-29,"Superman","Superman",https://www.imdb.com/title/tt5950044,Movie,7.1,129,2025,"Action, Adventure, Sci-Fi",349864,"2025-07-11","James Gunn"
tt28607951,8,2025-09-14,"Anora","Anora",https://www.imdb.com/title/tt28607951,Movie,7.4,139,2024,"Drama, Comedy, Romance",234830,"2024-11-08","Sean Baker"
tt0113540,7,2025-09-03,"Kids","Kids",https://www.imdb.com/title/tt0113540,Movie,7.0,91,1995,"Drama",90301,"1995-09-01","Larry Clark"
tt16311594,7,2025-07-21,"F1: The Movie","F1",https://www.imdb.com/title/tt16311594,Movie,7.7,155,2025,"Sport, Drama, Action",243982,"2025-06-27","Joseph Kosinski"
tt36856278,4,2025-06-29,"Trainwreck: The Astroworld Tragedy","Trainwreck: The Astroworld Tragedy",https://www.imdb.com/title/tt36856278,Movie,6.7,80,2025,"Documentary",5264,"2025-06-10","Yemi Bamiro,Hannah Poulter"
tt36856306,3,2025-06-29,"Trainwreck: Mayor of Mayhem","Trainwreck: Mayor of Mayhem",https://www.imdb.com/title/tt36856306,Movie,6.2,49,2025,"Documentary",3204,"2025-06-17","Shianne Brown"
tt24053860,7,2025-05-26,"The Day of the Jackal","The Day of the Jackal",https://www.imdb.com/title/tt24053860,TV Series,8.1,,2024,"Drama, Thriller, Crime, Action",119131,"2024-11-14",
tt15218000,6,2025-05-25,"Fire Island","Fire Island",https://www.imdb.com/title/tt15218000,Movie,6.7,105,2022,"Comedy, Romance",15360,"2022-06-03","Andrew Ahn"
tt22893404,6,2025-05-25,"Maria","Maria",https://www.imdb.com/title/tt22893404,Movie,6.4,124,2024,"Biography, Drama, Music",23490,"2024-12-11","Pablo Larraín"
tt14513804,4,2025-05-25,"Captain America: Brave New World","Captain America: Brave New World",https://www.imdb.com/title/tt14513804,Movie,5.6,118,2025,"Action, Adventure, Sci-Fi",169954,"2025-02-14","Julius Onah"
tt8790086,5,2025-05-25,"Kraven the Hunter","Kraven the Hunter",https://www.imdb.com/title/tt8790086,Movie,5.5,127,2024,"Action, Thriller, Adventure",74912,"2024-12-13","J.C. Chandor"
tt1972591,5,2025-05-25,"King Arthur: Legend of the Sword","King Arthur: Legend of the Sword",https://www.imdb.com/title/tt1972591,Movie,6.7,126,2017,"Action, Adventure, Fantasy, Drama",244223,"2017-05-12","Guy Ritchie"
tt5151570,3,2025-05-25,"Mrs. Harris Goes to Paris","Mrs. Harris Goes to Paris",https://www.imdb.com/title/tt5151570,Movie,7.1,115,2022,"Drama, Comedy",35902,"2022-07-15","Anthony Fabian"
tt4772188,8,2025-05-20,"Flow","Straume",https://www.imdb.com/title/tt4772188,Movie,7.9,85,2024,"Animation, Adventure, Fantasy, Family",99633,"2025-02-14","Gints Zilbalodis"
tt6263850,6,2025-05-04,"Deadpool & Wolverine","Deadpool & Wolverine",https://www.imdb.com/title/tt6263850,Movie,7.5,128,2024,"Action, Comedy, Sci-Fi, Adventure",538355,"2024-07-26","Shawn Levy"
tt20215234,7,2025-05-02,"Conclave","Conclave",https://www.imdb.com/title/tt20215234,Movie,7.4,120,2024,"Thriller, Drama",225197,"2024-10-25","Edward Berger"
tt3566834,6,2025-04-13,"A Minecraft Movie","A Minecraft Movie",https://www.imdb.com/title/tt3566834,Movie,5.6,101,2025,"Action, Adventure, Fantasy, Comedy, Family",143393,"2025-04-04","Jared Hess"
tt8368368,7,2025-04-09,"The Apprentice","The Apprentice",https://www.imdb.com/title/tt8368368,Movie,7.1,122,2024,"Biography, Drama, History",66776,"2024-10-11","Ali Abbasi"
tt31806037,8,2025-04-07,"Adolescence","Adolescence",https://www.imdb.com/title/tt31806037,TV Mini Series,8.1,60,2025,"Crime, Drama, Thriller",253649,"2025-03-13",
tt21191806,4,2025-01-18,"Back in Action","Back in Action",https://www.imdb.com/title/tt21191806,Movie,5.9,114,2025,"Action, Comedy",63093,"2025-01-17","Seth Gordon"
tt0852713,3,2025-01-05,"The House Bunny","The House Bunny",https://www.imdb.com/title/tt0852713,Movie,5.6,97,2008,"Comedy",94495,"2008-08-22","Fred Wolf"
tt17526714,8,2024-12-30,"The Substance","The Substance",https://www.imdb.com/title/tt17526714,Movie,7.2,141,2024,"Drama, Horror, Sci-Fi",362778,"2024-09-20","Coralie Fargeat"
tt13833688,8,2024-12-25,"The Whale","The Whale",https://www.imdb.com/title/tt13833688,Movie,7.6,117,2022,"Drama",255924,"2022-12-21","Darren Aronofsky"
tt18224682,4,2024-12-15,"Biggest Heist Ever","Biggest Heist Ever",https://www.imdb.com/title/tt18224682,Movie,6.1,85,2024,"Documentary, Biography, Crime",1728,"2024-12-06","Chris Smith"
tt10245072,2,2024-12-02,"Salem's Lot","Salem's Lot",https://www.imdb.com/title/tt10245072,Movie,5.6,114,2024,"Horror, Thriller",38929,"2024-10-03","Gary Dauberman"
tt34139335,7,2024-11-30,"Return of the King: The Fall and Rise of Elvis Presley","Return of the King: The Fall and Rise of Elvis Presley",https://www.imdb.com/title/tt34139335,Movie,7.6,90,2024,"Documentary, Music",2203,"2024-11-13","Jason Hehir"
tt34350086,6,2024-11-30,"Buy Now! The Shopping Conspiracy","Buy Now! The Shopping Conspiracy",https://www.imdb.com/title/tt34350086,Movie,6.7,84,2024,"Documentary",7521,"2024-11-20","Nic Stacey"
tt0480687,4,2024-11-30,"Hall Pass","Hall Pass",https://www.imdb.com/title/tt0480687,Movie,5.9,105,2011,"Comedy, Romance",135034,"2011-02-25","Bobby Farrelly,Peter Farrelly"
tt2170439,4,2024-11-30,"Horrible Bosses 2","Horrible Bosses 2",https://www.imdb.com/title/tt2170439,Movie,6.3,108,2014,"Comedy, Crime",191596,"2014-11-26","Sean Anders"
tt15571732,4,2024-11-07,"Agatha All Along","Agatha All Along",https://www.imdb.com/title/tt15571732,TV Mini Series,7.2,40,2024,"Comedy, Action, Adventure, Fantasy, Sci-Fi, Drama",84686,"2024-09-18",
tt13507778,6,2024-11-04,"No Man of God","No Man of God",https://www.imdb.com/title/tt13507778,Movie,6.4,100,2021,"Biography, Crime, Drama, Mystery",10141,"2021-08-27","Amber Sealey"
tt7721046,7,2024-11-01,"Los Espookys","Los Espookys",https://www.imdb.com/title/tt7721046,TV Series,7.5,30,2018,"Comedy, Horror, Fantasy, Mystery",3074,"2019-06-14",
tt1608290,3,2024-09-17,"Zoolander 2","Zoolander 2",https://www.imdb.com/title/tt1608290,Movie,4.7,101,2016,"Comedy, Action, Adventure, Mystery, Romance",80385,"2016-02-12","Ben Stiller"
tt11126994,8,2024-09-14,"Arcane","Arcane: League of Legends",https://www.imdb.com/title/tt11126994,TV Series,9.0,40,2021,"Animation, Action, Adventure, Drama, Fantasy, Sci-Fi",420408,"2021-11-06",
tt20096840,8,2024-09-01,"The Messiah","La Mesías",https://www.imdb.com/title/tt20096840,TV Series,8.0,66,2023,"Thriller",3581,"2023-10-11",
tt5753856,7,2024-08-31,"Dark","Dark",https://www.imdb.com/title/tt5753856,TV Series,8.7,60,2017,"Mystery, Crime, Drama, Thriller, Sci-Fi",514200,"2017-12-01",
tt0118421,8,2024-08-31,"Oz","Oz",https://www.imdb.com/title/tt0118421,TV Series,8.7,60,1997,"Crime, Drama, Thriller",114626,"1997-07-12",
tt0384766,8,2024-08-31,"Rome","Rome",https://www.imdb.com/title/tt0384766,TV Series,8.7,60,2005,"Action, Drama, War, Romance",199682,"2005-08-28",
tt0248654,7,2024-08-31,"Six Feet Under","Six Feet Under",https://www.imdb.com/title/tt0248654,TV Series,8.7,60,2001,"Comedy, Drama",163592,"2001-06-03",
tt1424432,7,2024-08-30,"Senna","Senna",https://www.imdb.com/title/tt1424432,Movie,8.5,106,2010,"Documentary, Biography, Sport",82835,"2011-05-25","Asif Kapadia"
tt10383046,8,2024-08-30,"Veneno","Veneno",https://www.imdb.com/title/tt10383046,TV Series,8.6,,2020,"Biography, Drama",5166,"2020-11-19",
tt2406566,6,2024-08-30,"Atomic Blonde","Atomic Blonde",https://www.imdb.com/title/tt2406566,Movie,6.7,115,2017,"Thriller, Action",217262,"2017-07-28","David Leitch"
tt12037194,7,2024-08-30,"Furiosa: A Mad Max Saga","Furiosa: A Mad Max Saga",https://www.imdb.com/title/tt12037194,Movie,7.5,148,2024,"Action, Adventure, Sci-Fi",307769,"2024-05-24","George Miller"
tt0811080,7,2024-08-17,"Speed Racer","Speed Racer",https://www.imdb.com/title/tt0811080,Movie,6.1,135,2008,"Action, Family, Sport, Sci-Fi, Adventure, Comedy, Drama",82232,"2008-05-09","Lana Wachowski,Lilly Wachowski"
tt15358446,6,2024-06-05,"Dead Boy Detectives","Dead Boy Detectives",https://www.imdb.com/title/tt15358446,TV Series,7.5,60,2024,"Fantasy, Mystery, Action, Adventure, Comedy, Drama, Crime, Horror",22556,"2024-04-25",
tt14230458,9,2024-03-10,"Poor Things","Poor Things",https://www.imdb.com/title/tt14230458,Movie,7.8,141,2023,"Romance, Sci-Fi, Comedy, Drama",359972,"2023-12-22","Yorgos Lanthimos"
tt30796448,7,2024-02-04,"The Greatest Night in Pop","The Greatest Night in Pop",https://www.imdb.com/title/tt30796448,Movie,7.9,96,2024,"Documentary, Music",15748,"2024-01-29","Bao Nguyen"
tt27997713,7,2024-02-04,"Baby Bandito","Baby Bandito",https://www.imdb.com/title/tt27997713,TV Series,5.9,40,2024,"Crime, Action, Drama, Thriller",842,"2024-01-31",
tt12312250,7,2024-01-14,"Jeffrey Epstein: Filthy Rich","Jeffrey Epstein: Filthy Rich",https://www.imdb.com/title/tt12312250,TV Mini Series,7.1,60,2020,"Documentary, Crime",31518,"2020-05-27",
tt15398776,8,2024-01-01,"Oppenheimer","Oppenheimer",https://www.imdb.com/title/tt15398776,Movie,8.3,180,2023,"Biography, Drama, History",957311,"2023-07-21","Christopher Nolan"
tt9603212,7,2024-01-01,"Mission: Impossible - Dead Reckoning Part One","Mission: Impossible - Dead Reckoning Part One",https://www.imdb.com/title/tt9603212,Movie,7.6,163,2023,"Action, Adventure, Thriller",316250,"2023-07-12","Christopher McQuarrie"
tt12747748,5,2024-01-01,"Leave the World Behind","Leave the World Behind",https://www.imdb.com/title/tt12747748,Movie,6.4,138,2023,"Drama, Thriller, Mystery",235983,"2023-12-08","Sam Esmail"
tt13309742,9,2023-12-26,"Blue Eye Samurai","Blue Eye Samurai",https://www.imdb.com/title/tt13309742,TV Series,8.7,45,2023,"Animation, Action, Adventure, Drama, Thriller, History",98212,"2023-11-03",
tt6692188,7,2023-12-21,"El Chapo","El Chapo",https://www.imdb.com/title/tt6692188,TV Series,7.8,43,2017,"Drama, Crime, Biography, History",21926,"2017-04-23",
tt2187850,9,2023-12-21,"Pablo Escobar: El Patrón del Mal","Pablo Escobar: El Patrón del Mal",https://www.imdb.com/title/tt2187850,TV Series,8.4,45,2012,"Biography, Crime, Drama, History, Thriller",6709,"2021-02-03",
tt1704637,8,2023-12-21,"La Reina del Sur","La Reina del Sur",https://www.imdb.com/title/tt1704637,TV Series,7.8,378,2011,"Drama, Action, Crime, Thriller",3813,"2011-02-28",
tt9224104,1,2023-09-30,"Meg 2: The Trench","Meg 2: The Trench",https://www.imdb.com/title/tt9224104,Movie,5.0,116,2023,"Sci-Fi, Action, Adventure, Horror, Thriller",98465,"2023-08-04","Ben Wheatley"
tt9244578,8,2023-09-24,"Rise of Empires: Ottoman","Rise of Empires: Ottoman",https://www.imdb.com/title/tt9244578,TV Series,8.0,45,2020,"Documentary, History, Drama, War",46914,"2020-09-10",
tt11737520,8,2023-09-20,"One Piece","One Piece",https://www.imdb.com/title/tt11737520,TV Series,8.3,60,2023,"Action, Fantasy, Adventure, Drama, Comedy",181805,"2023-08-31",
tt21113540,7,2023-09-16,"El Conde","El conde",https://www.imdb.com/title/tt21113540,Movie,6.4,110,2023,"Comedy, Fantasy, History, Horror",15925,"2023-09-15","Pablo Larraín"
tt9251798,7,2023-09-02,"Ragnarok","Ragnarok",https://www.imdb.com/title/tt9251798,TV Series,7.3,45,2020,"Drama, Fantasy, Mystery, Action, Thriller",53090,"2020-01-31",
tt1462764,6,2023-09-02,"Indiana Jones and the Dial of Destiny","Indiana Jones and the Dial of Destiny",https://www.imdb.com/title/tt1462764,Movie,6.5,154,2023,"Action, Adventure, Sci-Fi",226761,"2023-06-30","James Mangold"
tt0439572,1,2023-07-25,"The Flash","The Flash",https://www.imdb.com/title/tt0439572,Movie,6.6,144,2023,"Action, Adventure, Fantasy, Sci-Fi",242337,"2023-06-16","Andy Muschietti"
tt1517268,7,2023-07-24,"Barbie","Barbie",https://www.imdb.com/title/tt1517268,Movie,6.8,114,2023,"Comedy, Adventure, Fantasy",632568,"2023-07-21","Greta Gerwig"
tt6791350,5,2023-07-17,"Guardians of the Galaxy Vol. 3","Guardians of the Galaxy Vol. 3",https://www.imdb.com/title/tt6791350,Movie,7.9,150,2023,"Action, Adventure, Sci-Fi, Comedy",452904,"2023-05-05","James Gunn"
tt5090568,5,2023-07-17,"Transformers: Rise of the Beasts","Transformers: Rise of the Beasts",https://www.imdb.com/title/tt5090568,Movie,6.0,127,2023,"Action, Adventure, Sci-Fi",127569,"2023-06-09","Steven Caple Jr."
tt0046912,8,2023-06-19,"Dial M for Murder","Dial M for Murder",https://www.imdb.com/title/tt0046912,Movie,8.2,105,1954,"Crime, Mystery, Drama, Thriller",201749,"1954-05-29","Alfred Hitchcock"
tt0363547,6,2023-06-18,"Dawn of the Dead","Dawn of the Dead",https://www.imdb.com/title/tt0363547,Movie,7.2,101,2004,"Horror, Action",285341,"2004-03-19","Zack Snyder"
tt11358390,7,2023-06-18,"Renfield","Renfield",https://www.imdb.com/title/tt11358390,Movie,6.4,93,2023,"Comedy, Horror, Fantasy, Action",117033,"2023-04-14","Chris McKay"
tt6543652,7,2023-06-18,"Cold War","Zimna wojna",https://www.imdb.com/title/tt6543652,Movie,7.5,89,2018,"Drama, Romance, Music",64698,"2018-06-08","Pawel Pawlikowski"
tt9253866,8,2023-05-01,"Our Planet","Our Planet",https://www.imdb.com/title/tt9253866,TV Series,9.2,50,2019,"Documentary",59508,"2019-04-05"
`;

export const AFI_LIST: AfiEntry[] = [
    { Rank: 1, Title: "Citizen Kane", Year: 1941 },
    { Rank: 2, Title: "The Godfather", Year: 1972 },
    { Rank: 3, Title: "Casablanca", Year: 1942 },
    { Rank: 4, Title: "Raging Bull", Year: 1980 },
    { Rank: 5, Title: "Singin' in the Rain", Year: 1952 },
    { Rank: 6, Title: "Gone with the Wind", Year: 1939 },
    { Rank: 7, Title: "Lawrence of Arabia", Year: 1962 },
    { Rank: 8, Title: "Schindler's List", Year: 1993 },
    { Rank: 9, Title: "Vertigo", Year: 1958 },
    { Rank: 10, Title: "The Wizard of Oz", Year: 1939 },
    { Rank: 11, Title: "City Lights", Year: 1931 },
    { Rank: 12, Title: "The Searchers", Year: 1956 },
    { Rank: 13, Title: "Star Wars", Year: 1977 },
    { Rank: 14, Title: "Psycho", Year: 1960 },
    { Rank: 15, Title: "2001: A Space Odyssey", Year: 1968 },
    { Rank: 16, Title: "Sunset Boulevard", Year: 1950 },
    { Rank: 17, Title: "The Graduate", Year: 1967 },
    { Rank: 18, Title: "The General", Year: 1926 },
    { Rank: 19, Title: "On the Waterfront", Year: 1954 },
    { Rank: 20, Title: "It's a Wonderful Life", Year: 1946 },
    { Rank: 21, Title: "Chinatown", Year: 1974 },
    { Rank: 22, Title: "Some Like It Hot", Year: 1959 },
    { Rank: 23, Title: "The Grapes of Wrath", Year: 1940 },
    { Rank: 24, Title: "E.T. the Extra-Terrestrial", Year: 1982 },
    { Rank: 25, Title: "To Kill a Mockingbird", Year: 1962 },
    { Rank: 26, Title: "Mr. Smith Goes to Washington", Year: 1939 },
    { Rank: 27, Title: "High Noon", Year: 1952 },
    { Rank: 28, Title: "All About Eve", Year: 1950 },
    { Rank: 29, Title: "Double Indemnity", Year: 1944 },
    { Rank: 30, Title: "Apocalypse Now", Year: 1979 },
    { Rank: 31, Title: "The Maltese Falcon", Year: 1941 },
    { Rank: 32, Title: "The Godfather Part II", Year: 1974 },
    { Rank: 33, Title: "One Flew Over the Cuckoo's Nest", Year: 1975 },
    { Rank: 34, Title: "Snow White and the Seven Dwarfs", Year: 1937 },
    { Rank: 35, Title: "Annie Hall", Year: 1977 },
    { Rank: 36, Title: "The Bridge on the River Kwai", Year: 1957 },
    { Rank: 37, Title: "The Best Years of Our Lives", Year: 1946 },
    { Rank: 38, Title: "The Treasure of the Sierra Madre", Year: 1948 },
    { Rank: 39, Title: "Dr. Strangelove", Year: 1964 },
    { Rank: 40, "Title": "The Sound of Music", "Year": 1965 },
    { Rank: 41, Title: "King Kong", Year: 1933 },
    { Rank: 42, Title: "Bonnie and Clyde", Year: 1967 },
    { Rank: 43, Title: "Midnight Cowboy", Year: 1969 },
    { Rank: 44, Title: "The Philadelphia Story", Year: 1940 },
    { Rank: 45, Title: "Shane", Year: 1953 },
    { Rank: 46, Title: "It Happened One Night", Year: 1934 },
    { Rank: 47, Title: "A Streetcar Named Desire", Year: 1951 },
    { Rank: 48, Title: "Rear Window", Year: 1954 },
    { Rank: 49, Title: "Intolerance", Year: 1916 },
    { Rank: 50, Title: "The Lord of the Rings: The Fellowship of the Ring", Year: 2001 },
    { Rank: 51, Title: "West Side Story", Year: 1961 },
    { Rank: 52, Title: "Taxi Driver", Year: 1976 },
    { Rank: 53, Title: "The Deer Hunter", Year: 1978 },
    { Rank: 54, Title: "M*A*S*H", Year: 1970 },
    { Rank: 55, Title: "North by Northwest", Year: 1959 },
    { Rank: 56, Title: "Jaws", Year: 1975 },
    { Rank: 57, Title: "Rocky", Year: 1976 },
    { Rank: 58, Title: "The Gold Rush", Year: 1925 },
    { Rank: 59, Title: "Nashville", Year: 1975 },
    { Rank: 60, Title: "Duck Soup", Year: 1933 },
    { Rank: 61, Title: "Sullivan's Travels", Year: 1941 },
    { Rank: 62, Title: "American Graffiti", Year: 1973 },
    { Rank: 63, Title: "Cabaret", Year: 1972 },
    { Rank: 64, Title: "Network", Year: 1976 },
    { Rank: 65, "Title": "The African Queen", "Year": 1951 },
    { Rank: 66, Title: "Raiders of the Lost Ark", Year: 1981 },
    { Rank: 67, Title: "Who's Afraid of Virginia Woolf?", Year: 1966 },
    { Rank: 68, Title: "Unforgiven", Year: 1992 },
    { Rank: 69, Title: "Tootsie", Year: 1982 },
    { Rank: 70, Title: "A Clockwork Orange", Year: 1971 },
    { Rank: 71, Title: "Saving Private Ryan", Year: 1998 },
    { Rank: 72, Title: "The Shawshank Redemption", Year: 1994 },
    { Rank: 73, Title: "Butch Cassidy and the Sundance Kid", Year: 1969 },
    { Rank: 74, Title: "The Silence of the Lambs", Year: 1991 },
    { Rank: 75, Title: "Forrest Gump", Year: 1994 },
    { Rank: 76, Title: "All the President's Men", Year: 1976 },
    { Rank: 77, Title: "Modern Times", Year: 1936 },
    { Rank: 78, Title: "The Wild Bunch", Year: 1969 },
    { Rank: 79, Title: "The Apartment", Year: 1960 },
    { Rank: 80, Title: "Spartacus", Year: 1960 },
    { Rank: 81, Title: "Sunrise: A Song of Two Humans", Year: 1927 },
    { Rank: 82, Title: "Titanic", Year: 1997 },
    { Rank: 83, Title: "Easy Rider", Year: 1969 },
    { Rank: 84, Title: "A Night at the Opera", Year: 1935 },
    { Rank: 85, Title: "Platoon", Year: 1986 },
    { Rank: 86, Title: "12 Angry Men", Year: 1957 },
    { Rank: 87, Title: "Bringing Up Baby", Year: 1938 },
    { Rank: 88, Title: "The Sixth Sense", Year: 1999 },
    { Rank: 89, Title: "Swing Time", Year: 1936 },
    { Rank: 90, Title: "Sophie's Choice", Year: 1982 },
    { Rank: 91, Title: "Goodfellas", Year: 1990 },
    { Rank: 92, Title: "The French Connection", Year: 1971 },
    { Rank: 93, Title: "Pulp Fiction", Year: 1994 },
    { Rank: 94, Title: "The Last Picture Show", Year: 1971 },
    { Rank: 95, Title: "Do the Right Thing", Year: 1989 },
    { Rank: 96, Title: "Blade Runner", Year: 1982 },
    { Rank: 97, Title: "Yankee Doodle Dandy", Year: 1942 },
    { Rank: 98, Title: "Toy Story", Year: 1995 },
    { Rank: 99, Title: "Ben-Hur", Year: 1959 },
    { Rank: 100, Title: "The Gold Rush", Year: 1925 }
];

export const MOCK_OSCAR_DATA: OscarNomination[] = [
  // 2024 (96th Academy Awards) - honoring films from 2023
  { year: 2024, category: "Mejor Película", film: "Oppenheimer", nominee: "Emma Thomas, Charles Roven y Christopher Nolan", winner: true },
  { year: 2024, category: "Mejor Película", film: "American Fiction", nominee: "Ben LeClair, Nikos Karamigios, Cord Jefferson y Jermaine Johnson", winner: false },
  { year: 2024, category: "Mejor Película", film: "Anatomy of a Fall", nominee: "Marie-Ange Luciani y David Thion", winner: false },
  { year: 2024, category: "Mejor Película", film: "Barbie", nominee: "David Heyman, Margot Robbie, Tom Ackerley y Robbie Brenner", winner: false },
  { year: 2024, category: "Mejor Película", film: "The Holdovers", nominee: "Mark Johnson", winner: false },
  { year: 2024, category: "Mejor Película", film: "Killers of the Flower Moon", nominee: "Dan Friedkin, Bradley Thomas, Martin Scorsese y Daniel Lupi", winner: false },
  { year: 2024, category: "Mejor Película", film: "Maestro", nominee: "Bradley Cooper, Steven Spielberg, Fred Berner, Amy Durning y Kristie Macosko Krieger", winner: false },
  { year: 2024, category: "Mejor Película", film: "Past Lives", nominee: "David Hinojosa, Christine Vachon y Pamela Koffler", winner: false },
  { year: 2024, category: "Mejor Película", film: "Poor Things", nominee: "Ed Guiney, Andrew Lowe, Yorgos Lanthimos y Emma Stone", winner: false },
  { year: 2024, category: "Mejor Película", film: "The Zone of Interest", nominee: "James Wilson", winner: false },

  { year: 2024, category: "Mejor Director", film: "Oppenheimer", nominee: "Christopher Nolan", winner: true },
  { year: 2024, category: "Mejor Director", film: "Anatomy of a Fall", nominee: "Justine Triet", winner: false },
  { year: 2024, category: "Mejor Director", film: "Killers of the Flower Moon", nominee: "Martin Scorsese", winner: false },
  { year: 2024, category: "Mejor Director", film: "Poor Things", nominee: "Yorgos Lanthimos", winner: false },
  { year: 2024, category: "Mejor Director", film: "The Zone of Interest", nominee: "Jonathan Glazer", winner: false },

  { year: 2024, category: "Mejor Actor", film: "Oppenheimer", nominee: "Cillian Murphy", winner: true },
  { year: 2024, category: "Mejor Actor", film: "Maestro", nominee: "Bradley Cooper", winner: false },
  { year: 2024, category: "Mejor Actor", film: "Rustin", nominee: "Colman Domingo", winner: false },
  { year: 2024, category: "Mejor Actor", film: "The Holdovers", nominee: "Paul Giamatti", winner: false },
  { year: 2024, category: "Mejor Actor", film: "American Fiction", nominee: "Jeffrey Wright", winner: false },

  { year: 2024, category: "Mejor Actriz", film: "Poor Things", nominee: "Emma Stone", winner: true },
  { year: 2024, category: "Mejor Actriz", film: "Nyad", nominee: "Annette Bening", winner: false },
  { year: 2024, category: "Mejor Actriz", film: "Killers of the Flower Moon", nominee: "Lily Gladstone", winner: false },
  { year: 2024, category: "Mejor Actriz", film: "Anatomy of a Fall", nominee: "Sandra Hüller", winner: false },
  { year: 2024, category: "Mejor Actriz", film: "Maestro", nominee: "Carey Mulligan", winner: false },

  { year: 2024, category: "Mejor Actor de Reparto", film: "Oppenheimer", nominee: "Robert Downey Jr.", winner: true },
  { year: 2024, category: "Mejor Actor de Reparto", film: "American Fiction", nominee: "Sterling K. Brown", winner: false },
  { year: 2024, category: "Mejor Actor de Reparto", film: "Killers of the Flower Moon", nominee: "Robert De Niro", winner: false },
  { year: 2024, category: "Mejor Actor de Reparto", film: "Barbie", nominee: "Ryan Gosling", winner: false },
  { year: 2024, category: "Mejor Actor de Reparto", film: "Poor Things", nominee: "Mark Ruffalo", winner: false },

  { year: 2024, category: "Mejor Actriz de Reparto", film: "The Holdovers", nominee: "Da'Vine Joy Randolph", winner: true },
  { year: 2024, category: "Mejor Actriz de Reparto", film: "Oppenheimer", nominee: "Emily Blunt", winner: false },
  { year: 2024, category: "Mejor Actriz de Reparto", film: "The Color Purple", nominee: "Danielle Brooks", winner: false },
  { year: 2024, category: "Mejor Actriz de Reparto", film: "Barbie", nominee: "America Ferrera", winner: false },
  { year: 2024, category: "Mejor Actriz de Reparto", film: "Nyad", nominee: "Jodie Foster", winner: false },

  // 2023 (95th Academy Awards) - honoring films from 2022
  { year: 2023, category: "Mejor Película", film: "Everything Everywhere All at Once", nominee: "Daniel Kwan, Daniel Scheinert y Jonathan Wang", winner: true },
  { year: 2023, category: "Mejor Película", film: "All Quiet on the Western Front", nominee: "Malte Grunert", winner: false },
  { year: 2023, category: "Mejor Película", film: "Avatar: The Way of Water", nominee: "James Cameron y Jon Landau", winner: false },
  { year: 2023, category: "Mejor Película", film: "The Banshees of Inisherin", nominee: "Graham Broadbent, Pete Czernin y Martin McDonagh", winner: false },
  { year: 2023, category: "Mejor Película", film: "Elvis", nominee: "Baz Luhrmann, Catherine Martin, Gail Berman, Patrick McCormick y Schuyler Weiss", winner: false },
  { year: 2023, category: "Mejor Película", film: "The Fabelmans", nominee: "Kristie Macosko Krieger, Steven Spielberg y Tony Kushner", winner: false },
  { year: 2023, category: "Mejor Película", film: "Tár", nominee: "Todd Field, Alexandra Milchan y Scott Lambert", winner: false },
  { year: 2023, category: "Mejor Película", film: "Top Gun: Maverick", nominee: "Tom Cruise, Christopher McQuarrie, David Ellison y Jerry Bruckheimer", winner: false },
  { year: 2023, category: "Mejor Película", film: "Triangle of Sadness", nominee: "Erik Hemmendorff y Philippe Bober", winner: false },
  { year: 2023, category: "Mejor Película", film: "Women Talking", nominee: "Dede Gardner, Jeremy Kleiner y Frances McDormand", winner: false },

  { year: 2023, category: "Mejor Director", film: "Everything Everywhere All at Once", nominee: "Daniel Kwan y Daniel Scheinert", winner: true },
  { year: 2023, category: "Mejor Director", film: "The Banshees of Inisherin", nominee: "Martin McDonagh", winner: false },
  { year: 2023, category: "Mejor Director", film: "The Fabelmans", nominee: "Steven Spielberg", winner: false },
  { year: 2023, category: "Mejor Director", film: "Tár", nominee: "Todd Field", winner: false },
  { year: 2023, category: "Mejor Director", film: "Triangle of Sadness", nominee: "Ruben Östlund", winner: false },

  { year: 2023, category: "Mejor Actor", film: "The Whale", nominee: "Brendan Fraser", winner: true },
  { year: 2023, category: "Mejor Actor", film: "Elvis", nominee: "Austin Butler", winner: false },
  { year: 2023, category: "Mejor Actor", film: "The Banshees of Inisherin", nominee: "Colin Farrell", winner: false },
  { year: 2023, category: "Mejor Actor", film: "Aftersun", nominee: "Paul Mescal", winner: false },
  { year: 2023, category: "Mejor Actor", film: "Living", nominee: "Bill Nighy", winner: false },

  { year: 2023, category: "Mejor Actriz", film: "Everything Everywhere All at Once", nominee: "Michelle Yeoh", winner: true },
  { year: 2023, category: "Mejor Actriz", film: "Tár", nominee: "Cate Blanchett", winner: false },
  { year: 2023, category: "Mejor Actriz", film: "Blonde", nominee: "Ana de Armas", winner: false },
  { year: 2023, category: "Mejor Actriz", film: "To Leslie", nominee: "Andrea Riseborough", winner: false },
  { year: 2023, category: "Mejor Actriz", film: "The Fabelmans", nominee: "Michelle Williams", winner: false },
];
