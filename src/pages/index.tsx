import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { api } from "@/services/api";
import { GetStaticProps } from "next";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import CarrosselFilmes from "@/components/CarrosselFilmes";

const inter = Inter({ subsets: ["latin"] });

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
  genres: string[];
  products?: string[];
  createdAt: string;
}

interface HomeProps {
  generos: Genero[];
  filmes: FilmeOuCanal[];
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Header generos={props.generos} />
      <Banner />
      <main className={styles.main}>
        <h1 style={{padding: "15px 0"}}>Canais de TV mais populares</h1>
        <CarrosselFilmes filmesOuCanal={props.filmes} />
        <h1 style={{padding: "15px 0"}}>Filmes mais populares</h1>
        <CarrosselFilmes filmesOuCanal={props.filmes} />
        <h1 style={{padding: "15px 0"}}>Canais de TV de suspense</h1>
        <CarrosselFilmes filmesOuCanal={props.filmes} />
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
  return {
    props: {
      generos,
      filmes,
    },
  };
};
