import { Link, useParams } from 'react-router-dom';
import Box from '@ux/box';
import text from '@ux/text';
import {
  getActiveEpicKeys,
  getDesignerMap,
  getEpicMap,
  getTicketMap,
  initials,
} from '../lib/snapshot';
import { ProgressBar, TicketList } from '../components/ui';

import '@ux/box/styles';
import '@ux/text/styles';

function DesignerDetailPage() {
  const { id } = useParams();
  const designer = getDesignerMap()[id];
  const ticketMap = getTicketMap();
  const epicMap = getEpicMap();
  const activeEpicKeys = getActiveEpicKeys();

  if (!designer) {
    return (
      <div className="page">
        <text.h1 as="heading">Designer not found</text.h1>
        <p>
          <Link to="/designers">Back to designers</Link>
        </p>
      </div>
    );
  }

  const tickets = designer.ticketKeys.map((key) => ticketMap[key]).filter(Boolean);
  const epics = designer.epicKeys
    .filter((key) => activeEpicKeys.has(key))
    .map((key) => epicMap[key])
    .filter(Boolean);

  return (
    <div className="page">
      <header className="page-header">
        <div className="designer-hero">
          {designer.avatarUrl ? (
            <img
              src={designer.avatarUrl}
              alt=""
              className="avatar large"
              width={56}
              height={56}
            />
          ) : (
            <span className="avatar avatar-fallback large" aria-hidden="true">
              {initials(designer.name)}
            </span>
          )}
          <div>
            <text.span as="caption" size={-1}>
              <Link to="/designers">Designers</Link> / {designer.name}
            </text.span>
            <text.h1 as="heading">{designer.name}</text.h1>
            <text.p as="paragraph" size={-1}>
              {designer.load} open tickets across {epics.length} epics
            </text.p>
          </div>
        </div>
      </header>

      <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
        <text.h2 as="title">Epics</text.h2>
        <div className="epic-grid">
          {epics.map((epic) => (
            <Link key={epic.key} to={`/epics/${epic.key}`} className="epic-card">
              <text.span as="caption" size={-1}>
                {epic.key}
              </text.span>
              <text.h3 as="title" size={-2}>
                {epic.summary}
              </text.h3>
              <ProgressBar
                value={epic.progress}
                label={`${epic.key} completion`}
              />
            </Link>
          ))}
        </div>
      </Box>

      <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
        <text.h2 as="title" id="assigned-heading">
          Assigned tickets
        </text.h2>
        <TicketList tickets={tickets} showEpic labelledBy="assigned-heading" />
      </Box>
    </div>
  );
}

export default DesignerDetailPage;
