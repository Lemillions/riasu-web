import Header from "@/components/Header";
import { api } from "@/services/api";
import { GetStaticPaths, GetStaticProps } from "next/types";
import LivePlayer from "@/components/LivePlayer";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
    }
  }[];
  products?: string[];
  createdAt: string;
}

interface FilmeOuCanalPageProps {
  canal: FilmeOuCanal;
  canaisRelacionados: FilmeOuCanal[];
  generos: any[];
}
export default function FilmeOuCanalPage(props: FilmeOuCanalPageProps) {
  const { canal, generos } = props;
  return (
    <>
    <Head>
      <title>{canal.name} - Riasu Player</title>
    </Head>
      <Header generos={generos} />
      <main id={styles.main}>
        <div className={styles.colunaPlayer}>
          <LivePlayer canal={canal} />
          <h1>{canal.name}</h1>
          <p style={{color:"#cfcccc"}}>{canal.description}</p>
        </div>
        <div className={styles.coluna}>
          <h2>Canais Relacionados</h2>
          {props.canaisRelacionados.map((canalRelacionado) => (
            <Link href={`../canais/${canalRelacionado.id}`} key={canalRelacionado.id}>
            <div className={styles.linha}>
              <Image
                width={203 * 0.8}
                height={135 * 0.8}
                src={canalRelacionado.banner}
                alt={canalRelacionado.name}
              />
              <div>
                <h3>{canalRelacionado.name}</h3>
                <h5 style={{color:"#cfcccc"}}>{canalRelacionado.description}</h5>
              </div>
            </div>
            </Link>
          ))}
        </div>
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

  const outrosCanais = await api.get("channel").then((res) => {
    return res.data;
  });

  const canaisRelacionados = outrosCanais.filter(
    (canalRelacionado: FilmeOuCanal) => {
      return canalRelacionado.id !== canal.id;
    }
  );

  return {
    props: {
      generos,
      canal,
      canaisRelacionados,
    },
    revalidate: 60 * 10 //10 minutos
  };
};
