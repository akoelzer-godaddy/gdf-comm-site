# Global Design Foundations Comm Site

Designer-facing communications dashboard for **Global Design Foundations** progress across Jira epics and tickets.

## Stack

- React (Create React App boilerplate)
- GoDaddy Design System / **UXCore** (`@ux/*`)
- Snapshot data from Jira project **DF**, board **GDF Stories by Epic**

## Run

Requires GoDaddy Artifactory access for UXCore packages (VPN + `npm login` to Artifactory).

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` Overview — stats, status distribution, epic progress, designer load, attention table
- `/epics` and `/epics/:key` — epic progress and child tickets
- `/designers` and `/designers/:id` — assignee load and linked tickets/epics
- `/builds` — placeholder for upcoming engineering build status

## Jira snapshot

Source of truth: `data/gdf-snapshot.json` (copied to `src/data/gdf-snapshot.json`).

```bash
npm run refresh:jira
```

That syncs the committed snapshot into `src/`. To pull fresh Jira data, ask Cursor to refresh from filters `89273` / `89274`.
