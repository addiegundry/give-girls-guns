'use client';

import { createContext, ReactNode, useContext } from 'react';

import { Stream, Streamable } from '@/vibes/soul/lib/streamable';

const CartCountContext = createContext<Streamable<number>>(0);

export function CartCountProvider({
  count,
  children,
}: {
  count: Streamable<number>;
  children: ReactNode;
}) {
  return <CartCountContext.Provider value={count}>{children}</CartCountContext.Provider>;
}

export function CartCountBadge() {
  const count = useContext(CartCountContext);

  return (
    <Stream fallback={null} value={count}>
      {(quantity) => (
        <span aria-live="polite" className="ggg-cart-count-status" id="ggg-cart-count">
          <span className="sr-only">
            {quantity} {quantity === 1 ? 'item' : 'items'} in your bag
          </span>
          {quantity > 0 && (
            <span aria-hidden="true" className="ggg-cart-count">
              {quantity}
            </span>
          )}
        </span>
      )}
    </Stream>
  );
}
