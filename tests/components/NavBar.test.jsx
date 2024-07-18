import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../src/components/NavBar.jsx';
describe('NavBar Component', () => {
    const renderNavBar = (cartCount) => {
        render(
            <BrowserRouter>
                <NavBar cartCount={cartCount} />
            </BrowserRouter>
        );
    };

    it('renders NavBar correctly', () => {
        renderNavBar(3);
        expect(screen.getByText('Shopkeeper')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('navigates to home when logo is clicked', () => {
        renderNavBar(3);
        const homeLink = screen.getByAltText('company logo');
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('navigates to shop when shop link is clicked', () => {
        renderNavBar(3);
        const shopLink = screen.getByText('Shop');
        expect(shopLink.closest('a')).toHaveAttribute('href', '/shop');
    });

    it('shows the correct cart count', () => {
        renderNavBar(5);
        expect(screen.getByText('5')).toBeInTheDocument();
    });
});