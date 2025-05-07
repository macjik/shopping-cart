import BackArrowIcon from "../assets/backArrow.svg?react";
import CheckoutCard from "./CheckoutCard";
import Item from "./Item";

function Cart() {
  return (
    <main
      className="bg-white w-[1133px] h-[744px] py-12.5 px-7.5 rounded-[15px] flex"
      role="main"
      aria-label="Shopping cart page"
    >
      <div className="flex-1">
        <section
          className="w-full inline-flex h-max-h justify-start items-center"
          aria-label="Back to shopping"
        >
          <button
            aria-label="Go back to shopping"
            className="flex items-center"
          >
            <BackArrowIcon
              className="w-[30px] h-[30px] text-gray-500"
              aria-hidden="true"
              focusable="false"
            />
          </button>
          <h1
            className="w-[190px] h-[27px] font-[600] text-[#1E1E1E] text-lg tracking-normal font-[Poppins]"
            aria-level={1}
          >
            Shopping Continue
          </h1>
        </section>

        <div className="pt-[15px] px-[15px]">
          <hr
            className="w-[608px] h-[1.5px] border-[#D0CFCF] bg-[#D0CFCF]"
            aria-hidden="true"
          />

          <section
            className="mt-[24px]"
            aria-labelledby="shopping-cart-heading"
          >
            <h2
              id="shopping-cart-heading"
              className="w-[190px] h-[27px] font-[500] text-[#1E1E1E] text-lg tracking-normal"
            >
              Shopping Cart
            </h2>
            <p className="w-[215px] h-[19px] font-[500] text-sm mt-[8px] font-[Nunito]">
              You have 3 items in your cart
            </p>
          </section>

          <section className="mt-[29px]" aria-label="Cart item list">
            <Item />
          </section>
        </div>
      </div>

      <aside className="ml-[auto]" aria-label="Checkout details">
        <CheckoutCard />
      </aside>
    </main>
  );
}

export default Cart;
