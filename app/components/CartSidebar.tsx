"use client";
import {
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartSidebar = () => {
  const {
    isCartOpen,
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    setIsCartOpen,
  } = useCart();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";
  const router = useRouter();
  if (!isCartOpen) return null;
  const deliveryFee = cartTotal > 20 ? 0 : 1.99;
  const grandTotal = deliveryFee + cartTotal;
  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-50 translation-opacity"
      />
      <div className="fixed right-0 top-0 h-full max-w-md w-full bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-app-border">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5" />
            <h2 className="text-lg font-medium">Your Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold bg-app bg-app-cream rounded-full">
              {items.length} items
            </span>
          </div>
          <Button
            onClick={() => setIsCartOpen(false)}
            isIconOnly
            className="p-2 rounded-xl bg-inherit hover:bg-app-cream transition-colors text-black"
          >
            <XIcon className="size-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="size-16 text-app-border mb-4" />
              <h4 className="text-lg font-medium mb-1">Your cart is empty</h4>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 bg-app-cream/60 rounded-xl p-3"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  objectFit="cover"
                  className="size-16 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-app-text-light">
                    {currency} {item.product.price} / {item.product.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <Button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        isIconOnly
                        className="bg-white text-black size-7 rounded-lg border border-app-border flex-center"
                      >
                        <MinusIcon className="size-3" />
                      </Button>
                      <span className="text-sm font-semibold w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        isIconOnly
                        className="bg-white size-7 rounded-lg text-black border border-app-border flex-center"
                      >
                        <PlusIcon className="size-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {currency}{" "}
                        {(item.product.price * item.quantity).toFixed(1)}
                      </span>
                      <Button
                        onClick={() => removeFromCart(item.product.id)}
                        isIconOnly
                        className="p-1 text-app-text-light bg-inherit hover:text-app-error translation-colors"
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-5 border-app-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-app-light">Subtotal</span>
              <span className="font-medium">
                {currency}
                {cartTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-app-light">Delivery</span>
              <span className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-app-success">Free</span>
                ) : (
                  <span>{`${currency} ${deliveryFee.toFixed(2)}`}</span>
                )}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-app-text-light text-center">
                Free delivery on orders ove {currency}20!
              </p>
            )}
            <div className="flex justify-between text-base font-semibold border-t border-app-border pt-3">
              <span>Total</span>
              <span>
                {currency}
                {grandTotal.toFixed(1)}
              </span>
            </div>
            <Button
              onClick={() => {
                setIsCartOpen(false);
                router.push("/checkout");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-app-orange text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-colors flex-center gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
