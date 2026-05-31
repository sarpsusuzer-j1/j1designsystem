import './Table.css';
import { Checkbox } from './Checkbox';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';

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
  if (!status) return null;
  if (status === 'pass') return <Badge variant="success-tinted" label="Pass" />;
  return <Badge variant="danger-tinted" label="Fail" />;
}

function StateBadge({ state }: { state: ControlRow['state'] }) {
  if (state === 'live') return <Badge variant="success-tinted" label="Live" />;
  return <Badge variant="default-outline" label="Draft" />;
}

function EffectiveBadge({ effectiveStatus }: { effectiveStatus: ControlRow['effectiveStatus'] }) {
  if (!effectiveStatus) return null;
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    'no-datapoints': { variant: 'warning-tinted', label: 'No Datapoints' },
    'no-tests': { variant: 'warning-solid', label: 'No Tests' },
  };
  const cfg = map[effectiveStatus];
  return <Badge variant={cfg.variant} label={cfg.label} />;
}

export function Table({ rows, selectedIds, onSelectAll, onSelectRow }: TableProps) {
  const allSelected = rows.length > 0 && rows.every(r => selectedIds.has(r.id));
  const someSelected = rows.some(r => selectedIds.has(r.id)) && !allSelected;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th className="table-th table-th--identifier">
              <div className="table-th-inner">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                />
                <span>Identifier</span>
              </div>
            </th>
            <th className="table-th table-th--name">Name</th>
            <th className="table-th table-th--owner">Owner</th>
            <th className="table-th table-th--catalog">Catalog</th>
            <th className="table-th table-th--status">Status</th>
            <th className="table-th table-th--state">State</th>
            <th className="table-th table-th--effective">Effective Status</th>
            <th className="table-th table-th--evaluated">Evaluated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`table-row ${selectedIds.has(row.id) ? 'table-row--selected' : ''}`}
            >
              <td className="table-td table-td--identifier">
                <div className="table-td-inner">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onChange={(c) => onSelectRow(row.id, c)}
                  />
                  <span className="table-identifier">{row.identifier}</span>
                </div>
              </td>
              <td className="table-td table-td--name">
                <span className="table-name">{row.name}</span>
              </td>
              <td className="table-td">{row.owner || '—'}</td>
              <td className="table-td">{row.catalog || '—'}</td>
              <td className="table-td"><StatusBadge status={row.status} /></td>
              <td className="table-td"><StateBadge state={row.state} /></td>
              <td className="table-td"><EffectiveBadge effectiveStatus={row.effectiveStatus} /></td>
              <td className="table-td table-td--muted">{row.evaluated || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
