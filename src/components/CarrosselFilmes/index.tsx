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

export default function CarrosselFilmes(props: propsCarrossel) {
  const { filmesOuCanal } = props;
  const [width, setWidth] = useState(0);
  const swiperRef = useRef<SwiperType  | null>();
  const resize = () => {
    if (swiperRef) {
      setWidth(swiperRef.current?.width || 230);
    }
  };
console.log(filmesOuCanal)
  useEffect(() => {
    setWidth(swiperRef.current?.width || 230);
    window.addEventListener('resize', resize)
  }, []);
  return (
    <div className={styles.slideContainer}>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerGroup={Math.floor(width / 233)}
        slidesPerView={Math.floor(width / 233) + 0.3}
        spaceBetween={30}
        autoplay={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {filmesOuCanal.map((filmeOuCanal) => (
          <SwiperSlide key={filmeOuCanal.id}>
            <Link href={`../filmes/${filmeOuCanal.id}`} style={{cursor:'pointer', color:'white', marginRight: '5px'}}>
            <Image
              src={filmeOuCanal.banner}
              width={203}
              height={135}
              alt={filmeOuCanal.name}
            />
            <h3>{filmeOuCanal.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.shadowRight} onClick={() => swiperRef.current?.slideNext()} />
      <div className={styles.shadowLeft} onClick={() => swiperRef.current?.slidePrev()} />

    </div>
  );
}
