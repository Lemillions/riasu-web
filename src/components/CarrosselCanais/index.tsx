import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper";
import styles from "./Carrossel.module.css";
import "swiper/css/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
interface propsCarrossel {
  filmesOuCanal: FilmeOuCanal[];
}

export default function CarrosselCanais(props: propsCarrossel) {
  const { filmesOuCanal } = props;
  const [width, setWidth] = useState(0);
  const swiperRef = useRef<SwiperType | null>();
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const resize = () => {
    if (swiperRef) {
      setWidth(swiperRef.current?.width || 230);
    }
  };
  useEffect(() => {
    setWidth(swiperRef.current?.width || 230);
    window.addEventListener("resize", resize);
  }, []);
  return (
    <div className={styles.slideContainer}>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerGroup={width > 500?Math.floor(width / 233):Math.floor(width / (233*0.5))}
        slidesPerView={(width > 500?Math.floor(width / 233):Math.floor(width / (233*0.5))) + 0.3}
        spaceBetween={15}
        autoplay={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(Swiper) => {
          setIsEnd(Swiper.isEnd);
          setIsBeginning(Swiper.isBeginning);
        }}
        
      >
        {filmesOuCanal.map((filmeOuCanal) => (
          <SwiperSlide key={filmeOuCanal.id} className={styles.cardFlmeOuCanal}>
            <Link
              href={`../canais/${filmeOuCanal.id}`}
              style={{ cursor: "pointer", color: "#ffe1dd", marginRight: "5px" }}
            >
              <Image
                src={filmeOuCanal.banner}
                width={width > 500?203:203*0.5}
                height={width > 500?135:135*0.5}
                alt={filmeOuCanal.name}
              />
              <h3 className={styles.titulo}>{filmeOuCanal.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={styles.shadowRight}
        style={isEnd ? { display: "none" } : {}}
        onClick={() => swiperRef.current?.slideNext()}
      />
      <div
        className={styles.shadowLeft}
        style={isBeginning ? { display: "none" } : {}}
        onClick={() => swiperRef.current?.slidePrev()}
      />
    </div>
  );
}
