import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';
import { Lock } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

const VALID_CREDENTIALS = {
  username: 'testuser',
  password: 'Test@123',
};

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      setSuccess(true);
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setError('Account locked after 3 failed attempts');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError('');
    setSuccess(false);
    setAttempts(0);
  };

  const codeSnippets = {
    selenium: `driver.get("http://localhost:5173/login")

# Test invalid login
driver.find_element(By.ID, "username").send_keys("wronguser")
driver.find_element(By.ID, "password").send_keys("wrongpass")
driver.find_element(By.ID, "login-btn").click()

# Verify error message
error = driver.find_element(By.ID, "error-message")
assert error.is_displayed()

# Test valid login
driver.find_element(By.ID, "username").clear()
driver.find_element(By.ID, "username").send_keys("testuser")
driver.find_element(By.ID, "password").clear()
driver.find_element(By.ID, "password").send_keys("Test@123")
driver.find_element(By.ID, "login-btn").click()

# Verify success
success = WebDriverWait(driver, 5).until(
    EC.visibility_of_element_located((By.ID, "success-message"))
)`,
    playwright: `test('login functionality', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // Test invalid credentials
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpass');
  await page.click('#login-btn');
  await expect(page.locator('#error-message')).toBeVisible();

  // Test valid credentials
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'Test@123');
  await page.click('#login-btn');
  await expect(page.locator('#success-message')).toBeVisible();
});`,
    cypress: `it('handles login flow', () => {
  cy.visit('http://localhost:5173/login');

  // Invalid login
  cy.get('#username').type('wronguser');
  cy.get('#password').type('wrongpass');
  cy.get('#login-btn').click();
  cy.get('#error-message').should('be.visible');

  // Valid login
  cy.get('#username').clear().type('testuser');
  cy.get('#password').clear().type('Test@123');
  cy.get('#login-btn').click();
  cy.get('#success-message').should('be.visible');
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Login Scenario"
        description="Practice authentication testing with valid/invalid credentials and error handling"
        goals={[
          'Test with valid credentials',
          'Test with invalid credentials',
          'Verify error messages',
          'Test account lockout after failed attempts',
          'Clear and re-enter credentials',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-slate-900 mb-2">Login Test Scenario</h3>
            <p className="text-sm text-center text-slate-600">Use the credentials below to test</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-700 mb-2">Valid Credentials:</p>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-slate-600">Username:</span>{' '}
                <code className="px-2 py-1 bg-white rounded border border-slate-300 font-mono">testuser</code>
              </p>
              <p>
                <span className="text-slate-600">Password:</span>{' '}
                <code className="px-2 py-1 bg-white rounded border border-slate-300 font-mono">Test@123</code>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                disabled={attempts >= 3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
                data-testid="username-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={attempts >= 3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
                data-testid="password-input"
              />
            </div>

            {error && (
              <div id="error-message" className="p-3 bg-red-50 border border-red-200 rounded-lg" data-testid="error-message">
                <p className="text-sm text-red-800">{error}</p>
                {attempts > 0 && attempts < 3 && (
                  <p className="text-xs text-red-600 mt-1">Attempts remaining: {3 - attempts}</p>
                )}
              </div>
            )}

            {success && (
              <div id="success-message" className="p-3 bg-green-50 border border-green-200 rounded-lg" data-testid="success-message">
                <p className="text-sm text-green-800 font-medium">Login Successful!</p>
                <p className="text-xs text-green-700 mt-1">Welcome back, {username}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                id="login-btn"
                disabled={attempts >= 3}
                className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Test Scenarios to Try</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Test with valid credentials (testuser / Test@123)</li>
              <li>• Test with invalid username</li>
              <li>• Test with invalid password</li>
              <li>• Test with empty fields</li>
              <li>• Try 3 failed attempts to trigger account lock</li>
              <li>• Verify error messages are displayed correctly</li>
            </ul>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
