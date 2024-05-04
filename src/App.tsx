import "./App.css";

import { Routing } from "./route";

import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import { AppLoader } from "./components";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ErrorBoundary>
          <AppLoader>
            <Routing />
          </AppLoader>
        </ErrorBoundary>
      </AuthProvider>
    </div>
  );
}

export default App;
