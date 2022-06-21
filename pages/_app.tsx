import '../styles/globals.css'
import '../styles/font.css'
import { wrapper } from "../redux/store";
import AnimatedBackground from "../components/AnimatedBackground";
import Device from "../components/Device";

const App = ({ Component, pageProps }: any) => (
  <AnimatedBackground>
    <Device>
      <Component {...pageProps} />
    </Device>
  </AnimatedBackground>
)

export default wrapper.withRedux(App);