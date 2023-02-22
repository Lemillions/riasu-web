import styles from "./Header.module.css";
import Logo from "public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "antd";
import { useEffect } from "react";

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
      label: (
        <Link href={`../canais?genero=${genero.id}`} className={styles.dropItem}>
          {genero.name}
        </Link>
      ),
    };
  });
  const itemsFilmes = generos.map((genero) => {
    return {
      key: genero.id,
      label: (
        <Link
          href={`../filmes?genero=${genero.id}`}
          className={styles.dropItem}
        >
          {genero.name}
        </Link>
      ),
    };
  });
  useEffect(() => {
    itemsTv.unshift({
      key: "0",
      label: (
        <Link href={"../tv"} className={styles.dropItem}>
          Todos
        </Link>
      ),
    });
    itemsFilmes.unshift({
      key: "0",
      label: (
        <Link href={"../filmes"} className={styles.dropItem}>
          Todos
        </Link>
      ),
    });
  }, []);

  return (
    <div id={styles.header}>
      <nav id={styles.containerEsquerda}>
        <Link href={"../"}>
          <Image src={Logo} width={40} height={40} alt="Logo" />
        </Link>
        <Dropdown menu={{ items: itemsTv }} className={styles.navItem}>
          <Link href={"../canais"}>TV</Link>
        </Dropdown>
        <Dropdown menu={{ items: itemsFilmes }} className={styles.navItem}>
          <Link href={"../filmes"}>Filmes</Link>
        </Dropdown>
      </nav>
      <div id={styles.containerDireita}></div>
    </div>
  );
}
