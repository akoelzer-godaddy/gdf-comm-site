import { Link } from 'react-router-dom';
import Box from '@ux/box';
import text from '@ux/text';
import { getActiveEpicKeys, getSnapshot, initials } from '../lib/snapshot';
import { ProgressBar } from '../components/ui';

import '@ux/box/styles';
import '@ux/text/styles';

function DesignersPage() {
  const snapshot = getSnapshot();
  const designers = snapshot.designers.filter((d) => d.accountId !== 'unassigned');
  const maxLoad = Math.max(...designers.map((d) => d.load), 1);
  const activeEpicKeys = getActiveEpicKeys();
  const epicMap = Object.fromEntries(
    snapshot.epics.filter((e) => activeEpicKeys.has(e.key)).map((e) => [e.key, e])
  );

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <text.h1 as="heading">Designers</text.h1>
          <text.p as="paragraph" size={0} className="lede">
            Who is carrying open GDF work, and which epics they are part of.
          </text.p>
        </div>
      </header>

      <div className="designer-grid">
        {designers.map((designer) => (
          <Box
            key={designer.accountId}
            gap="md"
            inlinePadding="lg"
            blockPadding="lg"
            elevation="card"
          >
            <div className="designer-hero">
              {designer.avatarUrl ? (
                <img
                  src={designer.avatarUrl}
                  alt=""
                  className="avatar large"
                  width={48}
                  height={48}
                />
              ) : (
                <span className="avatar avatar-fallback large" aria-hidden="true">
                  {initials(designer.name)}
                </span>
              )}
              <div>
                <text.h2 as="title" size={-1}>
                  <Link to={`/designers/${designer.accountId}`}>{designer.name}</Link>
                </text.h2>
                <text.span as="caption" size={-1}>
                  {designer.load} open tickets ·{' '}
                  {designer.epicKeys.filter((key) => activeEpicKeys.has(key)).length}{' '}
                  epics
                </text.span>
              </div>
            </div>
            <ProgressBar
              value={Math.round((designer.load / maxLoad) * 100)}
              label={`${designer.name} relative load`}
            />
            <div className="status-counts">
              {Object.entries(designer.statusCounts).map(([status, count]) => (
                <span key={status} className="text-chip">
                  {status}: {count}
                </span>
              ))}
            </div>
            <div className="epic-links">
              {designer.epicKeys
                .filter((key) => activeEpicKeys.has(key))
                .map((key) => (
                <Link key={key} to={`/epics/${key}`} className="text-chip">
                  {key}
                  {epicMap[key] ? ` · ${epicMap[key].summary}` : ''}
                </Link>
              ))}
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default DesignersPage;
