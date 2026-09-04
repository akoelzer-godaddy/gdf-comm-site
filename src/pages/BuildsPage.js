import text from '@ux/text';
import PlatformWorkSection from '../components/PlatformWorkSection';

import '@ux/text/styles';

function BuildsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <text.h1 as="heading">Builds</text.h1>
          <text.p as="paragraph" size={0} className="lede">
            Platform engineering progress on Antares components, systems, and
            what’s coming next.
          </text.p>
        </div>
      </header>

      <PlatformWorkSection id="builds-platform-work" />
    </div>
  );
}

export default BuildsPage;
