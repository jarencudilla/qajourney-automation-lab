import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';

interface IFramesPageProps {
  onNavigate: (page: Page) => void;
}

export default function IFramesPage({ onNavigate }: IFramesPageProps) {
  const codeSnippets = {
    selenium: `driver.get("http://localhost:5173/iframes")

# Switch to iframe
iframe = driver.find_element(By.ID, "test-iframe")
driver.switch_to.frame(iframe)

# Interact with elements inside iframe
input_field = driver.find_element(By.ID, "iframe-input")
input_field.send_keys("Hello from iframe")

# Switch back to main content
driver.switch_to.default_content()

# Now interact with elements outside iframe
main_input = driver.find_element(By.ID, "main-input")`,
    playwright: `test('iframe interaction', async ({ page }) => {
  await page.goto('http://localhost:5173/iframes');

  // Get iframe
  const frame = page.frameLocator('#test-iframe');

  // Interact with elements inside iframe
  await frame.locator('#iframe-input').fill('Hello from iframe');
  await frame.locator('#iframe-button').click();

  // Main page elements
  await page.fill('#main-input', 'Main page text');
});`,
    cypress: `it('handles iframes', () => {
  cy.visit('http://localhost:5173/iframes');

  // Access iframe content
  cy.iframe('#test-iframe').within(() => {
    cy.get('#iframe-input').type('Hello from iframe');
    cy.get('#iframe-button').click();
  });

  // Back to main page
  cy.get('#main-input').type('Main page text');
});`,
  };

  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: system-ui; padding: 20px; background: #f8fafc; }
          .iframe-content { background: white; padding: 20px; border-radius: 8px; }
          input, button {
            padding: 8px 16px;
            margin: 8px 0;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 14px;
          }
          button {
            background: #3b82f6;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:hover { background: #2563eb; }
          .result {
            margin-top: 12px;
            padding: 12px;
            background: #dcfce7;
            border: 1px solid #86efac;
            border-radius: 6px;
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="iframe-content">
          <h3>Content Inside iFrame</h3>
          <p>This content is rendered inside an iframe</p>
          <input type="text" id="iframe-input" placeholder="Type something here" />
          <br>
          <button id="iframe-button" onclick="showResult()">Click Me!</button>
          <div id="iframe-result" class="result">
            <strong>Success!</strong> Button inside iframe was clicked.
          </div>
        </div>
        <script>
          function showResult() {
            document.getElementById('iframe-result').style.display = 'block';
          }
        </script>
      </body>
    </html>
  `;

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="iFrame Interaction"
        description="Master switching between iframe contexts and interacting with embedded content"
        goals={[
          'Switch to iframe context',
          'Interact with elements inside iframes',
          'Switch back to main page context',
          'Handle nested iframes',
          'Verify content in different contexts',
        ]}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Main Page Content</h3>
            <input
              type="text"
              id="main-input"
              placeholder="This input is on the main page"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">iFrame Content Below</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
              <iframe
                id="test-iframe"
                title="Test iFrame"
                srcDoc={iframeContent}
                className="w-full h-64 border border-slate-200 rounded-lg"
                data-testid="test-iframe"
              />
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Strategy</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Identify iframe element on main page</li>
              <li>• Switch context to the iframe</li>
              <li>• Interact with elements inside iframe</li>
              <li>• Switch back to main page to continue testing</li>
              <li>• Remember: Elements inside iframes require context switch</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> You cannot directly access elements inside an iframe without switching to its
              context first. Different frameworks handle this differently - Selenium uses switch_to.frame(), Playwright uses
              frameLocator(), and Cypress uses cy.iframe().
            </p>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
