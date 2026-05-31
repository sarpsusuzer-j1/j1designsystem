import './App.css';
import { NavBar } from './components/NavBar';
import { ControlsPage } from './pages/ControlsPage';

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <div className="app-shell-inner">
        <main className="content-frame">
          <ControlsPage />
        </main>
      </div>
    </div>
  );
}

export default App;
