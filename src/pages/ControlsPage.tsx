import { useState } from 'react';
import './ControlsPage.css';
import {
  Heartbeat,
  Warning,
  TreeStructure,
} from '@phosphor-icons/react';
import { SliderTab } from '../components/SliderTab';
import { Button } from '../components/Button';
import { SummaryCard } from '../components/SummaryCard';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import type { ControlRow } from '../components/Table';
import { Pagination } from '../components/Pagination';

// Controls Page mock data — columns per Figma screen-references spec:
// Identifier | Name | Owner | Catalog | Status | State | Effective Status | Evaluated
const MOCK_DATA: ControlRow[] = [
  {
    id: '1',
    identifier: 'CSF-DE-01',
    name: '(Manual Verification) DE.AE-03: Information is correlated from multiple sources',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'pass',
    state: 'live',
    effectiveStatus: 'no-datapoints',
    evaluated: '9 hours ago',
  },
  {
    id: '2',
    identifier: 'CSF-DE-02',
    name: '(Manual Verification) DE.AE-04: The estimated impact and scope of adverse events are understood',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '9 hours ago',
  },
  {
    id: '3',
    identifier: 'CSF-DE-03',
    name: '(Manual Verification) DE.CM-01: Networks and network services are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-tests',
    evaluated: null,
  },
  {
    id: '4',
    identifier: 'CSF-DE-04',
    name: '(Manual Verification) DE.CM-02: The physical environment is monitored',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'pass',
    state: 'live',
    effectiveStatus: 'no-datapoints',
    evaluated: '9 hours ago',
  },
  {
    id: '5',
    identifier: 'CSF-DE-05',
    name: '(Manual Verification) DE.CM-03: Personnel activity and technology usage are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '9 hours ago',
  },
  {
    id: '6',
    identifier: 'CSF-DE-06',
    name: '(Manual Verification) DE.CM-06: External service provider activities are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-tests',
    evaluated: null,
  },
  {
    id: '7',
    identifier: 'CSF-DE-07',
    name: '(Manual Verification) DE.CM-07: Monitoring for unauthorized personnel, connections, and software',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'pass',
    state: 'live',
    effectiveStatus: 'no-datapoints',
    evaluated: '9 hours ago',
  },
  {
    id: '8',
    identifier: 'CSF-DE-08',
    name: '(Manual Verification) DE.CM-09: Computing hardware and software are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '9 hours ago',
  },
  {
    id: '9',
    identifier: 'CSF-DE-09',
    name: '(Manual Verification) DE.DP-01: Roles and responsibilities for detection are defined',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-tests',
    evaluated: null,
  },
  {
    id: '10',
    identifier: 'CSF-DE-10',
    name: '(Manual Verification) DE.DP-02: Detection activities comply with applicable requirements',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'pass',
    state: 'live',
    effectiveStatus: 'no-datapoints',
    evaluated: '9 hours ago',
  },
  {
    id: '11',
    identifier: 'CSF-DE-11',
    name: '(Manual Verification) DE.DP-04: Event detection information is communicated',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '9 hours ago',
  },
  {
    id: '12',
    identifier: 'CSF-DE-12',
    name: '(Manual Verification) DE.DP-05: Detection processes are continuously improved',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-tests',
    evaluated: null,
  },
];

const PAGE_SIZE = 10;

// Ask AI icon — JupiterOne J1 planet mark (lime sphere + orbital ring)
const AskAIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6.5" fill="#CDEA68"/>
    <ellipse cx="9" cy="9" rx="2.8" ry="6.5" fill="#A8C840" opacity="0.5"/>
    <line x1="2.5" y1="9" x2="15.5" y2="9" stroke="#7BA020" strokeWidth="0.8" opacity="0.6"/>
    <line x1="3.2" y1="6.2" x2="14.8" y2="6.2" stroke="#7BA020" strokeWidth="0.6" opacity="0.45"/>
    <line x1="3.2" y1="11.8" x2="14.8" y2="11.8" stroke="#7BA020" strokeWidth="0.6" opacity="0.45"/>
    <ellipse cx="9" cy="9" rx="8.5" ry="3.2" fill="none" stroke="#5C6E22" strokeWidth="1.1" transform="rotate(-30 9 9)"/>
    <ellipse cx="6.8" cy="6.2" rx="1.8" ry="1.1" fill="white" opacity="0.35" transform="rotate(-15 6.8 6.2)"/>
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

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
    setSelectedIds(checked ? new Set(pageRows.map(r => r.id)) : new Set());
  }

  function handleSelectRow(id: string, checked: boolean) {
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    setSelectedIds(next);
  }

  return (
    <div className="controls-page">

      {/* ── Page Content Header ── */}
      <div className="controls-header">
        <h1 className="controls-title">Controls</h1>
        <button className="ask-ai-pill">
          <AskAIIcon />
          <span>Ask AI</span>
        </button>
      </div>

      {/* ── Toolbar: Slider Tab (left) + Create button (right) ── */}
      <div className="controls-toolbar-row">
        <SliderTab
          tabs={[
            { label: 'All Controls', value: 'all' },
            { label: 'My Controls', value: 'mine' },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />
        <Button variant="black" icon={<PlusIcon />}>
          Create New Control
        </Button>
      </div>

      {/* ── Stat Cards — Heartbeat · Warning · Warning · TreeStructure ── */}
      <div className="controls-stats">
        <SummaryCard
          value="26% healthy"
          label="Overall controls status"
          icon={<Heartbeat size={22} color="#0A6643" weight="regular" />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="10 controls"
          label="High priority failing"
          icon={<Warning size={22} color="#A6320A" weight="regular" />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="80 controls"
          label="Failing"
          icon={<Warning size={22} color="#8A2014" weight="regular" />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="10 Frameworks"
          label="Impacted"
          icon={<TreeStructure size={22} color="#828987" weight="regular" />}
          iconBg="#F1F2F1"
        />
      </div>

      {/* ── Filter Row: Filters button (left) + Search 489px (right) ── */}
      <div className="controls-filter-row">
        <Button variant="outline-32" icon={<FilterIcon />}>Filters</Button>
        <div className="controls-search">
          <Input
            placeholder="Search controls..."
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            prefix={<SearchIcon />}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="controls-table-section">
        <Table
          rows={pageRows}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
        />
      </div>

      {/* ── Pagination ── */}
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
