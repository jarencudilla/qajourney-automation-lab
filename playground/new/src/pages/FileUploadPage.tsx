import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';
import { Upload, File, CheckCircle, XCircle } from 'lucide-react';

interface FileUploadPageProps {
  onNavigate: (page: Page) => void;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  valid: boolean;
  message: string;
}

export default function FileUploadPage({ onNavigate }: FileUploadPageProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): { valid: boolean; message: string } => {
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];

    if (file.size > maxSize) {
      return { valid: false, message: 'File too large (max 5MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: 'File type not allowed' };
    }

    return { valid: true, message: 'Upload successful' };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(Array.from(files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files) {
      processFiles(Array.from(files));
    }
  };

  const processFiles = (files: File[]) => {
    const newFiles = files.map(file => {
      const validation = validateFile(file);
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        valid: validation.valid,
        message: validation.message,
      };
    });
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setDragActive(false);
  };

  const codeSnippets = {
    selenium: `driver.get("http://localhost:5173/file-upload")

# Locate file input (usually hidden)
file_input = driver.find_element(By.ID, "file-input")

# Send file path to input
file_path = "/path/to/your/file.jpg"
file_input.send_keys(file_path)

# Wait for upload confirmation
upload_success = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "upload-success"))
)`,
    playwright: `test('file upload', async ({ page }) => {
  await page.goto('http://localhost:5173/file-upload');

  // Upload file
  const fileInput = page.locator('#file-input');
  await fileInput.setInputFiles('path/to/file.jpg');

  // Verify upload
  await expect(page.locator('.upload-success')).toBeVisible();

  // Upload multiple files
  await fileInput.setInputFiles([
    'path/to/file1.jpg',
    'path/to/file2.pdf'
  ]);
});`,
    cypress: `it('uploads files', () => {
  cy.visit('http://localhost:5173/file-upload');

  // Upload single file
  cy.get('#file-input').selectFile('cypress/fixtures/example.jpg');

  // Verify upload
  cy.get('.upload-success').should('be.visible');

  // Upload with drag and drop
  cy.get('#drop-zone').selectFile('cypress/fixtures/example.pdf', {
    action: 'drag-drop'
  });
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="File Upload"
        description="Test file input handling, validation, and upload scenarios"
        goals={[
          'Upload single and multiple files',
          'Test file type validation',
          'Test file size validation',
          'Handle drag and drop uploads',
          'Verify upload success/failure messages',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div
            id="drop-zone"
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-900 mb-1">Drop files here or click to browse</p>
                <p className="text-sm text-slate-600">Max size: 5MB | Allowed: JPG, PNG, GIF, PDF, TXT</p>
              </div>
              <label
                htmlFor="file-input"
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Choose Files
              </label>
              <input
                type="file"
                id="file-input"
                multiple
                onChange={handleFileChange}
                className="hidden"
                data-testid="file-input"
              />
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div id="upload-results" className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Uploaded Files</h3>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  data-testid={`upload-result-${index}`}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    file.valid
                      ? 'bg-green-50 border-green-200 upload-success'
                      : 'bg-red-50 border-red-200 upload-error'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {file.valid ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <File className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    </div>
                    <p className="text-xs text-slate-600">
                      {formatFileSize(file.size)} • {file.type || 'unknown'}
                    </p>
                    <p className={`text-xs mt-1 ${file.valid ? 'text-green-700' : 'text-red-700'}`}>
                      {file.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <button
              onClick={() => setUploadedFiles([])}
              className="px-4 py-2 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
            >
              Clear All
            </button>
          )}

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Strategies</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• File inputs are often hidden - use the input element directly</li>
              <li>• Use send_keys (Selenium) or setInputFiles (Playwright) to upload</li>
              <li>• Test with valid file types and sizes</li>
              <li>• Test with invalid files to verify validation</li>
              <li>• Verify success/error messages appear correctly</li>
              <li>• Test multiple file uploads if supported</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Valid Test Files</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Small JPEG image (&lt; 5MB)</li>
                <li>• PNG screenshot (&lt; 5MB)</li>
                <li>• PDF document (&lt; 5MB)</li>
                <li>• Text file (&lt; 5MB)</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Invalid Test Cases</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• File larger than 5MB</li>
                <li>• Unsupported file type (e.g., .exe, .zip)</li>
                <li>• Video files (not in allowed list)</li>
                <li>• Audio files (not in allowed list)</li>
              </ul>
            </div>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
