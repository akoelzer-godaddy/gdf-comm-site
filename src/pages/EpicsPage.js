import { Link } from 'react-router-dom';
import Box from '@ux/box';
import text from '@ux/text';
import { getActiveEpics } from '../lib/snapshot';
import { DesignerChip, ProgressBar, StatusPill } from '../components/ui';

import '@ux/box/styles';
import '@ux/text/styles';

function EpicsPage() {
  const epics = [...getActiveEpics()].sort((a, b) => b.openCount - a.openCount);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <text.h1 as="heading">Epics</text.h1>
          <text.p as="paragraph" size={0} className="lede">
            Open Global Design Foundations epics that have tickets in progress,
            to do, blocked, or awaiting feedback.
          </text.p>
        </div>
      </header>

      <ul className="epic-stack">
        {epics.map((epic) => (
          <li key={epic.key}>
            <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
              <div className="epic-card-top">
                <Link to={`/epics/${epic.key}`} className="epic-link">
                  <text.span as="caption" size={-1}>
                    {epic.key}
                  </text.span>
                  <text.h2 as="title" size={-2}>
                    {epic.summary}
                  </text.h2>
                </Link>
                <StatusPill status={epic.status} />
              </div>
              <ProgressBar
                value={epic.progress}
                label={`${epic.key} completion`}
              />
              <div className="epic-card-meta">
                <text.span as="caption" size={-2}>
                  {epic.doneCount} finished · {epic.openCount} open
                </text.span>
                <div className="chip-wrap">
                  {epic.designers.slice(0, 3).map((designer) => (
                    <DesignerChip
                      key={designer.accountId}
                      designer={designer}
                      to={`/designers/${designer.accountId}`}
                    />
                  ))}
                </div>
              </div>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpicsPage;
