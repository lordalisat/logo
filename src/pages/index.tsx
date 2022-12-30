import { type NextPage } from "next";
import Head from "next/head";
import LoginBtn from "../components/login-btn";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 bg-green-50">
          <h1 className="text-5xl font-extrabold tracking-tight text-lime-400 sm:text-[5rem]">
            B.O.O.M. LOGO
          </h1>
          <LoginBtn />
        </div>
      </main>
    </>
  );
};

export default Home;
