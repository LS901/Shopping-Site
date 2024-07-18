import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RatingReview from '../../src/components/RatingReview.jsx';

describe('RatingReview Component', () => {
    const renderComponent = (rating) => render(<RatingReview rating={rating} />);

    it('renders all stars with gray color when rating is 0', () => {
        const { container } = renderComponent(0);
        const stars = container.querySelectorAll('.start');
        expect(stars).toHaveLength(5);
        stars.forEach(star => {
            expect(star).toHaveStyle('color: rgb(128, 128, 128)');
        });
    });

    it('renders the correct number of gold stars for a given rating', () => {
        const { container } = renderComponent(3);
        const stars = container.querySelectorAll('.start');
        expect(stars).toHaveLength(5);
        stars.forEach((star, index) => {
            if (index < 3) {
                expect(star).toHaveStyle('color: rgb(255, 215, 0)');
            } else {
                expect(star).toHaveStyle('color: rgb(128, 128, 128)');
            }
        });
    });

    it('renders all stars with gold color when rating is 5', () => {
        const { container } = renderComponent(5);
        const stars = container.querySelectorAll('.start');
        expect(stars).toHaveLength(5);
        stars.forEach(star => {
            expect(star).toHaveStyle('color: rgb(255, 215, 0)');
        });
    });

    it('renders stars with correct font size', () => {
        const { container } = renderComponent(3);
        const stars = container.querySelectorAll('.start');
        stars.forEach(star => {
            expect(star).toHaveStyle('fontSize: 15px');
        });
    });

    it('renders stars with correct cursor style', () => {
        const { container } = renderComponent(3);
        const stars = container.querySelectorAll('.start');
        stars.forEach(star => {
            expect(star).toHaveStyle('cursor: pointer');
        });
    });
});