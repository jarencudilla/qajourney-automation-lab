import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';

interface AlertsPageProps {
  onNavigate: (page: Page) => void;
}

export default function AlertsPage({ onNavigate }: AlertsPageProps) {
  const [alertResult, setAlertResult] = useState('');
  const [confirmResult, setConfirmResult] = useState('');
  const [promptResult, setPromptResult] = useState('');

  const handleAlert = () => {
    alert('This is a simple alert!');
    setAlertResult('Alert was displayed');
  };

  const handleConfirm = () => {
    const result = confirm('Do you want to proceed?');
    setConfirmResult(result ? 'User clicked OK' : 'User clicked Cancel');
  };

  const handlePrompt = () => {
    const result = prompt('What is your name?', 'John Doe');
    setPromptResult(result ? `User entered: ${result}` : 'User cancelled the prompt');
  };

  const handleReset = () => {
    setAlertResult('');
    setConfirmResult('');
    setPromptResult('');
  };

  const codeSnippets = {
    selenium: `from selenium.webdriver.common.alert import Alert

driver.get("http://localhost:5173/alerts")

# Handle simple alert
driver.find_element(By.ID, "alert-btn").click()
alert = Alert(driver)
alert_text = alert.text
alert.accept()

# Handle confirm dialog
driver.find_element(By.ID, "confirm-btn").click()
confirm = Alert(driver)
confirm.accept()  # or confirm.dismiss()

# Handle prompt
driver.find_element(By.ID, "prompt-btn").click()
prompt = Alert(driver)
prompt.send_keys("Test User")
prompt.accept()`,
    playwright: `test('handle JavaScript dialogs', async ({ page }) => {
  // Setup dialog handler
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('Test User');
  });

  await page.goto('http://localhost:5173/alerts');

  // Trigger alert
  await page.click('#alert-btn');

  // Handle confirm
  await page.click('#confirm-btn');

  // Handle prompt
  await page.click('#prompt-btn');
});`,
    cypress: `it('handles JavaScript alerts', () => {
  cy.visit('http://localhost:5173/alerts');

  // Handle alert
  cy.on('window:alert', (text) => {
    expect(text).to.contains('simple alert');
  });
  cy.get('#alert-btn').click();

  // Handle confirm (accept)
  cy.on('window:confirm', () => true);
  cy.get('#confirm-btn').click();

  // Handle prompt
  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Test User');
  });
  cy.get('#prompt-btn').click();
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="JavaScript Alerts & Dialogs"
        description="Practice handling browser alerts, confirms, and prompts - common scenarios in web automation"
        goals={[
          'Handle simple alert dialogs',
          'Accept or dismiss confirm dialogs',
          'Send text to prompt dialogs',
          'Verify dialog messages',
          'Test dialog cancellation behavior',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Alert Dialog</h3>
            <p className="text-sm text-slate-600 mb-3">Simple alert with an OK button</p>
            <button
              id="alert-btn"
              onClick={handleAlert}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Trigger Alert
            </button>
            {alertResult && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">{alertResult}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Confirm Dialog</h3>
            <p className="text-sm text-slate-600 mb-3">Dialog with OK and Cancel buttons</p>
            <button
              id="confirm-btn"
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              Trigger Confirm
            </button>
            {confirmResult && (
              <div
                id="confirm-result"
                className={`mt-3 p-3 rounded-lg border ${
                  confirmResult.includes('OK')
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <p className={`text-sm ${confirmResult.includes('OK') ? 'text-green-800' : 'text-red-800'}`}>
                  {confirmResult}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Prompt Dialog</h3>
            <p className="text-sm text-slate-600 mb-3">Dialog with text input field</p>
            <button
              id="prompt-btn"
              onClick={handlePrompt}
              className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors"
            >
              Trigger Prompt
            </button>
            {promptResult && (
              <div id="prompt-result" className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-800">{promptResult}</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Tips</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Test both accepting and dismissing dialogs</li>
              <li>• Verify dialog text content</li>
              <li>• For prompts, test with and without input</li>
              <li>• Check application state after dialog interaction</li>
              <li>• Handle dialogs before they appear using listeners</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> In automation tests, you need to handle dialogs before they appear, as they block
              JavaScript execution. Set up dialog handlers before triggering the actions that create them.
            </p>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
