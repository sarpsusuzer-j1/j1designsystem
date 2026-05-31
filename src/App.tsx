import './App.css';
import { NavBar } from './components/NavBar';
import { ControlsPage } from './pages/ControlsPage';

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-content">
        <ControlsPage />
      </main>
    </div>
  );
}

export default App;
