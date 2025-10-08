import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';
import { ArrowUpDown } from 'lucide-react';

interface TablesPageProps {
  onNavigate: (page: Page) => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const initialData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

export default function TablesPage({ onNavigate }: TablesPageProps) {
  const [data, setData] = useState(initialData);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');

  const handleSort = (field: keyof User) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...data].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  const filteredData = filterStatus === 'all' ? data : data.filter(user => user.status === filterStatus);

  const handleReset = () => {
    setData(initialData);
    setSortField(null);
    setSortDirection('asc');
    setFilterStatus('all');
  };

  const codeSnippets = {
    selenium: `driver.get("http://localhost:5173/tables")

# Get all table rows
rows = driver.find_elements(By.CSS_SELECTOR, "#data-table tbody tr")

# Extract data from first row
first_row = rows[0]
cells = first_row.find_elements(By.TAG_NAME, "td")
name = cells[0].text
email = cells[1].text

# Click sort button
driver.find_element(By.ID, "sort-name").click()

# Verify sorting
rows_after = driver.find_elements(By.CSS_SELECTOR, "#data-table tbody tr")
first_name_after = rows_after[0].find_element(By.CSS_SELECTOR, "td:first-child").text
assert first_name_after != name  # Order changed`,
    playwright: `test('table operations', async ({ page }) => {
  await page.goto('http://localhost:5173/tables');

  // Get table data
  const rows = await page.locator('#data-table tbody tr').all();
  expect(rows.length).toBeGreaterThan(0);

  // Extract cell data
  const firstRowName = await page.locator('#data-table tbody tr:first-child td:nth-child(1)').textContent();

  // Test sorting
  await page.click('#sort-name');
  const firstRowAfterSort = await page.locator('#data-table tbody tr:first-child td:nth-child(1)').textContent();

  // Test filtering
  await page.selectOption('#status-filter', 'Active');
  const activeRows = await page.locator('#data-table tbody tr').count();
});`,
    cypress: `it('handles table operations', () => {
  cy.visit('http://localhost:5173/tables');

  // Verify table exists and has data
  cy.get('#data-table tbody tr').should('have.length.gt', 0);

  // Extract data from cells
  cy.get('#data-table tbody tr').first().within(() => {
    cy.get('td').eq(0).invoke('text').as('firstName');
  });

  // Test sorting
  cy.get('#sort-name').click();
  cy.get('#data-table tbody tr').first()
    .find('td').eq(0).should('not.have.text', '@firstName');

  // Test filtering
  cy.get('#status-filter').select('Active');
  cy.get('#data-table tbody tr').each(($row) => {
    cy.wrap($row).find('[data-testid="status-badge"]')
      .should('contain', 'Active');
  });
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Table Operations"
        description="Master extracting, sorting, filtering, and validating tabular data"
        goals={[
          'Extract data from table cells',
          'Iterate through table rows',
          'Test sorting functionality',
          'Verify filtering works correctly',
          'Count rows matching criteria',
          'Validate data in specific columns',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">User Data Table</h3>
            <div className="flex items-center gap-2">
              <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">
                Filter:
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table id="data-table" className="w-full" data-testid="user-table">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button
                      id="sort-name"
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Name
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      id="sort-email"
                      onClick={() => handleSort('email')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Email
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      id="sort-role"
                      onClick={() => handleSort('role')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Role
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      id="sort-status"
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Status
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredData.map((user, index) => (
                  <tr key={user.id} data-testid={`row-${index}`} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{user.role}</td>
                    <td className="px-4 py-3">
                      <span
                        data-testid="status-badge"
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <p id="row-count">
              Showing <span className="font-medium">{filteredData.length}</span> of{' '}
              <span className="font-medium">{data.length}</span> users
            </p>
            {sortField && (
              <p id="sort-info">
                Sorted by: <span className="font-medium">{sortField}</span> ({sortDirection})
              </p>
            )}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Techniques</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Use CSS selectors to target specific cells (tbody tr td:nth-child(n))</li>
              <li>• Iterate through all rows to extract and validate data</li>
              <li>• Test sorting by clicking column headers and verifying order</li>
              <li>• Apply filters and count visible rows</li>
              <li>• Verify data consistency across operations</li>
            </ul>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
