import Router from "./router";
import { AuthProvider, CarritoComprasProvider } from "./context";

function App() {

  return (
    <>
      <AuthProvider>
        <CarritoComprasProvider>
          <Router />
        </CarritoComprasProvider>
      </AuthProvider>
    </>
  );
}

export default App;
