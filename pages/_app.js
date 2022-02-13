// root component rendered by react
import "../styles/globals.css";
import Layout from "../components/layout/Layout"; //means our different page components will be rendered by this Layout component

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
