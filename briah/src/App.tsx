import { Home } from "./pages/Home";
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css"; // make sure your TailwindCSS is working

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="min-h-screen bg-background text-foreground p-6">
        <Home />
      </main>
    </ThemeProvider>
  );
}

export default App;
