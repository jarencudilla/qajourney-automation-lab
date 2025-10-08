import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';

interface DynamicDOMPageProps {
  onNavigate: (page: Page) => void;
}

export default function DynamicDOMPage({ onNavigate }: DynamicDOMPageProps) {
  const [showElement, setShowElement] = useState(false);
  const [showDelayed, setShowDelayed] = useState(false);
  const [elements, setElements] = useState<string[]>([]);

  const handleShowDelayed = () => {
    setShowDelayed(false);
    setTimeout(() => setShowDelayed(true), 3000);
  };

  const addElement = () => {
    setElements([...elements, `Element ${elements.length + 1}`]);
  };

  const removeElement = (index: number) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setShowElement(false);
    setShowDelayed(false);
    setElements([]);
  };

  const codeSnippets = {
    selenium: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver.get("http://localhost:5173/dynamic-dom")

# Click to show element
driver.find_element(By.ID, "show-btn").click()

# Wait for element to appear
element = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, "dynamic-element"))
)
assert element.is_displayed()

# Test delayed element
driver.find_element(By.ID, "show-delayed-btn").click()
delayed = WebDriverWait(driver, 5).until(
    EC.visibility_of_element_located((By.ID, "delayed-element"))
)`,
    playwright: `test('dynamic DOM handling', async ({ page }) => {
  await page.goto('http://localhost:5173/dynamic-dom');

  // Show element
  await page.click('#show-btn');
  await expect(page.locator('#dynamic-element')).toBeVisible();

  // Hide element
  await page.click('#hide-btn');
  await expect(page.locator('#dynamic-element')).toBeHidden();

  // Test delayed element
  await page.click('#show-delayed-btn');
  await expect(page.locator('#delayed-element')).toBeVisible({
    timeout: 5000
  });
});`,
    cypress: `it('handles dynamic DOM changes', () => {
  cy.visit('http://localhost:5173/dynamic-dom');

  // Show element
  cy.get('#show-btn').click();
  cy.get('#dynamic-element').should('be.visible');

  // Hide element
  cy.get('#hide-btn').click();
  cy.get('#dynamic-element').should('not.be.visible');

  // Test delayed element
  cy.get('#show-delayed-btn').click();
  cy.get('#delayed-element', { timeout: 5000 })
    .should('be.visible');
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Dynamic DOM Manipulation"
        description="Practice handling elements that appear, disappear, or change dynamically - essential for modern web applications"
        goals={[
          'Wait for elements to become visible',
          'Handle delayed element rendering',
          'Detect when elements are removed from DOM',
          'Work with dynamically added elements',
          'Implement proper waiting strategies',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Toggle Element Visibility</h3>
            <div className="flex gap-3 mb-4">
              <button
                id="show-btn"
                onClick={() => setShowElement(true)}
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                Show Element
              </button>
              <button
                id="hide-btn"
                onClick={() => setShowElement(false)}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Hide Element
              </button>
            </div>
            {showElement && (
              <div
                id="dynamic-element"
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                data-testid="dynamic-element"
              >
                <p className="text-blue-800 font-medium">I was dynamically shown!</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Delayed Element (3 seconds)</h3>
            <button
              id="show-delayed-btn"
              onClick={handleShowDelayed}
              className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Show with Delay
            </button>
            {showDelayed && (
              <div id="delayed-element" className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">I appeared after 3 seconds!</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Dynamic List Management</h3>
            <button
              id="add-element-btn"
              onClick={addElement}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
            >
              Add Element
            </button>
            <div id="dynamic-list" className="space-y-2">
              {elements.map((element, index) => (
                <div
                  key={index}
                  data-testid={`list-item-${index}`}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <span className="text-slate-700">{element}</span>
                  <button
                    onClick={() => removeElement(index)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    data-testid={`remove-btn-${index}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {elements.length === 0 && (
                <p className="text-slate-500 text-sm italic">No elements added yet. Click "Add Element" to start.</p>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Strategies</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Use explicit waits for elements to appear</li>
              <li>• Verify element visibility state changes</li>
              <li>• Test adding and removing dynamic elements</li>
              <li>• Handle elements that appear after delays</li>
              <li>• Check that removed elements are no longer in DOM</li>
            </ul>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
