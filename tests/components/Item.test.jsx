import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../../src/components/Item.jsx';

// Mock data for item
const mockItem = {
    uid: '1',
    image: 'https://example.com/item.jpg',
    title: 'Sample Item',
    price: 100,
    rating: {
        rate: 4.5,
        count: 10
    }
};

// Mock RatingReview component
vi.mock('../../src/components/RatingReview.jsx', () => ({
    __esModule: true,
    default: ({ rating }) => <div data-testid="rating-review">{rating} Stars</div>
}));

describe('Item Component', () => {
    let setCartCountMock;

    beforeEach(() => {
        setCartCountMock = vi.fn();
    });

    it('renders item details correctly', () => {
        render(<Item item={mockItem} setCartCount={setCartCountMock} />);

        expect(screen.getByAltText('item image')).toHaveAttribute('src', 'https://example.com/item.jpg');
        expect(screen.getByText('Sample Item')).toBeInTheDocument();
        expect(screen.getByText('£100')).toBeInTheDocument();
        expect(screen.getByTestId('rating-review')).toHaveTextContent('4.5 Stars');
        expect(screen.getByText('(10)')).toBeInTheDocument();
    });

    it('renders item price with discount correctly', () => {
        render(<Item item={mockItem} setCartCount={setCartCountMock} discount={0.8} />);

        expect(screen.getByText('£100')).toHaveClass('line-through text-red-500');
        expect(screen.getByText('£80.00')).toBeInTheDocument();
    });

    it('calls setCartCount on Add To Cart button click', () => {
        render(<Item item={mockItem} setCartCount={setCartCountMock} />);

        fireEvent.click(screen.getByText('Add To Cart'));
        expect(setCartCountMock).toHaveBeenCalledWith('increment_cart');
    });

    it('handles missing discount correctly', () => {
        render(<Item item={mockItem} setCartCount={setCartCountMock} />);

        expect(screen.queryByText('line-through')).not.toBeInTheDocument();
        expect(screen.getByText('£100')).toBeInTheDocument();
    });
});