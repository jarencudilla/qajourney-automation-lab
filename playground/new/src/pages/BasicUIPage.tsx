import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';

interface BasicUIPageProps {
  onNavigate: (page: Page) => void;
}

export default function BasicUIPage({ onNavigate }: BasicUIPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setSubmitted(false);
  };

  const codeSnippets = {
    selenium: `from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("http://localhost:5173/basic-ui")

# Locate and interact with elements
name_input = driver.find_element(By.ID, "name")
email_input = driver.find_element(By.ID, "email")
password_input = driver.find_element(By.ID, "password")
submit_btn = driver.find_element(By.ID, "submit-btn")

# Fill the form
name_input.send_keys("John Doe")
email_input.send_keys("john@example.com")
password_input.send_keys("password123")

# Submit
submit_btn.click()

# Verify result
result = driver.find_element(By.ID, "result-message")
assert "Success" in result.text`,
    playwright: `import { test, expect } from '@playwright/test';

test('basic UI interaction', async ({ page }) => {
  await page.goto('http://localhost:5173/basic-ui');

  // Fill the form
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#password', 'password123');

  // Click submit
  await page.click('#submit-btn');

  // Verify result
  await expect(page.locator('#result-message')).toContainText('Success');
});`,
    cypress: `describe('Basic UI Elements', () => {
  it('should fill and submit the form', () => {
    cy.visit('http://localhost:5173/basic-ui');

    // Fill form fields
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    cy.get('#password').type('password123');

    // Submit the form
    cy.get('#submit-btn').click();

    // Verify result
    cy.get('#result-message')
      .should('be.visible')
      .and('contain', 'Success');
  });
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Basic UI Elements"
        description="Practice fundamental UI interactions including form inputs, buttons, and basic validation"
        goals={[
          'Verify placeholder text and attributes',
          'Validate required field behavior',
          'Test form submission',
          'Inspect DOM structure and element properties',
          'Practice basic selector strategies',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Test Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="name-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="email-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  data-testid="password-input"
                />
              </div>

              <button
                type="submit"
                id="submit-btn"
                className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                data-testid="submit-button"
              >
                Submit Form
              </button>
            </form>
          </div>

          {submitted && (
            <div
              id="result-message"
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
              data-testid="success-message"
            >
              <p className="text-green-800 font-medium">Success!</p>
              <p className="text-sm text-green-700 mt-1">
                Form submitted with: {name} ({email})
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Tips</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Test both valid and invalid inputs</li>
              <li>• Verify required field validation</li>
              <li>• Check placeholder text matches expectations</li>
              <li>• Inspect element attributes (id, name, type, etc.)</li>
              <li>• Try submitting with empty fields</li>
            </ul>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
