import './Table.css';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';

// Controls page row — verified column spec from screen-references.md
export interface ControlRow {
  id: string;
  identifier: string;
  name: string;
  owner: string;
  framework: string;
  status: 'pass' | 'fail' | null;
  state: 'live' | 'draft';
  priority: 'critical' | 'high' | 'medium' | 'low' | null;
  lastUpdated: string | null;
}

interface TableProps {
  rows: ControlRow[];
  selectedIds: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
}

function StatusBadge({ status }: { status: ControlRow['status'] }) {
  if (!status) return <span className="table-empty">—</span>;
  return <Badge variant={status === 'pass' ? 'pass' : 'fail'} />;
}

function StateBadge({ state }: { state: ControlRow['state'] }) {
  return <Badge variant={state === 'live' ? 'live' : 'draft'} />;
}

function PriorityBadge({ priority }: { priority: ControlRow['priority'] }) {
  if (!priority) return <span className="table-empty">—</span>;
  const map: Record<string, BadgeVariant> = {
    critical: 'fail',
    high: 'warning-tinted',
    medium: 'warning-tinted',
    low: 'pass',
  };
  const labels: Record<string, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return <Badge variant={map[priority]} label={labels[priority]} />;
}

export function Table({ rows, selectedIds, onSelectAll, onSelectRow }: TableProps) {
  const allSelected = rows.length > 0 && rows.every(r => selectedIds.has(r.id));
  const someSelected = rows.some(r => selectedIds.has(r.id)) && !allSelected;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr className="table-header-row">
            {/* col: Identifier — 144px, checkbox + ID text */}
            <th className="table-th table-col--identifier">
              <div className="table-th-inner">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                />
                <span>Identifier</span>
              </div>
            </th>
            {/* col: Name — 400px, fills remaining */}
            <th className="table-th table-col--name">Name</th>
            {/* col: Owner — 144px */}
            <th className="table-th table-col--owner">Owner</th>
            {/* col: Framework — 144px */}
            <th className="table-th table-col--framework">Framework</th>
            {/* col: Status — 100px */}
            <th className="table-th table-col--status">Status</th>
            {/* col: State — 100px */}
            <th className="table-th table-col--state">State</th>
            {/* col: Priority — 144px */}
            <th className="table-th table-col--priority">Priority</th>
            {/* col: Last Updated — 144px */}
            <th className="table-th table-col--last-updated">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`table-row${selectedIds.has(row.id) ? ' table-row--selected' : ''}`}
            >
              <td className="table-td table-col--identifier">
                <div className="table-td-inner">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onChange={(c) => onSelectRow(row.id, c)}
                  />
                  <span className="table-identifier">{row.identifier}</span>
                </div>
              </td>
              <td className="table-td table-col--name">
                <span className="table-name">{row.name}</span>
              </td>
              <td className="table-td">{row.owner || '—'}</td>
              <td className="table-td">{row.framework || '—'}</td>
              <td className="table-td table-td--badge">
                <StatusBadge status={row.status} />
              </td>
              <td className="table-td table-td--badge">
                <StateBadge state={row.state} />
              </td>
              <td className="table-td table-td--badge">
                <PriorityBadge priority={row.priority} />
              </td>
              <td className="table-td table-td--muted">{row.lastUpdated || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
