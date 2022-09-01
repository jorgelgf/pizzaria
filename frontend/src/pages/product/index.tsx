import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import { useState, ChangeEvent, FormEvent } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type ItemProps = {
  id: string;
  name: string;
};
interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState(categoryList || []);

  const [categorySelected, setCategorySelected] = useState(0);

  //console.log(categoryList);
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const image = event.target.files[0];
    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  //selected new category in list
  function handleChangeCategory(event) {
    setCategorySelected(event.target.value);
  }
  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    try {
      const data = new FormData();
      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("Preencha todos os campos");
        return;
      }
      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupAPIClient();
      await apiClient.post("/product", data);

      toast.success("Cadastrado com sucesso");
    } catch (err) {
      toast.error("Ops! Erro ao cadastrar!");
      console.log(err);
    } finally {
      setName("");
      setPrice("");
      setDescription("");
      setImageAvatar(null);
    }
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvata}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, img/jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/category");
  //console.log(response.data);

  return {
    props: { categoryList: response.data },
  };
});
