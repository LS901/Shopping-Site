function cartReducer(state, action) {
    if (action.type === 'increment_cart') {
        return {
            cartCount: state.cartCount + 1
        }
    } else if (action.type === 'decrement_cart') {
        return {
            cartCount: state.cartCount - 1
        }
    }
    throw Error('Unknown action. ');
}

export default cartReducer;