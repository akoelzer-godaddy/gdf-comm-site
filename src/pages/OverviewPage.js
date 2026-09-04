import { Link } from 'react-router-dom';
import Box from '@ux/box';
import text from '@ux/text';
import {
  formatDate,
  getActiveEpicKeys,
  getActiveEpics,
  getAttentionTickets,
  getInProgressTickets,
  getSnapshot,
} from '../lib/snapshot';
import {
  DesignerChip,
  ProgressBar,
  StatCard,
  StatusPill,
  TicketList,
} from '../components/ui';
import PlatformWorkSection from '../components/PlatformWorkSection';

import '@ux/box/styles';
import '@ux/text/styles';

function OverviewPage() {
  const snapshot = getSnapshot();
  const activeEpics = getActiveEpics();
  const activeEpicKeys = getActiveEpicKeys();
  const topEpics = [...activeEpics]
    .sort((a, b) => b.openCount - a.openCount)
    .slice(0, 8);
  const designers = snapshot.designers.filter((d) => d.accountId !== 'unassigned');
  const maxLoad = Math.max(...designers.map((d) => d.load), 1);
  const attention = getAttentionTickets(10);
  const inProgress = getInProgressTickets(8);
  const maxStatus = Math.max(...snapshot.statusDistribution.map((s) => s.count), 1);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <text.h1 as="heading">Global Design Foundations</text.h1>
          <text.p as="paragraph" size={0} className="lede">
            Progress across design-system epics and tickets for designers on the
            GDF team.
          </text.p>
        </div>
        <text.span as="caption" size={-1}>
          Board: {snapshot.board} · Project {snapshot.project}
        </text.span>
      </header>

      <section className="stat-grid" aria-label="Work summary">
        <StatCard
          id="stat-open-tickets"
          label="Open tickets"
          value={snapshot.stats.totalOpen}
          hint="Unresolved design-system work"
        />
        <StatCard
          id="stat-active-work"
          label="Current work"
          value={snapshot.stats.inProgress}
          hint="Current work, feedback, and scoping"
        />
        <StatCard
          id="stat-needs-attention"
          label="Needs attention"
          value={snapshot.stats.needsAttention}
          hint="Blocked, on hold, stale, or unassigned"
        />
        <StatCard
          id="stat-active-epics"
          label="Open epics"
          value={activeEpics.length}
          hint={`${snapshot.stats.designers} designers assigned`}
        />
      </section>

      <PlatformWorkSection />

      <div className="dashboard-grid">
        <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
          <text.h2 as="title">Status distribution</text.h2>
          <text.p as="paragraph" size={-1} className="section-copy">
            Open tickets by workflow status.
          </text.p>
          <ul className="status-bars">
            {snapshot.statusDistribution.map((item) => (
              <li key={item.status}>
                <div className="status-bar-row">
                  <StatusPill status={item.status} />
                  <text.span as="caption" size={-1}>
                    {item.count}
                  </text.span>
                </div>
                <div className="progress-rail compact">
                  <div
                    className="progress-fill"
                    style={{ width: `${(item.count / maxStatus) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Box>

        <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
          <div className="section-heading">
            <text.h2 as="title">Designers</text.h2>
            <Link to="/designers">See all</Link>
          </div>
          <text.p as="paragraph" size={-1} className="section-copy">
            Open ticket load by assignee, with their related epics.
          </text.p>
          <ul className="designer-list">
            {designers.map((designer) => {
              const designerEpics = designer.epicKeys.filter((key) =>
                activeEpicKeys.has(key)
              );
              return (
              <li key={designer.accountId}>
                <div className="designer-row">
                  <DesignerChip
                    designer={designer}
                    to={`/designers/${designer.accountId}`}
                  />
                  <text.span as="caption" size={-1}>
                    {designer.load} open
                  </text.span>
                </div>
                <ProgressBar
                  value={Math.round((designer.load / maxLoad) * 100)}
                  label={`${designer.name} relative load`}
                />
                <div className="epic-links">
                  {designerEpics.slice(0, 4).map((key) => (
                    <Link key={key} to={`/epics/${key}`} className="text-chip">
                      {key}
                    </Link>
                  ))}
                  {designerEpics.length > 4 ? (
                    <text.span as="caption" size={-2}>
                      +{designerEpics.length - 4} more
                    </text.span>
                  ) : null}
                </div>
              </li>
              );
            })}
          </ul>
        </Box>
      </div>

      <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
        <div className="section-heading">
          <text.h2 as="title">Epic progress</text.h2>
          <Link to="/epics">See all epics</Link>
        </div>
        <text.p as="paragraph" size={-1} className="section-copy">
          Completion includes finished children plus current open tickets.
        </text.p>
        <div className="epic-grid">
          {topEpics.map((epic) => (
            <Link key={epic.key} to={`/epics/${epic.key}`} className="epic-card">
              <div className="epic-card-top">
                <text.span as="caption" size={-1}>
                  {epic.key}
                </text.span>
                <StatusPill status={epic.status} />
              </div>
              <text.h3 as="title" size={-2}>
                {epic.summary}
              </text.h3>
              <ProgressBar
                value={epic.progress}
                label={`${epic.key} completion`}
              />
              <div className="epic-card-meta">
                <text.span as="caption" size={-2}>
                  {epic.doneCount} done · {epic.openCount} open
                </text.span>
                <div className="avatar-stack">
                  {epic.designers.slice(0, 4).map((d) => (
                    <span key={d.accountId} className="avatar-wrap" title={d.name}>
                      {d.avatarUrl ? (
                        <img src={d.avatarUrl} alt="" className="avatar" width={24} height={24} />
                      ) : (
                        <span className="avatar avatar-fallback tiny">
                          {d.name.slice(0, 1)}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Box>

      <div className="dashboard-grid">
        <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
          <text.h2 as="title" id="attention-heading">
            Needs attention
          </text.h2>
          <TicketList tickets={attention} showEpic labelledBy="attention-heading" />
        </Box>

        <Box gap="md" inlinePadding="lg" blockPadding="lg" elevation="card">
          <text.h2 as="title" id="recent-heading">
            Recently active
          </text.h2>
          <TicketList tickets={inProgress} labelledBy="recent-heading" />
        </Box>
      </div>

      <footer className="source-appendix">
        <text.h2 as="title" size={-2}>
          Source
        </text.h2>
        <ul>
          <li>Generated {formatDate(snapshot.generatedAt)}</li>
          <li>
            Built from GDF Design System Team Jira filters for unresolved work and
            parent epics
          </li>
          {snapshot.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

export default OverviewPage;
