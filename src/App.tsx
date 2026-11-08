import { onMount, type Component } from "solid-js";
import Footer from "./components/layout/Footer.tsx";
import Header from "./components/layout/Header.tsx";
import Main from "./components/layout/Main.tsx";
import ToastLayer from "./components/toast/ToastLayer.tsx";
import { handleAuthCallback } from "./state/auth.ts";

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
