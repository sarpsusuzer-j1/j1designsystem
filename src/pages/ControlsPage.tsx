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

// Controls Page mock data — columns per screen-references.md:
// Identifier | Name | Owner | Framework | Status | State | Priority | Last Updated
const MOCK_DATA: ControlRow[] = [
  {
    id: '1',
    identifier: 'CSF-DE-01',
    name: '(Manual Verification) DE.AE-03: Information is correlated from multiple sources',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'pass',
    state: 'live',
    priority: 'low',
    lastUpdated: '2 days ago',
  },
  {
    id: '2',
    identifier: 'CSF-DE-02',
    name: '(Manual Verification) DE.AE-04: The estimated impact and scope of adverse events are understood',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    priority: 'high',
    lastUpdated: '5 hours ago',
  },
  {
    id: '3',
    identifier: 'CSF-DE-03',
    name: '(Manual Verification) DE.CM-01: Networks and network services are monitored',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'fail',
    state: 'live',
    priority: 'critical',
    lastUpdated: '1 day ago',
  },
  {
    id: '4',
    identifier: 'CSF-DE-04',
    name: '(Manual Verification) DE.CM-02: The physical environment is monitored',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: null,
    state: 'draft',
    priority: null,
    lastUpdated: null,
  },
  {
    id: '5',
    identifier: 'CSF-DE-05',
    name: '(Manual Verification) DE.CM-03: Personnel activity and technology usage are monitored',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'fail',
    state: 'live',
    priority: 'high',
    lastUpdated: '3 days ago',
  },
  {
    id: '6',
    identifier: 'CSF-DE-06',
    name: '(Manual Verification) DE.CM-06: External service provider activities are monitored',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: 'pass',
    state: 'live',
    priority: 'medium',
    lastUpdated: '6 hours ago',
  },
  {
    id: '7',
    identifier: 'CSF-DE-07',
    name: '(Manual Verification) DE.CM-07: Monitoring for unauthorized personnel, connections, and software',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'fail',
    state: 'live',
    priority: 'critical',
    lastUpdated: '1 week ago',
  },
  {
    id: '8',
    identifier: 'CSF-DE-08',
    name: '(Manual Verification) DE.CM-09: Computing hardware and software are monitored',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: null,
    state: 'draft',
    priority: null,
    lastUpdated: null,
  },
  {
    id: '9',
    identifier: 'CSF-DE-09',
    name: '(Manual Verification) DE.DP-01: Roles and responsibilities for detection are defined',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'fail',
    state: 'live',
    priority: 'medium',
    lastUpdated: '12 hours ago',
  },
  {
    id: '10',
    identifier: 'CSF-DE-10',
    name: '(Manual Verification) DE.DP-02: Detection activities comply with applicable requirements',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: 'pass',
    state: 'live',
    priority: 'low',
    lastUpdated: '4 days ago',
  },
  {
    id: '11',
    identifier: 'CSF-DE-11',
    name: '(Manual Verification) DE.DP-04: Event detection information is communicated',
    owner: 'Sarp Susuzer',
    framework: 'JupiterOne',
    status: 'fail',
    state: 'live',
    priority: 'high',
    lastUpdated: '2 hours ago',
  },
  {
    id: '12',
    identifier: 'CSF-DE-12',
    name: '(Manual Verification) DE.DP-05: Detection processes are continuously improved',
    owner: 'Sarp Susuzer',
    framework: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    priority: 'critical',
    lastUpdated: '8 hours ago',
  },
];

const PAGE_SIZE = 10;

// --- Inline SVG icons for Ask AI pill ---
// The Ask AI icon is the JupiterOne planet mark (green sphere + orbital ring)
const AskAIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" fill="#CDEA68"/>
    <ellipse cx="10" cy="11.5" rx="7" ry="3.2" fill="#A8C840" opacity="0.45"/>
    <ellipse cx="8.5" cy="7" rx="2.5" ry="1.6" fill="white" opacity="0.4" transform="rotate(-18 8.5 7)"/>
    <ellipse cx="10" cy="10" rx="11.5" ry="3.8" fill="none" stroke="#7BA020" strokeWidth="1.3" transform="rotate(-28 10 10)"/>
    <path d="M2.8 6.8 Q10 5.6 17.2 7.5" stroke="#CDEA68" strokeWidth="2" fill="none"/>
  </svg>
);

// Filter icon for "Filters" outline button
const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Search icon for input prefix
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Plus icon for Create button
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
        <Button variant="outline" icon={<FilterIcon />}>Filters</Button>
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
