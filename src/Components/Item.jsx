import TrashCan from '../assets/Trash-Can.svg?react';

function Item({ id, title, option, price, quantity, image, onChange }, ...props) {
  const handleIncrement = () => {
    onChange(id, 'increment');
  };

  const handleDecrement = () => {
    onChange(id, 'decrement');
  };

  const handleDelete = () => {
    onChange(id, 'delete');
  };

  return (
    <div
      id={id}
      role='group'
      aria-label='Cart item: Italy Pizza'
      className='w-[608px] h-[100px] rounded-[15px] inline-flex pt-[9px] px-[10px] pb-[8.71px] shadow-[0_1px_4px_rgba(0,0,0,0.3)] bg-white relative'
      {...props}
    >
      <img
        src={image}
        alt='Italy Pizza with extra cheese and topping'
        width='80'
        height='82.29'
        loading='lazy'
        className='rounded-[8px] object-cover'
      />

      <div className='ps-[18px] py-[16px] text-[#1E1E1E]'>
        <h2 className='w-[190px] h-[27px] text-lg'>{title}</h2>
        <p className='text-sm font-[Nunito] w-[164px] h-[19px]'>{option}</p>
      </div>

      <div
        className='ms-[90px] text-[#393939] inline-flex justify-center items-center my-10'
        aria-label='Item quantity and price'
      >
        <span className='text-2xl font-[Raleway] font-semibold mb-2' aria-label='Quantity'>
          {quantity}
        </span>

        <div className='flex flex-col items-center ml-1'>
          <button
            className='w-[20px] leading-none'
            aria-label='Increase quantity'
            onClick={handleIncrement}
          >
            ▲
          </button>
          <button
            className='w-[20px] leading-none'
            aria-label='Decrease quantity'
            onClick={handleDecrement}
          >
            ▼
          </button>
        </div>

        <span
          className='ms-11 text-sm text-right font-[500] text-[#393939] w-[60px] h-[21px]'
          aria-label='Price'
        >
          $ {price}
        </span>

        <button
          aria-label='Remove Italy Pizza from cart'
          className='ms-[39px] h-[25px] w-[25px]'
          onClick={handleDelete}
        >
          <TrashCan aria-hidden='true' focusable='false' />
        </button>
      </div>
    </div>
  );
}

export default Item;
