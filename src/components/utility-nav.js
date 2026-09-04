import text from '@ux/text';
import { formatDate, getSnapshot } from '../lib/snapshot';

import '../styles/utility-nav.css';
import '@ux/text/styles';

function UtilityNav() {
  const snapshot = getSnapshot();
  return (
    <header className="utility-nav">
      <text.span as="caption" size={-1} className="utility-meta">
        Snapshot {formatDate(snapshot.generatedAt)}
      </text.span>
      <a
        className="utility-nav-item help-center"
        href="https://godaddy-corp.atlassian.net/jira/software/c/projects/DF/boards/7744"
        target="_blank"
        rel="noreferrer"
      >
        <text.span as="action">Open Jira board</text.span>
      </a>
    </header>
  );
}

export default UtilityNav;
