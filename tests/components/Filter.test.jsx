import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../../src/ItemsContext.jsx';
import Filter from '../../src/components/Filter.jsx';

const mockItems = [
    { uid: '1', category: 'electronics', price: 100, rating: { rate: 4.5 } },
    { uid: '2', category: 'books', price: 20, rating: { rate: 3.5 } },
    { uid: '3', category: 'clothing', price: 50, rating: { rate: 4.0 } },
    { uid: '4', category: 'electronics', price: 200, rating: { rate: 5.0 } },
];

describe('Filter Component', () => {
    let updateItemsMock;

    beforeEach(() => {
        updateItemsMock = vi.fn();
        render(
            <ItemsContext.Provider value={mockItems}>
                <Filter updateItems={updateItemsMock} />
            </ItemsContext.Provider>
        );
    });

    it('renders category options correctly', () => {
        expect(screen.getByTestId('all')).toBeInTheDocument();
        expect(screen.getByTestId('electronics')).toBeInTheDocument();
        expect(screen.getByTestId('books')).toBeInTheDocument();
        expect(screen.getByTestId('clothing')).toBeInTheDocument();
    });

    it('renders filter options correctly', () => {
        expect(screen.getByTestId('none')).toBeInTheDocument();
        expect(screen.getByTestId('least expensive')).toBeInTheDocument();
        expect(screen.getByTestId('most expensive')).toBeInTheDocument();
        expect(screen.getByTestId('highest rated')).toBeInTheDocument();
    });

    it('updates selected category', () => {
        fireEvent.click(screen.getByTestId('electronics'));
        expect(updateItemsMock).toHaveBeenCalledWith('electronics', 'None');
    });

    it('updates selected filter', () => {
        fireEvent.click(screen.getByTestId('least expensive'));
        expect(updateItemsMock).toHaveBeenCalledWith('All', 'Least Expensive');
    });

    it('updates both category and filter', () => {
        fireEvent.click(screen.getByTestId('clothing'));
        fireEvent.click(screen.getByTestId('highest rated'));
        expect(updateItemsMock).toHaveBeenCalledWith('clothing', 'Highest Rated');
    });
});