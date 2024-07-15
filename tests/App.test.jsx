import App from '/src/App.jsx'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react'
import mockShoppingData from './mocks/mock-data.json'
import 'vitest-fetch-mock';

const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}))
vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver)
describe('Given <App />', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('Should render correctly if the fetch request is successful ', async () => {
        fetch.mockResponse(JSON.stringify(mockShoppingData));
        const result = render(<App />);
        await waitFor(() => {
            expect(fetch).toBeCalled();
        });

        expect(result).toMatchSnapshot();
    });

    it('Should render a network error screen if the fetch request fails ', async () => {
        fetch.mockReject(new Error('fake error message'));
        const result = render(<App />);
        await waitFor(() => {
            expect(fetch).toBeCalled();
        });
        console.log(result);
        expect(result.getByRole('paragraph')).toHaveTextContent(/A network error was encountered/)
    });

    it('Should render a loading screen if the fetch request hasnt completed', async () => {
        fetch.mockResponse(JSON.stringify(mockShoppingData));
        const result = render(<App />);
        expect(result.getByRole('paragraph')).toHaveTextContent(/Loading.../)
    });
});