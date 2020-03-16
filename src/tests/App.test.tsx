import React from 'react';
import {
  render,
  act,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react';
import axios from 'axios';

import App, { INDICATOR_CHOICES } from '../App';
import { mockDataSet } from './mocks';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.get.mockResolvedValueOnce({ data: [mockDataSet] });
  });

  test('renders loading text initially', async () => {
    await act(async () => {
      const { queryByText } = render(<App />);
      expect(queryByText(/loading/i)).toBeTruthy();
    });
  });

  test('renders data', async () => {
    await act(async () => {
      const { container, queryByText } = render(<App />);
      await waitForElementToBeRemoved(() => queryByText(/loading/i));

      expect(container.firstChild).toMatchSnapshot();
    });
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  test('loads new data when indicator was selected', async () => {
    let indicatorSelect: HTMLElement;
    await act(async () => {
      const { getByLabelText, queryByText } = render(<App />);
      await waitForElementToBeRemoved(() => queryByText(/loading/i));

      indicatorSelect = getByLabelText(/indicator/i);
    });
    await act(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [mockDataSet] });

      fireEvent.change(indicatorSelect, {
        target: { value: INDICATOR_CHOICES[2].id }
      });
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(INDICATOR_CHOICES[2].id)
    );
  });

  test('shows editor when cell is selected', async () => {
    await act(async () => {
      const { queryByTestId, getByText, queryByText } = render(<App />);
      await waitForElementToBeRemoved(() => queryByText(/loading/i));

      expect(queryByTestId('editor')).not.toBeInTheDocument();

      const cell = getByText(mockDataSet.data['1960']);
      fireEvent.click(cell);

      expect(queryByTestId('editor')).toBeInTheDocument();
    });
  });

  test('sorts table when header is clicked', async () => {
    await act(async () => {
      const { container, getByText, queryByText } = render(<App />);
      await waitForElementToBeRemoved(() => queryByText(/loading/i));

      const header = getByText('1960');
      fireEvent.click(header);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
