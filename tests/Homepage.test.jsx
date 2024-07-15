import Homepage from '/src/pages/Homepage.jsx'
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react'
import { ItemsContext } from "../src/ItemsContext.jsx";
import mockShoppingData from './mocks/mock-data.json'

vi.mock('react-router-dom');
const renderComponent = () => {
    render(
        <ItemsContext.Provider value={mockShoppingData}>
            <Homepage setCartCount={vi.fn()}/>
        </ItemsContext.Provider>
    )
}
describe('Given <Homepage />', () => {
    it('Should render correctly  ', () => {
        renderComponent();
        expect(screen).toMatchSnapshot();
    });
});