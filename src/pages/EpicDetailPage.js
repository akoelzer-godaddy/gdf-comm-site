import { Link, useParams } from 'react-router-dom';
import Box from '@ux/box';
import text from '@ux/text';
import { getEpicMap, getTicketMap } from '../lib/snapshot';
import { DesignerChip, ProgressBar, StatusPill, TicketList } from '../components/ui';

import '@ux/box/styles';
import '@ux/text/styles';

function EpicDetailPage() {
  const { key } = useParams();
  const epic = getEpicMap()[key];
  const ticketMap = getTicketMap();

  if (!epic) {
    return (
      <div className="page">
        <text.h1 as="heading">Epic not found</text.h1>
        <p>
          <Link to="/epics">Back to epics</Link>
        </p>
      </div>
    );
  }

  const tickets = epic.ticketKeys.map((k) => ticketMap[k]).filter(Boolean);
  const byStatus = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = acc[ticket.status] || [];
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <text.span as="caption" size={-1}>
            <Link to="/epics">Epics</Link> / {epic.key}
          </text.span>
          <text.h1 as="heading">{epic.summary}</text.h1>
          <div className="header-meta">
            <StatusPill status={epic.status} />
            <a href={epic.url} target="_blank" rel="noreferrer">
              Open in Jira
            </a>
          </div>
        </div>
      </header>

      <section className="stat-grid compact">
        <div className="stat-card">
          <text.span as="caption" size={-1}>
            Completion
          </text.span>
          <ProgressBar value={epic.progress} label={`${epic.key} completion`} />
        </div>
        <div className="stat-card">
          <text.span as="caption" size={-1}>
            Done
          </text.span>
          <text.p as="title" size={1} className="stat-value">
            {epic.doneCount}
          </text.p>
        </div>
        <div className="stat-card">
          <text.span as="caption" size={-1}>
            Open
          </text.span>
          <text.p as="title" size={1} className="stat-value">
            {epic.openCount}
          </text.p>
        </div>
        <div className="stat-card">
          <text.span as="caption" size={-1}>
            Designers
          </text.span>
          <text.p as="title" size={1} className="stat-value">
            {epic.designers.length}
          </text.p>
        </div>
      </section>

      <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
        <text.h2 as="title">Designers on this epic</text.h2>
        <div className="chip-wrap large">
          {epic.designers.map((designer) => (
            <div key={designer.accountId} className="designer-epic-card">
              <DesignerChip
                designer={designer}
                to={`/designers/${designer.accountId}`}
              />
              <text.span as="caption" size={-1}>
                {designer.ticketKeys.length} ticket
                {designer.ticketKeys.length === 1 ? '' : 's'}
              </text.span>
              <ul className="mini-ticket-list">
                {designer.ticketKeys.map((ticketKey) => {
                  const ticket = ticketMap[ticketKey];
                  return (
                    <li key={ticketKey}>
                      <a href={ticket?.url} target="_blank" rel="noreferrer">
                        {ticketKey}
                      </a>
                      <span>{ticket?.summary}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Box>

      {Object.entries(byStatus).map(([status, group]) => {
        const headingId = `status-${status.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <Box
            key={status}
            gap="md"
            inlinePadding="lg"
            blockPadding="lg"
            elevation="card"
          >
            <div className="section-heading">
              <text.h2 as="title" id={headingId}>
                {status}
              </text.h2>
              <text.span as="caption" size={-1}>
                {group.length}
              </text.span>
            </div>
            <TicketList tickets={group} labelledBy={headingId} />
          </Box>
        );
      })}
    </div>
  );
}

export default EpicDetailPage;
