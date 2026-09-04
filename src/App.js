import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import UtilityNav from './components/utility-nav';
import OverviewPage from './pages/OverviewPage';
import EpicsPage from './pages/EpicsPage';
import EpicDetailPage from './pages/EpicDetailPage';
import DesignersPage from './pages/DesignersPage';
import DesignerDetailPage from './pages/DesignerDetailPage';
import BuildsPage from './pages/BuildsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <UtilityNav />
        <Sidebar />
        <div className="container" id="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/epics" element={<EpicsPage />} />
            <Route path="/epics/:key" element={<EpicDetailPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/designers/:id" element={<DesignerDetailPage />} />
            <Route path="/builds" element={<BuildsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
