import '../styles/globals.css'
import { wrapper } from "../redux/store";

const App = ({ Component, pageProps }: any) => (
  <Component {...pageProps} />
)

export default wrapper.withRedux(App);