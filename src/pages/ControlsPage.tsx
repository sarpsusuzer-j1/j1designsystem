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
  {
    id: '1',
    identifier: 'CSF-DE-01',
    name: '(Manual Verification) DE.AE-03: Information is correlated from multiple sources',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'pass',
    state: 'live',
    effectiveStatus: null,
    evaluated: '2 days ago',
  },
  {
    id: '2',
    identifier: 'CSF-DE-02',
    name: '(Manual Verification) DE.AE-04: The estimated impact and scope of adverse events are understood',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: 'no-tests',
    evaluated: '5 hours ago',
  },
  {
    id: '3',
    identifier: 'CSF-DE-03',
    name: '(Manual Verification) DE.CM-01: Networks and network services are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '1 day ago',
  },
  {
    id: '4',
    identifier: 'CSF-DE-04',
    name: '(Manual Verification) DE.CM-02: The physical environment is monitored',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-datapoints',
    evaluated: null,
  },
  {
    id: '5',
    identifier: 'CSF-DE-05',
    name: '(Manual Verification) DE.CM-03: Personnel activity and technology usage are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '3 days ago',
  },
  {
    id: '6',
    identifier: 'CSF-DE-06',
    name: '(Manual Verification) DE.CM-06: External service provider activities are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'pass',
    state: 'live',
    effectiveStatus: null,
    evaluated: '6 hours ago',
  },
  {
    id: '7',
    identifier: 'CSF-DE-07',
    name: '(Manual Verification) DE.CM-07: Monitoring for unauthorized personnel, connections, and software',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'fail',
    state: 'live',
    effectiveStatus: 'no-tests',
    evaluated: '1 week ago',
  },
  {
    id: '8',
    identifier: 'CSF-DE-08',
    name: '(Manual Verification) DE.CM-09: Computing hardware and software are monitored',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: null,
    state: 'draft',
    effectiveStatus: 'no-datapoints',
    evaluated: null,
  },
  {
    id: '9',
    identifier: 'CSF-DE-09',
    name: '(Manual Verification) DE.DP-01: Roles and responsibilities for detection are defined',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '12 hours ago',
  },
  {
    id: '10',
    identifier: 'CSF-DE-10',
    name: '(Manual Verification) DE.DP-02: Detection activities comply with applicable requirements',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'pass',
    state: 'live',
    effectiveStatus: null,
    evaluated: '4 days ago',
  },
  {
    id: '11',
    identifier: 'CSF-DE-11',
    name: '(Manual Verification) DE.DP-04: Event detection information is communicated',
    owner: 'Sarp Susuzer',
    catalog: 'JupiterOne',
    status: 'fail',
    state: 'live',
    effectiveStatus: null,
    evaluated: '2 hours ago',
  },
  {
    id: '12',
    identifier: 'CSF-DE-12',
    name: '(Manual Verification) DE.DP-05: Detection processes are continuously improved',
    owner: 'Sarp Susuzer',
    catalog: 'CIS Controls V8',
    status: 'fail',
    state: 'live',
    effectiveStatus: 'no-tests',
    evaluated: '8 hours ago',
  },
];

const PAGE_SIZE = 10;

const AskAIIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 2L8.5 5.5H12L9.25 7.75L10.25 11.5L7 9.25L3.75 11.5L4.75 7.75L2 5.5H5.5L7 2Z" fill="currentColor"/>
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

const HealthIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#0A6643" strokeWidth="1.5"/>
    <path d="M7.5 11l2.5 2.5 4.5-5" stroke="#0A6643" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#8A2014" strokeWidth="1.5"/>
    <path d="M8 8l6 6M14 8l-6 6" stroke="#8A2014" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PriorityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3L3 19H19L11 3Z" stroke="#A6320A" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 9v4" stroke="#A6320A" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="11" cy="15" r="0.75" fill="#A6320A"/>
  </svg>
);

const FrameworkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="#828987" strokeWidth="1.5"/>
    <rect x="13" y="3" width="6" height="6" rx="1" stroke="#828987" strokeWidth="1.5"/>
    <rect x="3" y="13" width="6" height="6" rx="1" stroke="#828987" strokeWidth="1.5"/>
    <rect x="13" y="13" width="6" height="6" rx="1" stroke="#828987" strokeWidth="1.5"/>
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
      {/* Page Content Header */}
      <div className="controls-header">
        <h1 className="controls-title">Controls</h1>
        <button className="ask-ai-pill">
          <AskAIIcon />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Toolbar Row: tabs left, create button right */}
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

      {/* Stat cards */}
      <div className="controls-stats">
        <SummaryCard
          value="26% healthy"
          label="Overall controls status"
          icon={<HealthIcon />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="10 controls"
          label="High priority failing"
          icon={<PriorityIcon />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="80 controls"
          label="Failing"
          icon={<FailIcon />}
          iconBg="#F1F2F1"
        />
        <SummaryCard
          value="10 Frameworks"
          label="Impacted"
          icon={<FrameworkIcon />}
          iconBg="#F1F2F1"
        />
      </div>

      {/* Filter + Search row */}
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

      {/* Table */}
      <div className="controls-table-section">
        <Table
          rows={pageRows}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
        />
      </div>

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
