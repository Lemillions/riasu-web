import { api } from "@/services/api";
import { GetStaticProps } from "next/types";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Genero {
  id: string;
  name: string;
  channels: any[];
  films: any[];
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
    genre: Genero;
  }[];
  products?: string[];
  createdAt: string;
}

interface FilmesPageProps {
  generos: Genero[];
  filmes: FilmeOuCanal[];
}

export default function Filmes(props: FilmesPageProps) {
  const [generoEscolhidos, setGeneroEscolhidos] = useState<string[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    if (router.query.genero) {
      if (typeof router.query.genero === "string" && props.generos.filter((genero) => genero.id === router.query.genero).length > 0) {
        setGeneroEscolhidos([router.query.genero]);
      }
    }
  }, [router.query.genero]);


  const filmesFiltrados = props.filmes.filter((filme) => {
    if (generoEscolhidos.length === 0) {
      return true;
    }
    return filme.genres.some((genero) => generoEscolhidos.includes(genero.genreId));
  });
  return (
    <>
      <Header generos={props.generos} />
      <main id={styles.main}>
        <div id={styles.generosBar}>
          <h1 style={{fontSize: "24px"}}>Filtrar por :</h1>
          <h2 style={{fontSize: "18px", margin: "10px 0"}}>Gênero</h2>
          {props.generos.map((genero) => (
            <span key={genero.id} style={{ margin: "3px 0" }}>
              <Checkbox
                value={genero.id}
                checked={generoEscolhidos.includes(genero.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGeneroEscolhidos([...generoEscolhidos, genero.id]);
                  } else {
                    setGeneroEscolhidos(
                      generoEscolhidos.filter((generoEscolhido) => generoEscolhido !== genero.id)
                    );
                  }
                }}
              >
                {genero.name}
              </Checkbox>
            </span>
          ))}
        </div>
        <div id={styles.filmes}>
          <h1 className={styles.tituloPagina}>Filmes</h1>
          <div id={styles.listaFilmes}>
            {filmesFiltrados.map((filme) => (
              <div key={filme.id} className={styles.filme}>
                <Link
                  href={`../filmes/${filme.id}`}
                  style={{
                    cursor: "pointer",
                    color: "#ffe1dd",
                    marginRight: "5px",
                  }}
                >
                  <Image
                    src={filme.banner}
                    width={203}
                    height={298}
                    alt={filme.name}
                  />
                  <h3 className={styles.titulo}>{filme.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
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
      filmes,
      generos,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
