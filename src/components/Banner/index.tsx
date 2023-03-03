import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import styles from "./Banner.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface BannerProps {
  banners: {
    id: string;
    src: string;
    link: string;
    createdAt: string;
  }[];
}

export default function Banner(props: BannerProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      navigation
      autoplay={true}
      pagination={{ clickable: true }}
      id={styles.banner}
    >
      {props.banners.map((banner) => {
        return (
          <SwiperSlide>
            <Link href={banner.link}>
            <Image
              src={banner.src}
              alt="banner de um canal ou filme"
              width={883}
              height={267}
              className={styles.bannerImage}
            />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
