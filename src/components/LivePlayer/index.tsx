import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import styles from "./LivePlayer.module.css";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { BsFillVolumeOffFill, BsFillVolumeMuteFill } from "react-icons/bs";

interface FilmeOuCanal {
  id: string;
  name: string;
  description?: string;
  src: string;
  banner: string;
  genres: string[];
  products?: string[];
  createdAt: string;
}

export default function LivePlayer(props: { canal: FilmeOuCanal }) {
  const { canal } = props;
  const [playing, setPlaying] = useState(true);
  const [fullscren, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [muted, setMuted] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levels, setLevels] = useState<any[]>([]);
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && playerRef.current) {
      const hls = new Hls();
      hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
      hls.attachMedia(playerRef?.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        setLevels(hls.levels);
        hls.currentLevel = hls.levels.length - 1;
        setCurrentLevel(hls.currentLevel);
        
        if (playerRef.current) {
          playerRef.current.play();
        }
      });
    }

    window.addEventListener("fullscreenchange", (event) => {
      setFullscreen(document.fullscreenElement !== null);
    });
  }, []);

  const handlePlay = () => {
    if (playerRef.current) {
      if (playing) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
    setPlaying(!playing);
  };

  const handleVolume = (value: number) => {
    setVolume(value);
    if (playerRef.current) {
      playerRef.current.volume = value / 100;
      if (value> 0) {
        playerRef.current.muted = false;
        setMuted(false);
      } else {
        playerRef.current.muted = true;
        setMuted(true);
      }
    }
    setVolume(value);
  };

  return (
    <div id={styles.playerContainer}>
      <video
        ref={playerRef}
        controls={false}
        muted
        autoPlay={true}
        id={styles.player}
      />
      <div id={styles.controlesContainer}>
        <div className={styles.controles}>
          <div className={styles.controle} onClick={() => handlePlay()}>
            {playing ? (
              <GiPauseButton size={20} />
            ) : (
              <FaPlay size={16} />
            )}
          </div>
          <div className={styles.controle}>
            {!muted ? <BsFillVolumeOffFill size={30} /> : <BsFillVolumeMuteFill size={30} />}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
              style={{ background: "linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%)"}}
            />
            </div>
        </div>
        <div className={styles.controles}>
          <div className={styles.controle}>
            <select
              value={currentLevel}
              onChange={(e) => {
                if (playerRef.current) {
                  playerRef.current.playbackRate = Number(e.target.value);
                  setCurrentLevel(Number(e.target.value));
                }
              }}
            >
              {levels.reverse().map((level, index) => (
                <option key={index} value={index}>
                  {level.height}p
                </option>
              ))}
            </select>
            </div>

        </div>
      </div>
    </div>
  );
}
