import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.scss";
import logoImg from "../../public/logo.svg";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, FormEvent, useState } from "react";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email,
      password,
    };
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Não possuí uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
