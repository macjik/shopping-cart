import { useEffect, useState } from 'react';
import { calculateCartSummary } from '../../db'; // make sure path is correct
import MasterCardLogo from '../assets/master-card.svg?react';
import VisaCardLogo from '../assets/visa-card.svg?react';
import RuPayLogo from '../assets/ru-pay.svg?react';
import Input from './Input';
import Arrow from '../assets/arrow.svg?react';

const creditCardLogos = [MasterCardLogo, VisaCardLogo, RuPayLogo];
const inputs = [
  { label: 'Name on card', placeholder: 'Name', id: 'name' },
  {
    label: 'Card Number',
    placeholder: '1111 2222 3333 4444',
    type: 'tel',
    id: 'card',
  },
  [
    {
      label: 'Expiration date',
      placeholder: 'mm/yy',
      type: 'tel',
      id: 'exp-date',
      style: { width: '171px', height: '40px' },
    },
    {
      label: 'CVV',
      placeholder: '123',
      type: 'tel',
      id: 'cvv',
      style: { width: '171px', height: '40px' },
    },
  ],
];

function CheckoutCard({ items }) {
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 0,
    total: 0,
    totalWithTax: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await calculateCartSummary();
      setSummary(result);
    };

    fetchSummary();
  }, [items]);

  const { subtotal, shipping, totalWithTax } = summary;

  return (
    <form
      aria-labelledby='checkout-title'
      className='w-[388px] h-[644px] rounded-[20px] bg-[#565ABB] px-[19px] pb-[21px] pt-[27px] flex'
    >
      <div className='w-full'>
        {/* HEADER */}
        <div className='inline-flex items-center justify-between'>
          <h1
            id='checkout-title'
            className='w-[150px] h-[33px] text-[22px] text-[#FEFCFC] font-medium'
          >
            Card Details
          </h1>
          <img
            src='/avatar.webp'
            alt='Your profile avatar'
            width={100}
            height={100}
            className='rounded-[8px] ms-[150px] w-[50px] h-[50px] object-cover'
            loading='lazy'
          />
        </div>

        {/* CARD TYPE */}
        <p
          className='font-[Nunito] w-[94px] h-[22px] font-[500] text-[16px] text-[#FEFCFC] mt-[15px]'
          id='card-type-label'
        >
          Card type
        </p>
        <div
          className='inline-flex gap-[17px] mt-[14px]'
          role='group'
          aria-labelledby='card-type-label'
        >
          {creditCardLogos.map((Logo, index) => (
            <div
              key={index}
              className='w-[75px] h-[55px] bg-[#D9D9D933] bg-opacity-20 rounded-[5px] flex justify-center items-center'
              role='img'
              aria-label={`Card type ${index + 1}`}
            >
              <Logo aria-hidden='true' focusable='false' />
            </div>
          ))}
          <button
            className='text-white w-[75px] h-[55px] bg-[#D9D9D933] bg-opacity-20 rounded-[5px] text-center flex justify-center items-center'
            role='button'
            tabIndex={0}
            aria-label='See all card types'
            onClick={(e) => e.preventDefault()}
          >
            See all
          </button>
        </div>

        {/* FORM FIELDS */}
        <section
          className='mt-[27px] space-y-[14px] gap-2 font-medium'
          aria-label='Card information form fields'
        >
          {inputs.map((input, index) => {
            if (Array.isArray(input)) {
              return (
                <div key={index + 1} className='flex gap-[8px]'>
                  {input.map(({ label, placeholder, type, id, style }) => (
                    <Input
                      key={id}
                      label={label}
                      placeholder={placeholder}
                      type={type || 'text'}
                      id={id}
                      name={id}
                      style={style}
                    />
                  ))}
                </div>
              );
            }
            const { label, placeholder, type, id, style } = input;
            return (
              <Input
                key={id}
                label={label}
                placeholder={placeholder}
                type={type || 'text'}
                id={id}
                name={id}
                style={style}
              />
            );
          })}
        </section>

        {/* PRICE SUMMARY */}
        <div className='bg-[#5F65C3] w-[350px] h-[1px] mt-[22.46px]'></div>
        <section className='mt-[14.54px] w-full space-y-[6px] text-[#FEFCFC] font-medium'>
          {[
            { label: 'Subtotal', value: `$ ${subtotal.toLocaleString()}` },
            { label: 'Shipping', value: `$ ${shipping.toLocaleString()}` },
            { label: 'Total (tax incl).', value: `$ ${totalWithTax.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className='flex justify-between text-[14px]'>
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </section>

        {/* SUBMIT */}
        <button
          type='submit'
          className='bg-[#4DE1C1] text-[#FEFCFC] flex items-center justify-between mt-[20px] px-[24px] py-[18px] w-[350px] h-[60px] rounded-[12px] text-[16px] font-medium'
        >
          <span>$ {totalWithTax.toLocaleString()}</span>
          <span className='flex items-center gap-2'>
            Checkout
            <Arrow className='w-[25px] h-[25px]' />
          </span>
        </button>
      </div>
    </form>
  );
}

export default CheckoutCard;
