import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper';
import styles from "./Banner.module.css";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner from "../../../public/banners/banner1.jpeg"

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
          src={banner}
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src={banner}
          alt="banner1"
          width={883}
          height={267}
          className={styles.bannerImage}
        />
      </SwiperSlide>
    </Swiper>
  );
}
