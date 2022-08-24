import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.scss";
import logoImg from "../../../public/logo.svg";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === "" || email === "" || password === "") {
      return alert("We need data");
    }
    setLoading(true);

    let data = {
      name,
      email,
      password,
    };
    await signUp(data);
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <Input
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
            <Input
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já possuí uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
