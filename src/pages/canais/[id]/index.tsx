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
  canal: FilmeOuCanal;
  generos: any[];
}
export default function FilmeOuCanalPage(props: FilmeOuCanalPageProps) {
  const { canal, generos } = props;
  console.log(canal)
  return (
    <>
      <Header generos={generos} />
      <main id={styles.main}>
        <LivePlayer canal={canal} />
        <h1>{canal.name}</h1>
        <p>{canal.description}</p>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const canais = await api.get("channel").then((res) => {
    return res.data;
  });
  const paths = canais.map((canal: FilmeOuCanal) => {
    return {
      params: {
        id: canal.id,
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

  const canal = await api.get(`channel/${ctx.params?.id}`).then((res) => {
    return res.data;
  });
  return {
    props: {
      generos,
      canal,
    },
  };
};
