import { onMount, type Component } from "solid-js";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import Main from "./components/layout/Main.js";
import ToastLayer from "./components/toast/ToastLayer.js";
import { handleAuthCallback } from "./state/auth.js";

const App: Component = () => {
  onMount(() => void handleAuthCallback());

  return (
    <div class="flex min-h-dvh flex-col items-center">
      <ToastLayer />
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
