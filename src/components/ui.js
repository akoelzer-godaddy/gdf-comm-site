import { Link } from 'react-router-dom';
import Card from '@ux/card';
import Box from '@ux/box';
import text from '@ux/text';
import { initials, statusTone } from '../lib/snapshot';
import '@ux/card/styles';
import '@ux/box/styles';
import '@ux/text/styles';

export function ProgressBar({ value, label }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="progress-block">
      <div className="progress-meta">
        <text.span as="caption" size={-1}>
          {label}
        </text.span>
        <text.span as="caption" size={-1}>
          {pct}%
        </text.span>
      </div>
      <div
        className="progress-rail"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progress ${pct} percent`}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function StatusPill({ status }) {
  return (
    <span className={`status-pill tone-${statusTone(status)}`}>
      {status}
    </span>
  );
}

export function DesignerChip({ designer, to }) {
  if (!designer) return null;
  const content = (
    <>
      {designer.avatarUrl ? (
        <img src={designer.avatarUrl} alt="" className="avatar" width={28} height={28} />
      ) : (
        <span className="avatar avatar-fallback" aria-hidden="true">
          {initials(designer.name)}
        </span>
      )}
      <text.span as="caption" size={-1}>
        {designer.name}
      </text.span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="designer-chip">
        {content}
      </Link>
    );
  }

  return <span className="designer-chip">{content}</span>;
}

export function TicketItem({ ticket, showEpic }) {
  if (!ticket) return null;
  return (
    <li className="ticket-item">
      <Box
        gap="sm"
        orientation="horizontal"
        inlineAlignChildren="start"
        className="ticket-item-row"
      >
        <a href={ticket.url} target="_blank" rel="noreferrer" className="ticket-key">
          {ticket.key}
        </a>
        <div className="ticket-body">
          <div className="ticket-summary">{ticket.summary}</div>
          {ticket.attentionReasons?.length > 0 && (
            <div className="attention-reasons">
              {ticket.attentionReasons.join(' · ')}
            </div>
          )}
          <div className="ticket-meta">
            <StatusPill status={ticket.status} />
            {ticket.assignee ? (
              <DesignerChip
                designer={ticket.assignee}
                to={`/designers/${ticket.assignee.accountId}`}
              />
            ) : (
              <text.span as="caption" size={-1}>
                Unassigned
              </text.span>
            )}
            {showEpic && ticket.parentKey ? (
              <Link to={`/epics/${ticket.parentKey}`} className="text-chip">
                {ticket.parentKey}
              </Link>
            ) : null}
          </div>
        </div>
      </Box>
    </li>
  );
}

export function TicketList({ tickets, showEpic, labelledBy }) {
  return (
    <ul className="ticket-list" aria-labelledby={labelledBy}>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.key} ticket={ticket} showEpic={showEpic} />
      ))}
    </ul>
  );
}

export function StatCard({ id, label, value, hint }) {
  return (
    <Card
      id={id}
      className="stat-card"
      eyebrow={label}
      title={String(value)}
      description={hint}
    />
  );
}
