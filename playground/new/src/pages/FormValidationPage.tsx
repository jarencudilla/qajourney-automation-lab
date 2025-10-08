import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';

interface FormValidationPageProps {
  onNavigate: (page: Page) => void;
}

export default function FormValidationPage({ onNavigate }: FormValidationPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    phone: '',
    website: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    const age = parseInt(formData.age);
    if (!formData.age) newErrors.age = 'Age is required';
    else if (age < 18 || age > 99) newErrors.age = 'Age must be between 18 and 99';

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Phone must be 10 digits';

    if (formData.website && !/^https?:\/\/.+/.test(formData.website))
      newErrors.website = 'Website must be a valid URL';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      age: '',
      phone: '',
      website: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const codeSnippets = {
    selenium: `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("http://localhost:5173/form-validation")

# Test invalid email
email_input = driver.find_element(By.ID, "email")
email_input.send_keys("invalid-email")
driver.find_element(By.ID, "submit-btn").click()

# Wait for error message
error = WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.ID, "email-error"))
)
assert "invalid" in error.text.lower()

# Test valid form
driver.find_element(By.ID, "fullName").send_keys("John Doe")
email_input.clear()
email_input.send_keys("john@example.com")
driver.find_element(By.ID, "age").send_keys("25")
driver.find_element(By.ID, "password").send_keys("password123")
driver.find_element(By.ID, "confirmPassword").send_keys("password123")
driver.find_element(By.ID, "submit-btn").click()`,
    playwright: `import { test, expect } from '@playwright/test';

test('form validation', async ({ page }) => {
  await page.goto('http://localhost:5173/form-validation');

  // Test with invalid data
  await page.fill('#email', 'invalid-email');
  await page.click('#submit-btn');

  // Check error message
  await expect(page.locator('#email-error')).toBeVisible();

  // Fill valid data
  await page.fill('#fullName', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#age', '25');
  await page.fill('#password', 'password123');
  await page.fill('#confirmPassword', 'password123');

  // Submit
  await page.click('#submit-btn');

  // Verify success
  await expect(page.locator('#success-message')).toBeVisible();
});`,
    cypress: `describe('Form Validation', () => {
  it('should validate form fields', () => {
    cy.visit('http://localhost:5173/form-validation');

    // Test invalid email
    cy.get('#email').type('invalid-email');
    cy.get('#submit-btn').click();
    cy.get('#email-error').should('be.visible');

    // Fill valid data
    cy.get('#fullName').type('John Doe');
    cy.get('#email').clear().type('john@example.com');
    cy.get('#age').type('25');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');

    // Submit and verify
    cy.get('#submit-btn').click();
    cy.get('#success-message').should('be.visible');
  });
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Form Validation"
        description="Test comprehensive form validation including required fields, pattern matching, and custom validation rules"
        goals={[
          'Test required field validation',
          'Validate email format',
          'Check numeric range validation',
          'Verify password strength rules',
          'Test password matching',
          'Handle validation error messages',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">
                Age * (18-99)
              </label>
              <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                min="18"
                max="99"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.age ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.age && (
                <p id="age-error" className="mt-1 text-sm text-red-600">
                  {errors.age}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-slate-700 mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.website ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.website && (
                <p id="website-error" className="mt-1 text-sm text-red-600">
                  {errors.website}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password * (Min 8 characters)
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              id="submit-btn"
              className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Validate & Submit
            </button>
          </form>

          {submitted && (
            <div id="success-message" className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">Form Validated Successfully!</p>
              <p className="text-sm text-green-700 mt-1">All validation rules passed.</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Validation Rules to Test</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Name: Required field</li>
              <li>• Email: Required, must be valid format</li>
              <li>• Age: Required, must be 18-99</li>
              <li>• Phone: Optional, must be 10 digits if provided</li>
              <li>• Website: Optional, must be valid URL if provided</li>
              <li>• Password: Required, minimum 8 characters</li>
              <li>• Confirm Password: Must match password</li>
            </ul>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
