import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import styles from "./LivePlayer.module.css";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { BsFillVolumeOffFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";

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
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [levels, setLevels] = useState<any[]>([]);
  const [legendas, setLegendas] = useState<any[]>();
  const [audioTracks, setAudioTracks] = useState<any[]>([]);
  const [audioSelecionado, setAudioSelecionado] = useState(0);
  const [legendasSelecionadas, setLegendasSelecionadas] = useState<any>();
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && playerRef.current) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(canal.src);
      hls.attachMedia(playerRef?.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        setLevels(hls.levels);
        hls.currentLevel = currentLevel;
        if (playerRef.current) {
          playerRef.current.play();
        }
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.log("fatal network error encountered, try to recover");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("fatal media error encountered, try to recover");
              hls.recoverMediaError();
              break;
            default:
              // cannot recover
              hls.destroy();
              break;
          }
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
      if (value > 0) {
        playerRef.current.muted = false;
        setMuted(false);
      } else {
        playerRef.current.muted = true;
        setMuted(true);
      }
    }
    setVolume(value);
  };

  const handleFullScreen = () => {
    if (containerRef.current) {
      if (fullscren) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
    setFullscreen(!fullscren);
  };

  function debounce(
    this: any,
    func: Function,
    timeout: number = 300
  ): (...args: any[]) => void {
    let timer: ReturnType<typeof setTimeout> | null;

    return (...args: any[]): void => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function sumirControle() {
    setShowControls(false);
  }
  const processChange = debounce(sumirControle, 4000);

  const carregarAudiosELegendas = () => {
    let legendasMap = [];
    for (let i = 0; i < (playerRef.current?.textTracks.length || 0); i++) {
      legendasMap.push({
        id: i,
        label: playerRef.current?.textTracks[i].label,
      });
    }
    setLegendas(legendasMap);
    if (hlsRef.current) {
      let audiosMap = [];
      for (let i = 0; i < (hlsRef.current?.audioTracks.length || 0); i++) {
        audiosMap.push({
          id: i,
          name: hlsRef.current?.audioTracks[i].name,
        });
      }
      setAudioTracks(audiosMap);
      hlsRef.current.audioTrack = 0;
    }
  };

  const handleLegendas = (id: number) => {
    legendas?.forEach((legenda) => {
      if (playerRef.current) {
        playerRef.current.textTracks[legenda.id].mode = "hidden";
      }
    });
    if (playerRef.current?.textTracks[id]) {
      playerRef.current.textTracks[id].mode = "showing";
    }
    setLegendasSelecionadas(id);
  };

  const handleAudio = (id: number) => {
    if (hlsRef.current) {
      hlsRef.current.audioTrack = id;
      setAudioSelecionado(id);
    }
  };

  return (
    <div
      id={styles.playerContainer}
      ref={containerRef}
      onMouseMove={() => {
        setShowControls(true);
        processChange();
      }}
    >
      <video
        ref={playerRef}
        controls={false}
        muted={muted}
        autoPlay={true}
        id={styles.player}
        onLoadedMetadata={() => {
          carregarAudiosELegendas();
        }}
      />
      <div
        id={styles.controlesContainer}
        style={showControls ? { opacity: 1 } : { opacity: 0 }}
      >
        <div className={styles.controles}>
          <div className={styles.controle} onClick={() => handlePlay()}>
            {playing ? <GiPauseButton size={20} /> : <FaPlay size={16} />}
          </div>
          <div className={styles.controle}>
            {!muted ? (
              <BsFillVolumeOffFill size={30} onClick={() => setMuted(true)} />
            ) : (
              <BsFillVolumeMuteFill
                size={30}
                onClick={() => setMuted(!volume)}
              />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
              style={{
                background:
                  "linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%)",
              }}
            />
          </div>
        </div>
        <div className={styles.controles}>
          <div className={styles.controle}>
            <select
              value={currentLevel}
              onChange={(e) => {
                setCurrentLevel(Number(e.target.value));
                if (hlsRef.current) {
                  hlsRef.current.currentLevel = Number(e.target.value);
                }
              }}
            >
              <option value={-1}>Auto</option>
              {levels.map((level, index) => (
                <option key={index} value={index}>
                  {level.height}p
                </option>
              ))}
            </select>
          </div>

          <div className={styles.controle}>
            <select
              value={legendasSelecionadas}
              onChange={(e) => {
                handleLegendas(Number(e.target.value));
              }}
            >
              <option value={-1}>Sem legenda</option>
              {legendas?.map((legenda, index) => (
                <option key={index} value={index}>
                  {legenda.label}
                </option>
              ))}
            </select>
          </div>
          {audioTracks?.length > 0 && (
            <div className={styles.controle}>
              <select
                value={audioSelecionado}
                onChange={(e) => {
                  handleAudio(Number(e.target.value));
                }}
              >
                {audioTracks?.map((audio, index) => (
                  <option key={index} value={index}>
                    {audio.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className={styles.controle} onClick={() => handleFullScreen()}>
            {fullscren ? (
              <RiFullscreenExitLine size={20} />
            ) : (
              <RiFullscreenLine size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
