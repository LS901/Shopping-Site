import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../../src/ItemsContext.jsx';
import FeaturedSection from '../../src/components/FeaturedSection.jsx';

// Mock data for ItemsContext
const mockItems = [
    { uid: '1', name: 'Item 1', price: 100, rating: { rate: 4.5 } },
    { uid: '2', name: 'Item 2', price: 20, rating: { rate: 3.5 } },
    { uid: '3', name: 'Item 3', price: 50, rating: { rate: 4.0 } },
    { uid: '4', name: 'Item 4', price: 200, rating: { rate: 5.0 } },
];

// Mock Item component
vi.mock('../../src/components/Item.jsx', () => ({
    __esModule: true,
    default: ({ item, discount }) => (
        <div data-testid="item">
            {item.name} - ${item.price * discount}
        </div>
    ),
}));

// Mock ScrollButton component
vi.mock('../../src/components/ScrollButton.jsx', () => ({
    __esModule: true,
    default: ({ onClick, children }) => (
        <button data-testid="scroll-button" onClick={onClick}>{children}</button>
    ),
}));

describe('FeaturedSection Component', () => {
    let setCartCountMock;

    beforeEach(() => {
        setCartCountMock = vi.fn();
        render(
            <ItemsContext.Provider value={mockItems}>
                <FeaturedSection setCartCount={setCartCountMock} />
            </ItemsContext.Provider>
        );
    });

    it('renders featured items correctly', () => {
        const items = screen.getAllByTestId('item');
        expect(items).toHaveLength(3);
        expect(items[0]).toHaveTextContent('Item 1');
        expect(items[1]).toHaveTextContent('Item 2');
        expect(items[2]).toHaveTextContent('Item 3');
    });

    it('displays the correct discounted price', () => {
        const items = screen.getAllByTestId('item');
        expect(items[0]).toHaveTextContent('$90'); // 100 * 0.9
        expect(items[1]).toHaveTextContent('$18'); // 20 * 0.9
        expect(items[2]).toHaveTextContent('$45'); // 50 * 0.9
    });

    it('stops arrow animation on scroll button click', () => {
        const leftArrow = screen.getAllByAltText('down arrow')[0];
        const rightArrow = screen.getAllByAltText('down arrow')[1];

        expect(leftArrow.style.animation).not.toBe('none');
        expect(rightArrow.style.animation).not.toBe('none');

        fireEvent.click(screen.getByTestId('scroll-button'));

        expect(leftArrow.style.animation).toBe('none');
        expect(rightArrow.style.animation).toBe('none');
    });

    it('renders the promotional text correctly', () => {
        expect(screen.getByText('Our current best deals:')).toBeInTheDocument();
        expect(screen.getByText(/Click/i)).toBeInTheDocument();
        expect(screen.getByText(/and see our best deals right now!/i)).toBeInTheDocument();
    });
});