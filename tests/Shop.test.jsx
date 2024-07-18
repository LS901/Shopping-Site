import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsContext } from "../src/ItemsContext.jsx";
import Shop from '/src/pages/Shop.jsx'

// Mock data for ItemsContext
const mockItems = [
    { uid: '1', category: 'Electronics', title:'Electronic Item', price: 100, rating: { rate: 4.5 } },
    { uid: '2', category: 'Books', title:'Book Item', price: 20, rating: { rate: 3.5 } },
    { uid: '3', category: 'Clothing', title:'Clothing Item', price: 50, rating: { rate: 4.0 } },
    { uid: '4', category: 'Electronics', title:'Electronic Item', price: 200, rating: { rate: 5.0 } },
];

// Mock Item component
vi.mock('../src/components/Item.jsx', () => ({
    __esModule: true,
    default: ({ item }) => (
        <div data-testid="item">
            {item.category} - ${item.price} - {item.rating.rate} Stars
        </div>
    ),
}));

describe('Shop Component', () => {
    let setCartCountMock;

    beforeEach(() => {
        setCartCountMock = vi.fn();
        render(
            <ItemsContext.Provider value={mockItems}>
                <Shop setCartCount={setCartCountMock} />
            </ItemsContext.Provider>
        );
    });

    it('renders items correctly', () => {
        const items = screen.getAllByTestId('item');
        expect(items).toHaveLength(4);
    });

    it('filters items by category', () => {
        fireEvent.click(screen.getByTestId('Electronics'));
        const items = screen.getAllByTestId('item');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Electronics');
        expect(items[1]).toHaveTextContent('Electronics');
    });

    it('sorts items by least expensive', () => {
        fireEvent.click(screen.getByTestId('least expensive'));
        const items = screen.getAllByTestId('item');
        expect(items[0]).toHaveTextContent('Books - $20');
        expect(items[1]).toHaveTextContent('Clothing - $50');
        expect(items[2]).toHaveTextContent('Electronics - $100');
        expect(items[3]).toHaveTextContent('Electronics - $200');
    });

    it('sorts items by most expensive', () => {
        fireEvent.click(screen.getByTestId('most expensive'));
        const items = screen.getAllByTestId('item');
        expect(items[0]).toHaveTextContent('Electronics - $200');
        expect(items[1]).toHaveTextContent('Electronics - $100');
        expect(items[2]).toHaveTextContent('Clothing - $50');
        expect(items[3]).toHaveTextContent('Books - $20');
    });

    it('sorts items by highest rated', () => {
        fireEvent.click(screen.getByTestId('highest rated'));
        const items = screen.getAllByTestId('item');
        expect(items[0]).toHaveTextContent('Electronics - $200 - 5 Stars');
        expect(items[1]).toHaveTextContent('Electronics - $100 - 4.5 Stars');
        expect(items[2]).toHaveTextContent('Clothing - $50 - 4 Stars');
        expect(items[3]).toHaveTextContent('Books - $20 - 3.5 Stars');
    });

    it('resets the items', () => {
        fireEvent.click(screen.getByText('All'));
        const items = screen.getAllByTestId('item');
        expect(items).toHaveLength(4);
    });
});