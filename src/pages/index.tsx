import MainContent from "components/main";
import Head from "next/head";
import { get_settings } from "server/common/json-helper";
import { type Fade, modes, type modesType } from "types/json_types";

const Home = ({
  initMode,
  initFades,
  initSameFadeTimes,
}: {
  initMode: modesType;
  initFades: Fade;
  initSameFadeTimes: boolean;
}) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-green-50 dark:bg-gray-900">
        <div className="flex h-full flex-col items-center gap-10 bg-white py-8 md:container dark:bg-gray-800 md:mx-auto md:max-w-xl">
          <h1 className="mb-4 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            B.O.O.M. LOGO <br />
            COLOR PICKER
          </h1>
          <MainContent
            initMode={initMode}
            initFades={initFades}
            initSameFadeTimes={initSameFadeTimes}
          />
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const curSettings = get_settings();

  const initFades =
    curSettings.mode === 0
      ? [[curSettings.color, 2000, 1000]]
      : curSettings.fades;

  const initSameFadeTimes =
    curSettings.mode === 0 ||
    curSettings.fades.every(
      (val) =>
        val[1] === curSettings.fades[0][1] && val[2] === curSettings.fades[0][2]
    );

  initFades.forEach((fade) => (fade[0] = `#${fade[0]}`));

  return {
    props: { initMode: modes[curSettings.mode], initFades, initSameFadeTimes },
  };
}
