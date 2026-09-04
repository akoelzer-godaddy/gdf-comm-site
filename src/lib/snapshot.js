import snapshot from '../data/gdf-snapshot.json';

/** Child ticket statuses that keep an epic visible in listings. */
export const ACTIVE_WORK_STATUSES = [
  'In Progress',
  'To Do',
  'Blocked',
  'Awaiting Feedback',
];

export function getSnapshot() {
  return snapshot;
}

export function getTicketMap() {
  return Object.fromEntries(snapshot.tickets.map((t) => [t.key, t]));
}

export function getEpicMap() {
  return Object.fromEntries(snapshot.epics.map((e) => [e.key, e]));
}

export function epicHasActiveWork(epic, ticketMap = getTicketMap()) {
  return (epic.ticketKeys || []).some((key) => {
    const ticket = ticketMap[key];
    return ticket && ACTIVE_WORK_STATUSES.includes(ticket.status);
  });
}

export function getActiveEpics() {
  const ticketMap = getTicketMap();
  return snapshot.epics.filter((epic) => epicHasActiveWork(epic, ticketMap));
}

export function getActiveEpicKeys() {
  return new Set(getActiveEpics().map((epic) => epic.key));
}

export function getDesignerMap() {
  return Object.fromEntries(snapshot.designers.map((d) => [d.accountId, d]));
}

export function getAttentionTickets(limit = 12) {
  const map = getTicketMap();
  return snapshot.attentionTicketKeys
    .map((key) => map[key])
    .filter(Boolean)
    .sort((a, b) => {
      const aBlocked = a.attentionReasons.includes('Blocked') ? 0 : 1;
      const bBlocked = b.attentionReasons.includes('Blocked') ? 0 : 1;
      if (aBlocked !== bBlocked) return aBlocked - bBlocked;
      return (b.updated || '').localeCompare(a.updated || '');
    })
    .slice(0, limit);
}

export function getInProgressTickets(limit = 12) {
  return snapshot.tickets
    .filter((t) => ['In Progress', 'Awaiting Feedback', 'Scoping'].includes(t.status))
    .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''))
    .slice(0, limit);
}

export function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '—';
  }
}

export function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

export function statusTone(status) {
  if (status === 'Blocked' || status === 'On Hold') return 'danger';
  if (status === 'In Progress' || status === 'Awaiting Feedback' || status === 'Scoping') {
    return 'active';
  }
  if (status === 'Done' || status === 'Closed') return 'done';
  return 'neutral';
}
