import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve("Hello from backend!"),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

test('wyświetla nagłówek aplikacji', () => {
  render(<App />);
  expect(screen.getByText(/Frontend App/i)).toBeInTheDocument();
});

test('po kliknięciu przycisku pobierana jest wiadomość', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Pobierz wiadomość/i));
  await waitFor(() => {
    expect(screen.getByText("Hello from backend!")).toBeInTheDocument();
  });
});
