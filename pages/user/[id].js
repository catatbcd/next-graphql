import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useForm from "../../utility/useForm";
import styles from '../../styles/Home.module.css'
import classes from '../../styles/form.module.css'
import classesB from "../../styles/button.module.css"
export default function User({ user }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
 /* const refreshData = () => {
    router.replace(router.asPath);
  }*/
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
  useEffect(() => {
    setIsRefreshing(false);
  }, [user]);
  console.log(user);
  const { inputs, handleChange, clearForm } = useForm({
    LOGIN: user.LOGIN,
    AVATAR_URL: user.AVATAR_URL,
  })
  async function sendData(event) {
    event.preventDefault();
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation EditUser {
            editUser(ID: "${user.ID}", LOGIN: "${inputs.LOGIN}", AVATAR_URL: "${inputs.AVATAR_URL}") {
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
      <Link href={'/'}>
          <button className={classesB.glow_on_hover} type="button">Back</button>
              </Link>
        <section className={styles.grid}>
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
        
          <form onSubmit={sendData} className={classes.form}>
          <div className={classes.title}>Edit user</div>
          <div className={`${classes.input_container} ${classes.ic1}`}>
            <input
              className={classes.input}
              placeholder="Name"
              type={"text"}
              name="LOGIN"
              value={inputs.LOGIN}
          onChange={handleChange}
            ></input>
          </div>

          <div className={`${classes.input_container} ${classes.ic2}`}>
            <input
               className={classes.input}
               placeholder="Avatar"
              type={"text"}
              name="AVATAR_URL"
              value={inputs.AVATAR_URL}
              onChange={handleChange}
            ></input>
          </div>
          <br></br>
          <button className={classes.submit} type="submit">edit user</button>
        </form>
    
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
