import { getBackendApi } from "./api/backend/backend.js";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import Main from "./components/layout/Main.js";
import { checkCallback } from "./util/callback.js";
import { lastFmKey, lastFmName, lastFmUrl, lastFmImage, authTimeStamp } from "./state/auth.js";
import { getLastFmApi } from "./api/lastfm/lastfm.js";

const App = () => {
  const backendApi = getBackendApi();
  const lastFmApi = getLastFmApi();
  const token = checkCallback();
  if (token) {
    backendApi.getSession({ token }).then((res) => {
      if (!res.success) {
        console.error(`Failed to get session. Error ${res.error.code} - ${res.error.error}`);
        return;
      }
      const session = res.data;
      lastFmKey.set(session.key);
      lastFmName.set(session.name);
      authTimeStamp.set(Date.now().toString());

      lastFmApi.user.getInfo({ user: session.name }).then((response) => {
        if (!response.success) {
          console.error(`Failed to get user data. Error ${response.error.error}: ${response.error.message}`);
          return;
        }
        const { user } = response.data;
        lastFmUrl.set(user.url);
        lastFmImage.set(user.image[2]["#text"]);
      });
    });
  }
  return (
    <div class="flex min-h-dvh flex-col items-center">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
