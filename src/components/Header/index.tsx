import styles from "./Header.module.sass";
import Logo from "public/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { ConfigProvider, Dropdown, theme } from "antd";
import { use, useEffect } from "react";

interface Genero {
  id: string;
  name: string;
  channels: any[];
  films: any[];
  createdAt: string;
}

interface HeaderProps {
  generos: Genero[];
}

export default function Header(props: HeaderProps) {
  const { generos } = props;

  const itemsTv = generos.map((genero) => {
    return {
      key: genero.id,
      label: <Link href={`../tv/genero/${genero.id}`}>{genero.name}</Link>,
    };
  });
  const itemsFilmes = generos.map((genero) => {
    return {
      key: genero.id,
      label: <Link href={`../filmes/genero/${genero.id}`}>{genero.name}</Link>,
    };
  });
  useEffect(() => {
    itemsTv.unshift({ key: "0", label: <Link href={"../tv"}>Todos</Link> });
    itemsFilmes.unshift({ key: "0", label: <Link href={"../filmes"}>Todos</Link> });
  }, []);

  return (
    <div id={styles.header}>
      <nav id={styles.containerEsquerda}>
        <Image src={Logo} width={60} height={60} alt="Logo" />
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
          }}
        >
          <Dropdown menu={{ items: itemsTv }} className={styles.navItem}>
            <Link href={"../tv"}>TV</Link>
          </Dropdown>
          <Dropdown menu={{ items: itemsFilmes }} className={styles.navItem}>
            <Link href={"../filmes"}>Filmes</Link>
          </Dropdown>
        </ConfigProvider>
      </nav>
      <div id={styles.containerDireita}></div>
    </div>
  );
}
