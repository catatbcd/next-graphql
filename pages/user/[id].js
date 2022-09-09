import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import classes from '../../styles/form.module.css'
export default function User({ user }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  console.log(user);
  const [data, setData] = useState({
    ID: user.ID,
    LOGIN: user.LOGIN,
    AVATAR_URL: user.AVATAR_URL,
  });
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  async function sendData(event) {
    event.preventDefault();
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation EditUser {
            editUser(ID: "${data.ID}", LOGIN: "${data.LOGIN}", AVATAR_URL: "${data.AVATAR_URL}") {
                ID
                LOGIN
                AVATAR_URL
              }
            }
          `,
      });
      console.log(result);
      refreshData();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{user.LOGIN}</title>
      </Head>
      <main className={styles.main}>
      <section>
      <div className={styles.card}>
            <h2 className={styles.title}>
          {user.LOGIN} - ID: {user.ID}
        </h2>
        <Image
          width={250}
          height={250}
          src={user.AVATAR_URL}
          alt={user.LOGIN}
        /></div>
         <div className={styles.card}>
          <form onSubmit={sendData} className={classes.form}>
          <div className={classes.title}>Edit user</div>
          <div className={`${classes.input_container} ${classes.ic1}`}>
            <input
              className={classes.input}
              placeholder="Name"
              type={"text"}
              name="LOGIN"
              onChange={handleInputChange}
              defaultValue={user.LOGIN}
            ></input>
          </div>

          <div className={`${classes.input_container} ${classes.ic2}`}>
            <input
               className={classes.input}
               placeholder="Avatar"
              type={"text"}
              name="AVATAR_URL"
              onChange={handleInputChange}
              defaultValue={user.AVATAR_URL}
            ></input>
          </div>
          <br></br>
          <button className={classes.submit} type="submit">edit user</button>
        </form>
        </div>
      </section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
        query GetUser{
          getUser(ID: ${params.id}){
            ID
            LOGIN
            AVATAR_URL
          }
        }
        `,
  });

  return {
    props: {
      user: data.getUser,
    },
  };
}
