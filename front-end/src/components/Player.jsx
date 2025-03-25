import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSeconds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const seconds = Number(splitArray[1]);

  return seconds + minutes * 60;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
  songsArray,
  currentSongIndex,
  setCurrentSongIndex,
}) => {
  const audioPlayer = useRef(null);
  const progressBar = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const [currentAudioUrl, setCurrentAudioUrl] = useState(audio);
  const durationInSeconds = timeInSeconds(duration);

  const currentSong = songsArray[currentSongIndex] || {};

  // Atualiza a URL do áudio sempre que o índice da música mudar
  useEffect(() => {
    if (currentSong.audioUrl) {
      setCurrentAudioUrl(currentSong.audioUrl); // Atualiza a URL do áudio
    }
  }, [currentSongIndex, currentSong.audioUrl]);

  // Função de play/pause
  const playPause = () => {
    if (audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.pause();
      } else {
        audioPlayer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Atualiza o progresso do áudio
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(formatTime(audioPlayer.current.currentTime));
        progressBar.current.style.setProperty(
          "--_progress",
          (audioPlayer.current.currentTime / durationInSeconds) * 100 + "%"
        );
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // Função para ir para a próxima música
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songsArray.length;
    setCurrentSongIndex(nextIndex);
  };

  // Função para voltar para a música anterior
  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songsArray.length) % songsArray.length;
    setCurrentSongIndex(prevIndex);
  };

  // Recarregar o áudio e tocar quando a URL de áudio for atualizada
  useEffect(() => {
    if (audioPlayer.current && currentAudioUrl) {
      audioPlayer.current.load(); // Carregar o áudio antes de tocar
      audioPlayer.current.play(); // Começar a tocar a nova música
      setIsPlaying(true); // Marcar como tocando
    }
  }, [currentAudioUrl]); // Esse effect depende de currentAudioUrl

  // Garantir que o áudio seja reiniciado quando o índice mudar
  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.pause(); // Pausa o áudio atual
      audioPlayer.current.currentTime = 0; // Reinicia a música
      audioPlayer.current.load(); // Recarrega o áudio
      setIsPlaying(false); // Reseta o estado de "tocar"
    }
  }, [currentSongIndex]); // Esse effect é acionado sempre que o índice muda

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} onClick={prevSong} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={playPause}
        />

        <Link to={`/song/${randomId2FromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} onClick={nextSong} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>

        <p>{duration}</p>
      </div>

      {/* Verifica se a música está disponível antes de tentar carregar */}
      {currentAudioUrl ? (
        <audio
          ref={audioPlayer}
          src={currentAudioUrl}
          onCanPlayThrough={() => {
            // Garantir que o áudio seja tocado quando estiver pronto
            if (audioPlayer.current && !isPlaying) {
              audioPlayer.current.play();
              setIsPlaying(true);
            }
          }}
        ></audio>
      ) : (
        <p>Carregando música...</p>
      )}
    </div>
  );
};

export default Player;
