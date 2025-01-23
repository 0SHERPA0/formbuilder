import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormBuilder from './FormBuilder';
import '@testing-library/jest-dom/extend-expect';

// Test 1: Check if the "Drag components here" message is displayed when no components are added
test('displays "Drag components here" when no components are added', () => {
  render(<FormBuilder />);
  
  expect(screen.getByText('Drag components here to build the form')).toBeInTheDocument();
});

// Test 2: Check if components are added correctly to the form
test('adds components to the form on drag and drop', () => {
  render(<FormBuilder />);
  
  // Simulate drag and drop
  const draggableItem = screen.getByText('Input Field'); // Modify as needed
  fireEvent.dragStart(draggableItem);
  
  // Simulate drop
  const dropArea = screen.getByText('Form Preview');
  fireEvent.drop(dropArea);
  
  // Check if the Input Field component was added to the form
  expect(screen.getByText('Input Field')).toBeInTheDocument();
});

// Test 3: Check if the validation logic works correctly
test('validates form correctly when button is clicked', async () => {
  render(<FormBuilder />);
  
  // Add Input Field and Button components to the form
  const draggableItem = screen.getByText('Input Field');
  fireEvent.dragStart(draggableItem);
  const dropArea = screen.getByText('Form Preview');
  fireEvent.drop(dropArea);

  const buttonItem = screen.getByText('Button');
  fireEvent.dragStart(buttonItem);
  fireEvent.drop(dropArea);
  
  // Simulate clicking the submit button
  const button = screen.getByText('Submit');
  fireEvent.click(button);

  // Wait for validation error popup to appear (assuming validation errors are set)
  await waitFor(() => screen.getByText('Validation Errors'));
  expect(screen.getByText('Label is required')).toBeInTheDocument();
});

// Test 4: Check if the schema is generated correctly when components are added
test('generates JSON schema when components are added', async () => {
  render(<FormBuilder />);
  
  // Add an Input Field component
  const draggableItem = screen.getByText('Input Field');
  fireEvent.dragStart(draggableItem);
  const dropArea = screen.getByText('Form Preview');
  fireEvent.drop(dropArea);

  // Check if JSON schema is generated (assuming the schema is displayed)
  await waitFor(() => screen.getByText('JSON Schema'));
  expect(screen.getByText('"type": "input"')).toBeInTheDocument();
});

// Test 5: Ensure button click triggers validation and schema generation
test('button click triggers form validation and schema generation', async () => {
  render(<FormBuilder />);
  
  // Add components to the form
  const draggableItem = screen.getByText('Input Field');
  fireEvent.dragStart(draggableItem);
  const dropArea = screen.getByText('Form Preview');
  fireEvent.drop(dropArea);

  const buttonItem = screen.getByText('Button');
  fireEvent.dragStart(buttonItem);
  fireEvent.drop(dropArea);

  // Click the button
  const button = screen.getByText('Submit');
  fireEvent.click(button);

  // Check if validation popup is displayed
  await waitFor(() => screen.getByText('Validation Errors'));
  expect(screen.getByText('Label is required')).toBeInTheDocument();

  // Check if schema has been generated
  expect(screen.getByText('"type": "input"')).toBeInTheDocument();
});
