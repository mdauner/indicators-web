import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Editor from '../Editor';
import { mockDataSet } from './mocks';

describe('Editor', () => {
  test('returns null when no cell is selected', async () => {
    const { container } = render(
      <Editor onChange={() => true} onSave={() => true} />
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders component', async () => {
    const selectedYear = '1961';
    const { container } = render(
      <Editor
        selectedDataSet={mockDataSet}
        selectedYear={selectedYear}
        value="125.2"
        onChange={() => true}
        onSave={() => true}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onChange callback when input text is changed', async () => {
    const selectedYear = '1961';
    const newValue = '111';
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Editor
        selectedDataSet={mockDataSet}
        selectedYear={selectedYear}
        value="125.2"
        onChange={onChange}
        onSave={() => true}
      />
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  test('calls onSave callback when save button is clicked', async () => {
    const selectedYear = '1961';
    const onSave = jest.fn();

    const { getByText } = render(
      <Editor
        selectedDataSet={mockDataSet}
        selectedYear={selectedYear}
        value="123.1"
        onChange={() => true}
        onSave={onSave}
      />
    );
    const saveButton = getByText('Save');

    expect(saveButton).not.toBeDisabled();

    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalled();
  });

  test('disables save button when value is invalid', async () => {
    const selectedYear = '1961';
    const onSave = jest.fn();

    const { getByText } = render(
      <Editor
        selectedDataSet={mockDataSet}
        selectedYear={selectedYear}
        value="invalid_value"
        onChange={() => true}
        onSave={onSave}
      />
    );
    const saveButton = getByText('Save');

    expect(saveButton).toBeDisabled();
  });
});
