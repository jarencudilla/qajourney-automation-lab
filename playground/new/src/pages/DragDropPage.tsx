import { useState } from 'react';
import { Page } from '../App';
import Layout from '../components/Layout';
import TestScenario from '../components/TestScenario';
import { GripVertical } from 'lucide-react';

interface DragDropPageProps {
  onNavigate: (page: Page) => void;
}

interface DraggableItem {
  id: number;
  text: string;
}

export default function DragDropPage({ onNavigate }: DragDropPageProps) {
  const [sourceItems, setSourceItems] = useState<DraggableItem[]>([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
  ]);
  const [targetItems, setTargetItems] = useState<DraggableItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<DraggableItem | null>(null);

  const handleDragStart = (item: DraggableItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropToTarget = () => {
    if (draggedItem) {
      setSourceItems(sourceItems.filter(item => item.id !== draggedItem.id));
      setTargetItems([...targetItems, draggedItem]);
      setDraggedItem(null);
    }
  };

  const handleDropToSource = () => {
    if (draggedItem) {
      setTargetItems(targetItems.filter(item => item.id !== draggedItem.id));
      setSourceItems([...sourceItems, draggedItem]);
      setDraggedItem(null);
    }
  };

  const handleReset = () => {
    setSourceItems([
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
    ]);
    setTargetItems([]);
    setDraggedItem(null);
  };

  const codeSnippets = {
    selenium: `from selenium.webdriver import ActionChains

driver.get("http://localhost:5173/drag-drop")

# Find source and target elements
source = driver.find_element(By.ID, "draggable-1")
target = driver.find_element(By.ID, "drop-target")

# Perform drag and drop
actions = ActionChains(driver)
actions.drag_and_drop(source, target).perform()

# Verify item moved
assert len(driver.find_elements(By.CSS_SELECTOR, "#drop-target .item")) > 0`,
    playwright: `test('drag and drop', async ({ page }) => {
  await page.goto('http://localhost:5173/drag-drop');

  // Drag item to target
  await page.dragAndDrop(
    '#draggable-1',
    '#drop-target'
  );

  // Verify item was moved
  const targetItems = await page.locator('#drop-target .item').count();
  expect(targetItems).toBeGreaterThan(0);
});`,
    cypress: `it('performs drag and drop', () => {
  cy.visit('http://localhost:5173/drag-drop');

  // Use cypress-drag-drop plugin or trigger events manually
  cy.get('#draggable-1')
    .trigger('dragstart');

  cy.get('#drop-target')
    .trigger('drop');

  // Verify item was moved
  cy.get('#drop-target .item').should('have.length.gt', 0);
});`,
  };

  return (
    <Layout onNavigate={onNavigate}>
      <TestScenario
        title="Drag & Drop"
        description="Practice drag-and-drop interactions and coordinate-based element manipulation"
        goals={[
          'Perform drag and drop operations',
          'Move elements between containers',
          'Verify element positions after drag',
          'Test drag and drop validation',
          'Handle complex drag scenarios',
        ]}
        onReset={handleReset}
        onNavigate={onNavigate}
        codeSnippets={codeSnippets}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Source Items</h3>
              <div
                id="drop-source"
                onDragOver={handleDragOver}
                onDrop={handleDropToSource}
                className="min-h-[300px] p-4 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg"
              >
                {sourceItems.length === 0 ? (
                  <p className="text-center text-slate-500 mt-8">All items moved to target</p>
                ) : (
                  <div className="space-y-2">
                    {sourceItems.map((item) => (
                      <div
                        key={item.id}
                        id={`draggable-${item.id}`}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="flex items-center gap-2 p-3 bg-white border border-slate-300 rounded-lg cursor-move hover:bg-slate-50 hover:border-blue-400 transition-colors item"
                        data-testid={`source-item-${item.id}`}
                      >
                        <GripVertical className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-900">{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Drop Target</h3>
              <div
                id="drop-target"
                onDragOver={handleDragOver}
                onDrop={handleDropToTarget}
                className="min-h-[300px] p-4 bg-green-50 border-2 border-dashed border-green-300 rounded-lg"
                data-testid="drop-target"
              >
                {targetItems.length === 0 ? (
                  <p className="text-center text-slate-500 mt-8">Drag items here</p>
                ) : (
                  <div className="space-y-2">
                    {targetItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="flex items-center gap-2 p-3 bg-white border border-slate-300 rounded-lg cursor-move hover:bg-slate-50 hover:border-green-400 transition-colors item"
                        data-testid={`target-item-${item.id}`}
                      >
                        <GripVertical className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-900">{item.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h4 className="font-medium text-slate-900 mb-2">Status</h4>
            <div className="flex gap-8 text-sm">
              <p className="text-slate-600">
                Source: <span id="source-count" className="font-medium text-slate-900">{sourceItems.length}</span> items
              </p>
              <p className="text-slate-600">
                Target: <span id="target-count" className="font-medium text-slate-900">{targetItems.length}</span> items
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-2">Testing Approaches</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Selenium: Use ActionChains with drag_and_drop() method</li>
              <li>• Playwright: Use dragAndDrop() method with source and target selectors</li>
              <li>• Cypress: Use trigger('dragstart') and trigger('drop') or cypress-drag-drop plugin</li>
              <li>• Verify items are removed from source and added to target</li>
              <li>• Count items in both containers before and after drag</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Drag and drop can be tricky in automation. Some frameworks require special handling or
              JavaScript execution. Always verify your framework's recommended approach for drag-and-drop operations.
            </p>
          </div>
        </div>
      </TestScenario>
    </Layout>
  );
}
