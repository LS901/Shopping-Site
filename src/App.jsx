import { useEffect, useState, useReducer } from 'react'
import { ItemsContext } from "./ItemsContext.jsx";
import './App.css'
import Homepage from "./pages/Homepage.jsx";
import NavBar from "./components/NavBar.jsx";
import cartReducer from "./helpers/cart-reducer.jsx";
import Shop from "./pages/Shop.jsx";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Layout = ({shoppingData, cartCount}) => {
    return (
        <div className='app-wrapper montserrat-font'>
            <NavBar cartCount={cartCount}/>
            <ItemsContext.Provider value={shoppingData}>
                <Outlet />
            </ItemsContext.Provider>
        </div>
    )
}
function App() {
    const [shoppingData, setShoppingData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [state,dispatch] = useReducer(cartReducer, { cartCount: 0 }, undefined)
    const changeCartCount = (action) => {
        dispatch({ type: action })
    }

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", { mode: "cors" })
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            })
            .then((response) => setShoppingData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout shoppingData={shoppingData} cartCount={state.cartCount} />,
            children: [
                { path: '/', element: <Homepage setCartCount={changeCartCount}/>,  },
                { path: 'shop', element: <Shop setCartCount={changeCartCount} /> }
            ]
        }
    ])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;

  return (
    <RouterProvider router={router} />
  )
}

export default App
