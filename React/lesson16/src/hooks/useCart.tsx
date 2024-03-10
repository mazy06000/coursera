import { useContext } from 'react';
import CartContext from '../context/CartProvider';
import { UseCartContextType } from '../context/CartProvider';

const useCart = (): UseCartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default useCart;