import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper';
import styles from "./Banner.module.css";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      navigation
      autoplay={true}
      pagination={{ clickable: true }}
      id={styles.banner}
    >
      <SwiperSlide>
        <Image
          src="http://localhost:3000/banners/banner1.jpeg"
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="http://localhost:3000/banners/banner1.jpeg"
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="http://localhost:3000/banners/banner1.jpeg"
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="http://localhost:3000/banners/banner1.jpeg"
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
    </Swiper>
  );
}
