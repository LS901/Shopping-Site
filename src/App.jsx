import { useEffect, useState, useReducer } from 'react';
import { ItemsContext } from './ItemsContext.jsx';
import Homepage from './pages/Homepage.jsx';
import NavBar from './components/NavBar.jsx';
import cartReducer from './helpers/cart-reducer.jsx';
import Shop from './pages/Shop.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Layout = ({ shoppingData, cartCount }) => (
    <div className='app-wrapper montserrat-font'>
        <NavBar cartCount={cartCount} />
        <ItemsContext.Provider value={shoppingData}>
            <Outlet />
        </ItemsContext.Provider>
    </div>
);

function App() {
    const [shoppingData, setShoppingData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(cartReducer, { cartCount: 0 });

    const changeCartCount = (action) => {
        dispatch({ type: action });
    };

    useEffect(() => {
        const fetchShoppingData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
                if (response.status >= 400) {
                    throw new Error('server error');
                }
                const data = await response.json();
                setShoppingData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShoppingData();
    }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout shoppingData={shoppingData} cartCount={state.cartCount} />,
            children: [
                { path: '/', element: <Homepage setCartCount={changeCartCount} /> },
                { path: 'shop', element: <Shop setCartCount={changeCartCount} /> },
            ],
        },
    ]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

    return <RouterProvider router={router} />;
}

export default App;