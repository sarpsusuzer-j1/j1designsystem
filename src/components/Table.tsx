import './Table.css';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';

export interface ControlRow {
  id: string;
  identifier: string;
  name: string;
  owner: string;
  catalog: string;
  status: 'pass' | 'fail' | null;
  state: 'live' | 'draft';
  effectiveStatus: 'no-datapoints' | 'no-tests' | null;
  evaluated: string | null;
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

function EffectiveStatusBadge({ effectiveStatus }: { effectiveStatus: ControlRow['effectiveStatus'] }) {
  if (!effectiveStatus) return <span className="table-empty">—</span>;
  return <Badge variant={effectiveStatus} />;
}

function OwnerCell({ owner }: { owner: string }) {
  const initials = owner.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="table-owner-cell">
      <span className="table-owner-avatar">{initials}</span>
      <span className="table-owner-name">{owner}</span>
    </div>
  );
}

export function Table({ rows, selectedIds, onSelectAll, onSelectRow }: TableProps) {
  const allSelected = rows.length > 0 && rows.every(r => selectedIds.has(r.id));
  const someSelected = rows.some(r => selectedIds.has(r.id)) && !allSelected;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th className="table-th table-col--identifier">
              <div className="table-th-inner">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={onSelectAll} />
                <span>Identifier</span>
              </div>
            </th>
            <th className="table-th table-col--name">Name</th>
            <th className="table-th table-col--owner">Owner</th>
            <th className="table-th table-col--catalog">Catalog</th>
            <th className="table-th table-col--status">Status</th>
            <th className="table-th table-col--state">State</th>
            <th className="table-th table-col--effective-status">Effective Status</th>
            <th className="table-th table-col--evaluated">Evaluated</th>
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
                  <Checkbox checked={selectedIds.has(row.id)} onChange={(c) => onSelectRow(row.id, c)} />
                  <span className="table-identifier">{row.identifier}</span>
                </div>
              </td>
              <td className="table-td table-col--name">
                <span className="table-name">{row.name}</span>
              </td>
              <td className="table-td table-col--owner">
                <OwnerCell owner={row.owner} />
              </td>
              <td className="table-td">{row.catalog || '—'}</td>
              <td className="table-td table-td--badge">
                <StatusBadge status={row.status} />
              </td>
              <td className="table-td table-td--badge">
                <StateBadge state={row.state} />
              </td>
              <td className="table-td table-td--badge">
                <EffectiveStatusBadge effectiveStatus={row.effectiveStatus} />
              </td>
              <td className="table-td table-td--muted">{row.evaluated || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
