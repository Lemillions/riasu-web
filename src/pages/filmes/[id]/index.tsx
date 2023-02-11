import Header from "@/components/Header";
import { api } from "@/services/api";
import { GetStaticPaths, GetStaticProps } from "next/types";
import LivePlayer from "@/components/LivePlayer";
import styles from "./index.module.css"


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

interface FilmeOuCanalPageProps {
  filme: FilmeOuCanal;
  generos: any[];
}
export default function FilmeOuCanalPage(props: FilmeOuCanalPageProps) {
  const { filme, generos } = props;

  return (
    <>
      <Header generos={generos} />
      <main id={styles.main}>
        <LivePlayer canal={filme} />
        <h1>{filme.name}</h1>
        <p>{filme.description}</p>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filmes = await api.get("film").then((res) => {
    return res.data;
  });
  const paths = filmes.map((filme: FilmeOuCanal) => {
    return {
      params: {
        id: filme.id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generos = await api.get("genre").then((res) => {
    return res.data;
  });

  const filme = await api.get(`film/${ctx.params?.id}`).then((res) => {
    return res.data;
  });
  return {
    props: {
      generos,
      filme,
    },
  };
};
