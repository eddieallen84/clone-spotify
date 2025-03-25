import React, { useState } from "react";
import Player from "../components/Player";
import { Link, useParams } from "react-router-dom";
import { songsArray } from "../assets/database/songs";
import { artistArray } from "../assets/database/artists";

const Song = () => {
  const { id } = useParams();

  // Filtra a música atual com base no id
  const { image, name, duration, artist, audio } = songsArray.filter(
    (currentSongObj) => currentSongObj._id === id
  )[0];

  // Filtra o artista
  const artistObj = artistArray.filter(
    (currentArtistObj) => currentArtistObj.name === artist
  )[0];

  // Filtra as músicas do mesmo artista
  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === artist
  );

  // Gera índices aleatórios de outras músicas do mesmo artista
  const randomIndex = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );
  const randomIndex2 = Math.floor(
    Math.random() * (songsArrayFromArtist.length - 1)
  );

  const randomIdFromArtist = songsArrayFromArtist[randomIndex]._id;
  const randomId2FromArtist = songsArrayFromArtist[randomIndex2]._id;

  // Gerencia o índice da música atual
  const [currentSongIndex, setCurrentSongIndex] = useState(
    songsArrayFromArtist.findIndex((song) => song._id === id)
  );

  return (
    <div className="song">
      <div className="song__container">
        <div className="song__image-container">
          <img src={image} alt={`Imagem da música ${name}`} />
        </div>
      </div>

      <div className="song__bar">
        <Link to={`/artist/${artistObj._id}`} className="song__artist-image">
          <img
            width={75}
            height={75}
            src={artistObj.image}
            alt={`Imagem do Artista ${artist}`}
          />
        </Link>

        <Player
          duration={duration}
          randomIdFromArtist={randomIdFromArtist}
          randomId2FromArtist={randomId2FromArtist}
          audio={audio}
          songsArray={songsArrayFromArtist} // Passando o array de músicas do artista
          currentSongIndex={currentSongIndex} // Passando o índice da música atual
          setCurrentSongIndex={setCurrentSongIndex} // Passando a função para atualizar o índice
        />

        <div>
          <p className="song__name">{name}</p>
          <p>{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default Song;
