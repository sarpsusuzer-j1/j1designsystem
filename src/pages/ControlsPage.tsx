import { useState } from 'react';
import './ControlsPage.css';
import { SliderTab } from '../components/SliderTab';
import { Button } from '../components/Button';
import { SummaryCard } from '../components/SummaryCard';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import type { ControlRow } from '../components/Table';
import { Pagination } from '../components/Pagination';

const MOCK_DATA: ControlRow[] = [
  { id: '1', identifier: 'CC-001', name: 'Access Control Policy', owner: 'security-team', catalog: 'SOC 2', status: 'pass', state: 'live', effectiveStatus: null, evaluated: '2 days ago' },
  { id: '2', identifier: 'CC-002', name: 'Multi-Factor Authentication Enforcement', owner: 'identity-team', catalog: 'ISO 27001', status: 'fail', state: 'live', effectiveStatus: 'no-tests', evaluated: '5 hours ago' },
  { id: '3', identifier: 'CC-003', name: 'Data Encryption at Rest', owner: 'platform-team', catalog: 'PCI DSS', status: 'fail', state: 'live', effectiveStatus: null, evaluated: '1 day ago' },
  { id: '4', identifier: 'CC-004', name: 'Vulnerability Management Program', owner: 'security-team', catalog: 'NIST CSF', status: null, state: 'draft', effectiveStatus: 'no-datapoints', evaluated: null },
  { id: '5', identifier: 'CC-005', name: 'Incident Response Procedure', owner: 'security-team', catalog: 'SOC 2', status: 'fail', state: 'live', effectiveStatus: null, evaluated: '3 days ago' },
  { id: '6', identifier: 'CC-006', name: 'Change Management Process', owner: 'engineering', catalog: 'ISO 27001', status: 'pass', state: 'live', effectiveStatus: null, evaluated: '6 hours ago' },
  { id: '7', identifier: 'CC-007', name: 'Third Party Risk Assessment', owner: 'legal-team', catalog: 'SOC 2', status: 'fail', state: 'live', effectiveStatus: 'no-tests', evaluated: '1 week ago' },
  { id: '8', identifier: 'CC-008', name: 'Business Continuity Planning', owner: 'operations', catalog: 'ISO 22301', status: null, state: 'draft', effectiveStatus: 'no-datapoints', evaluated: null },
  { id: '9', identifier: 'CC-009', name: 'Privileged Access Management', owner: 'identity-team', catalog: 'CIS Controls', status: 'fail', state: 'live', effectiveStatus: null, evaluated: '12 hours ago' },
  { id: '10', identifier: 'CC-010', name: 'Security Awareness Training', owner: 'hr-team', catalog: 'NIST CSF', status: 'pass', state: 'live', effectiveStatus: null, evaluated: '4 days ago' },
  { id: '11', identifier: 'CC-011', name: 'Network Segmentation Controls', owner: 'platform-team', catalog: 'PCI DSS', status: 'fail', state: 'live', effectiveStatus: null, evaluated: '2 hours ago' },
  { id: '12', identifier: 'CC-012', name: 'Audit Log Retention Policy', owner: 'security-team', catalog: 'SOC 2', status: 'fail', state: 'live', effectiveStatus: 'no-tests', evaluated: '8 hours ago' },
];

const PAGE_SIZE = 10;

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const HealthIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="#065F46" strokeWidth="1.5"/>
    <path d="M7 10l2 2 4-4" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="#991B1B" strokeWidth="1.5"/>
    <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PriorityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3L2 17H18L10 3Z" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 8v4" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="0.75" fill="#92400E"/>
  </svg>
);

const FrameworkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="#374151" strokeWidth="1.5"/>
    <rect x="11" y="3" width="6" height="6" rx="1" stroke="#374151" strokeWidth="1.5"/>
    <rect x="3" y="11" width="6" height="6" rx="1" stroke="#374151" strokeWidth="1.5"/>
    <rect x="11" y="11" width="6" height="6" rx="1" stroke="#374151" strokeWidth="1.5"/>
  </svg>
);

const AskAIIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5Z" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

export function ControlsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = MOCK_DATA.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.identifier.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(new Set(pageRows.map(r => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  }

  function handleSelectRow(id: string, checked: boolean) {
    const next = new Set(selectedIds);
    if (checked) next.add(id); else next.delete(id);
    setSelectedIds(next);
  }

  return (
    <div className="controls-page">
      {/* Page header */}
      <div className="controls-header">
        <div className="controls-header__left">
          <h1 className="controls-title">Controls</h1>
          <button className="ask-ai-pill">
            <AskAIIcon />
            Ask AI
          </button>
        </div>
        <Button variant="black-40" icon={<PlusIcon />}>
          Create New Control
        </Button>
      </div>

      {/* Tabs */}
      <div className="controls-tabs">
        <SliderTab
          tabs={[
            { label: 'All Controls', value: 'all' },
            { label: 'My Controls', value: 'mine' },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Stat cards */}
      <div className="controls-stats">
        <SummaryCard
          value="26%"
          label="Healthy controls"
          icon={<HealthIcon />}
          iconBg="#ECFDF5"
        />
        <SummaryCard
          value="80"
          label="Failing controls"
          icon={<FailIcon />}
          iconBg="#FEF2F2"
        />
        <SummaryCard
          value="10"
          label="High priority"
          icon={<PriorityIcon />}
          iconBg="#FFF7ED"
        />
        <SummaryCard
          value="10"
          label="Frameworks"
          icon={<FrameworkIcon />}
          iconBg="#F1F2F1"
        />
      </div>

      {/* Filter + Search row */}
      <div className="controls-toolbar">
        <div className="controls-toolbar__left">
          <Button variant="outline-40" icon={<FilterIcon />}>Filters</Button>
        </div>
        <div className="controls-toolbar__search">
          <Input
            placeholder="Search controls..."
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            prefix={<SearchIcon />}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        rows={pageRows}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
      />

      {/* Pagination */}
      <div className="controls-pagination">
        <Pagination
          page={page}
          totalPages={totalPages}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
