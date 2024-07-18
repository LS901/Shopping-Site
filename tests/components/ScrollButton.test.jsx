import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollButton from '../../src/components/ScrollButton.jsx';

describe('ScrollButton Component', () => {
    it('renders with given children and className', () => {
        render(<ScrollButton className="test-class">Click Me</ScrollButton>);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('test-class');
    });

    it('calls onClick prop and scrolls to bottom on click', () => {
        const onClickMock = vi.fn();
        render(<ScrollButton className="test-class" onClick={onClickMock}>Click Me</ScrollButton>);

        const button = screen.getByRole('button', { name: /click me/i });

        // Mock scrollTo function
        window.scrollTo = vi.fn();

        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalled();
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });

    it('scrolls to bottom on click without onClick prop', () => {
        render(<ScrollButton className="test-class">Click Me</ScrollButton>);

        const button = screen.getByRole('button', { name: /click me/i });

        // Mock scrollTo function
        window.scrollTo = vi.fn();

        fireEvent.click(button);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});