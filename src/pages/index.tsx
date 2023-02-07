import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { api } from "@/utils/api";
import { GetStaticProps } from "next";
import Header from "@/components/Header";

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
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Header generos={props.generos}/>
      <main className={styles.main}>A</main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generos = await api.get("genre").then((res) => {
    return res.data;
  });
  return {
    props: {
      generos,
    },
  };
};
