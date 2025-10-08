import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';
import { Loader2 } from 'lucide-react';

interface NetworkDelayPageProps {
  onNavigate: (page: Page) => void;
}

export default function NetworkDelayPage({ onNavigate }: NetworkDelayPageProps) {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [data3, setData3] = useState('');

  const simulateNetworkCall = async (delay: number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return `Data loaded after ${delay / 1000}s`;
  };

  const handleLoad1 = async () => {
    setLoading1(true);
    setData1('');
    const result = await simulateNetworkCall(2000);
    setData1(result);
    setLoading1(false);
  };

  const handleLoad2 = async () => {
    setLoading2(true);
    setData2('');
    const result = await simulateNetworkCall(5000);
    setData2(result);
    setLoading2(false);
  };

  const handleLoad3 = async () => {
    setLoading3(true);
    setData3('');
    const result = await simulateNetworkCall(8000);
    setData3(result);
    setLoading3(false);
  };

  const handleReset = () => {
    setLoading1(false);
    setLoading2(false);
    setLoading3(false);
    setData1('');
    setData2('');
    setData3('');
  };

  const codeSnippets = {
    selenium: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver.get("http://localhost:5173/network-delay")

# Click button to trigger load
driver.find_element(By.ID, "load-btn-1").click()

# Wait for loading spinner to disappear
WebDriverWait(driver, 10).until(
    EC.invisibility_of_element_located((By.ID, "loading-1"))
)

# Wait for data to appear
data = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "data-1"))
)
assert "loaded" in data.text.lower()`,
    playwright: `test('handle network delays', async ({ page }) => {
  await page.goto('http://localhost:5173/network-delay');

  // Trigger load
  await page.click('#load-btn-1');

  // Wait for loading state
  await expect(page.locator('#loading-1')).toBeVisible();

  // Wait for data to load
  await expect(page.locator('#data-1')).toBeVisible({
    timeout: 10000
  });

  // Verify content
  await expect(page.locator('#data-1'))
    .toContainText('loaded');
});`,
    cypress: `it('waits for network delays', () => {
  cy.visit('http://localhost:5173/network-delay');

  // Trigger load
  cy.get('#load-btn-1').click();

  // Verify loading state
  cy.get('#loading-1').should('be.visible');

  // Wait for data with extended timeout
  cy.get('#data-1', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'loaded');
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Network Delays & Async Operations"
        description="Practice handling loading states, network delays, and asynchronous operations"
        goals={[
          'Wait for loading indicators to appear',
          'Wait for loading to complete',
          'Handle different timeout durations',
          'Verify content after async operations',
          'Test with appropriate timeout strategies',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Load (2 seconds)</h3>
            <button
              id="load-btn-1"
              onClick={handleLoad1}
              disabled={loading1}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading1 ? 'Loading...' : 'Load Data'}
            </button>
            {loading1 && (
              <div id="loading-1" className="mt-3 flex items-center gap-2 text-slate-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading data...</span>
              </div>
            )}
            {data1 && (
              <div id="data-1" className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">{data1}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Medium Load (5 seconds)</h3>
            <button
              id="load-btn-2"
              onClick={handleLoad2}
              disabled={loading2}
              className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading2 ? 'Loading...' : 'Load Data'}
            </button>
            {loading2 && (
              <div id="loading-2" className="mt-3 flex items-center gap-2 text-slate-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading data...</span>
              </div>
            )}
            {data2 && (
              <div id="data-2" className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">{data2}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Slow Load (8 seconds)</h3>
            <button
              id="load-btn-3"
              onClick={handleLoad3}
              disabled={loading3}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {loading3 ? 'Loading...' : 'Load Data'}
            </button>
            {loading3 && (
              <div id="loading-3" className="mt-3 flex items-center gap-2 text-slate-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading data...</span>
              </div>
            )}
            {data3 && (
              <div id="data-3" className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">{data3}</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Approach</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Use explicit waits instead of hardcoded sleeps</li>
              <li>• Wait for loading indicators to appear first</li>
              <li>• Then wait for loading indicators to disappear</li>
              <li>• Finally verify the loaded content</li>
              <li>• Set appropriate timeout values (longer than expected delay)</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Best Practice:</strong> Always use explicit waits (WebDriverWait, page.waitFor, cy.wait) instead of
              fixed sleep() calls. Explicit waits are more reliable and make tests faster by proceeding as soon as conditions
              are met.
            </p>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
