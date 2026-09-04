#!/usr/bin/env node
/**
 * Refresh the GDF Jira snapshot.
 *
 * This project stores a checked-in snapshot at data/gdf-snapshot.json
 * (copied to src/data/gdf-snapshot.json for the CRA app).
 *
 * Live regeneration is done with the Atlassian MCP / Jira filters:
 *   - filter 89273  GDF unresolved issues
 *   - filter 89274  GDF parent epics
 *   - done child counts per epic with open work
 *
 * Ask the Cursor agent: "Refresh the GDF Jira snapshot from DF filters."
 *
 * Board: GDF Stories by Epic (boardId 7744)
 * Project: DF / Global Design Foundations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const snapshotPath = path.join(root, 'data', 'gdf-snapshot.json');
const srcPath = path.join(root, 'src', 'data', 'gdf-snapshot.json');

if (!fs.existsSync(snapshotPath)) {
  console.error('Missing data/gdf-snapshot.json. Ask the agent to regenerate from Jira.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(srcPath), { recursive: true });
fs.copyFileSync(snapshotPath, srcPath);

const snap = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
console.log(`Synced snapshot generatedAt=${snap.generatedAt}`);
console.log(
  `Open tickets=${snap.stats.totalOpen}, epics=${snap.stats.activeEpics}, designers=${snap.stats.designers}`
);
console.log('Wrote src/data/gdf-snapshot.json');
console.log('');
console.log(
  'To pull fresh Jira data, ask Cursor to refresh the GDF snapshot from filters 89273/89274.'
);
