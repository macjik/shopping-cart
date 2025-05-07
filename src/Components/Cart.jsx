import { useEffect, useState } from 'react';
import BackArrowIcon from '../assets/backArrow.svg?react';
import CheckoutCard from './CheckoutCard';
import Item from './Item';
import { getAllItems, updateQuantity, deleteItem } from '../../db';
import SeedButton from './SeedItems';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchItems = async () => {
    try {
      const items = await getAllItems();
      setCartItems(items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemChange = async (id, action) => {
    if (action === 'delete') {
      try {
        await deleteItem(id);

        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error deleting item from DB:', error);
      }
      return;
    }

    try {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          if (item.id === id) {
            const updatedQuantity =
              action === 'increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 1);

            await updateQuantity(id, updatedQuantity);

            return { ...item, quantity: updatedQuantity, price: item.unitPrice * updatedQuantity };
          }
          return item;
        })
      );

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating item quantity or database:', error);
    }
  };

  return (
    <main
      className='bg-white w-[1133px] h-[744px] py-12.5 px-7.5 rounded-[15px] flex'
      role='main'
      aria-label='Shopping cart page'
    >
      <div className='flex-1'>
        <section
          className='w-full inline-flex h-max-h justify-start items-center'
          aria-label='Back to shopping'
        >
          <button aria-label='Go back to shopping' className='flex items-center'>
            <BackArrowIcon
              className='w-[30px] h-[30px] text-gray-500'
              aria-hidden='true'
              focusable='false'
            />
          </button>
          <h1
            className='w-[190px] h-[27px] font-[600] text-[#1E1E1E] text-lg tracking-normal font-[Poppins]'
            aria-level={1}
          >
            Shopping Continue
          </h1>
        </section>

        <div className='pt-[15px] px-[15px]'>
          <hr className='w-[608px] h-[1.5px] border-[#D0CFCF] bg-[#D0CFCF]' aria-hidden='true' />

          <section className='mt-[24px]' aria-labelledby='shopping-cart-heading text-[#1E1E1E]'>
            <h2
              id='shopping-cart-heading'
              className='w-[190px] h-[27px] text-[18px] tracking-normal'
            >
              Shopping cart
            </h2>
            <p className='w-[215px] h-[19px] font-[500] text-[14px] font-[Nunito]'>
              You have {cartItems.length} items in your cart
            </p>
          </section>

          <section className='mt-[29px] space-y-[24px]' aria-label='Cart item list'>
            {cartItems.length ? (
              cartItems.map(({ id, title, option, price, quantity, image }) => (
                <Item
                  key={`${id}-${title}`}
                  id={id}
                  title={title}
                  option={option}
                  price={price}
                  quantity={quantity}
                  image={image}
                  onChange={handleItemChange}
                />
              ))
            ) : (
              <h1>No items available</h1>
            )}
            <SeedButton onRefresh={fetchItems} />
          </section>
        </div>
      </div>
      <aside className='ml-[auto]' aria-label='Checkout details'>
        <CheckoutCard items={cartItems}/>
      </aside>
    </main>
  );
}

export default Cart;
