import styles from "@/styles/Home.module.css";
import { api } from "@/services/api";
import { GetStaticProps } from "next";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import CarrosselCanais from "@/components/CarrosselCanais";
import CarrosselFilmes from "@/components/CarrosselFilmes";
import Head from "next/head";

interface Genero {
  id: string;
  name: string;
  channels: any[];
  films: any[];
  createdAt: string;
}

interface Usuario {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  products: any[];
}

interface Produto {
  id: string;
  name: string;
  channels: any[];
  films: any[];
  users?: string[];
  createdAt: string;
}

interface FilmeOuCanal {
  id: string;
  name: string;
  description?: string;
  src: string;
  banner: string;
  genres: {
    genreId: string;
    genre: {
      name: string;
    };
  }[];
  products?: string[];
  createdAt: string;
}

interface BannerType {
  id: string;
  src: string;
  link: string;
  createdAt: string;
}

interface HomeProps {
  generos: Genero[];
  filmes: FilmeOuCanal[];
  canais: FilmeOuCanal[];
  filmesAcao: FilmeOuCanal[];
  filmesComedia: FilmeOuCanal[];
  canaisEsporte: FilmeOuCanal[];
  canaisNoticias: FilmeOuCanal[];
  banners: BannerType[];
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Riasu Player</title>
      </Head>
      <Header generos={props.generos} />
      {props.banners.length && <Banner banners={props.banners}/>}
      <main className={styles.main}>
        <h1 style={{ padding: "15px 0" }}>Canais de TV mais populares</h1>
        <CarrosselCanais filmesOuCanal={props.canais} />
        <h1 style={{ padding: "15px 0" }}>Filmes mais populares</h1>
        <CarrosselFilmes filmesOuCanal={props.filmes} />
        {props.filmesAcao.length > 0 && (
          <>
            <h1 style={{ padding: "15px 0" }}>Filmes de Ação</h1>
            <CarrosselFilmes filmesOuCanal={props.filmesAcao} />
          </>
        )}
        {props.canaisEsporte.length > 0 && (
          <>
            <h1 style={{ padding: "15px 0" }}>Canais de Esporte</h1>
            <CarrosselCanais filmesOuCanal={props.canaisEsporte} />
          </>
        )}
        {props.filmesComedia.length > 0 && (
          <>
            <h1 style={{ padding: "15px 0" }}>Filmes de Comédia</h1>
            <CarrosselFilmes filmesOuCanal={props.filmesComedia} />
          </>
        )}
        {props.canaisNoticias.length > 0 && (
          <>
            <h1 style={{ padding: "15px 0" }}>Canais de Notícias</h1>
            <CarrosselCanais filmesOuCanal={props.canaisNoticias} />
          </>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generos = await api.get("genre").then((res) => {
    return res.data;
  });

  const filmes = await api.get("film").then((res) => {
    return res.data;
  });

  const canais = await api.get("channel").then((res) => {
    return res.data;
  });

  const filmesComedia = filmes.filter((filme: FilmeOuCanal) => {
    return filme.genres.find((genero) => {
      return genero.genre.name === "Comédia";
    });
  });

  const filmesAcao = filmes.filter((filme: FilmeOuCanal) => {
    return filme.genres.find((genero) => {
      return genero.genre.name === "Ação";
    });
  });

  const canaisEsporte = canais.filter((canal: FilmeOuCanal) => {
    return canal.genres.find((genero) => {
      return genero.genre.name === "Esporte";
    });
  });

  const canaisNoticias = canais.filter((canal: FilmeOuCanal) => {
    return canal.genres.find((genero) => {
      return genero.genre.name === "Notícias";
    });
  });

  const banners = await api.get("banner").then((res) => {
    return res.data;
  });

  return {
    props: {
      generos,
      filmes,
      canais,
      filmesAcao,
      filmesComedia,
      canaisEsporte,
      canaisNoticias,
      banners,
    },
    revalidate: 60, // 1 minuto
  };
};
