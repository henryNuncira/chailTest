import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ONE,
  ADD_MANY,
  REMOVE_ONE,
  SET_DISCOUNT,
  EMPTY_CART,
  IS_LOADING_ADDRESS,
} from "../types";


const initialState = {
  isLoadingAddress: false,
  cart: [],
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (action?.payload?.product?.Price) {
        const productId =
          action.payload?.product?.ProductId ||
          action.payload?.product?.productId;
        if (
          state.cart.findIndex(product => product.ProductId === productId) !==
          -1
        ) {
          const cart = state.cart.reduce((cartAcc, product) => {
            if (product.ProductId === productId) {
              cartAcc.push({
                ...action.payload.product,
              });
            } else {
              cartAcc.push(product);
            }
            return cartAcc;
          }, []);
          return { ...state, cart };
        }
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload.product,
              Quantity: action.payload.qty,
            },
          ],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          product => product.ProductId !== action.payload.product.ProductId
        ),
      };

    case ADD_ONE:
      if (action?.payload?.product?.Price) {
        return {
          ...state,
          cart: state.cart.map(p => {
            if (p.ProductId === action.payload.product.ProductId) {
              const Quantity = p.Quantity + 1;
              const DiscountAmount =
                p.BasePrice - p.Price < 0
                  ? 0
                  : (p.BasePrice - p.Price);
              const DiscountPct =
                ((p.BasePrice - p.Price) * 100) / p.Price < 0
                  ? 0
                  : ((p.BasePrice - p.Price) * 100) / p.Price;
              return {
                ...p,
                Quantity: Quantity,
                Amount: p.Price * Quantity,
                Tax: p.Price * Quantity * p.TaxCategoryValue,
                AmountWithTax:
                  p.Price * Quantity + p.Price * Quantity * p.TaxCategoryValue,
                DiscountAmount: DiscountAmount,
                DiscountAmountLocal: DiscountAmount,
                DiscountPct: DiscountPct,
              };
            }
            return p;
          }),
        };
      }

    case ADD_MANY:
      return {
        ...state,
        cart: state.cart.map(p => {
          if (p.ProductId === action.payload.product.ProductId) {
            const Quantity = action.payload.numberOfProd;
            const DiscountAmount =
              p.BasePrice - p.Price < 0
                ? 0
                : (p.BasePrice - p.Price);
            const DiscountPct =
              ((p.BasePrice - p.Price) * 100) / p.Price < 0
                ? 0
                : ((p.BasePrice - p.Price) * 100) / p.Price;
            return {
              ...p,
              Quantity: Quantity,
              Amount: p.Price * Quantity,
              Tax: p.Price * Quantity * p.TaxCategoryValue,
              AmountWithTax:
                p.Price * Quantity + p.Price * Quantity * p.TaxCategoryValue,
              DiscountAmount: DiscountAmount,
              DiscountAmountLocal: DiscountAmount,
              DiscountPct: DiscountPct,
            };
          }
          return p;
        }),
      };

    case REMOVE_ONE:
      return {
        ...state,
        cart: state.cart
          .map(p => {
            if (p.ProductId === action.payload.product.ProductId) {
              const Quantity = p.Quantity - 1;
              const DiscountAmount =
                p.BasePrice - p.Price < 0
                  ? 0
                  : (p.BasePrice - p.Price);
              const DiscountPct =
                ((p.BasePrice - p.Price) * 100) / p.Price < 0
                  ? 0
                  : ((p.BasePrice - p.Price) * 100) / p.Price;
              const updatedProduct = {
                ...p,
                Quantity: Quantity,
                Amount: p.Price * Quantity,
                Tax: p.Price * Quantity * p.TaxCategoryValue,
                AmountWithTax:
                  p.Price * Quantity + p.Price * Quantity * p.TaxCategoryValue,
                DiscountAmount: DiscountAmount,
                DiscountAmountLocal: DiscountAmount,
                DiscountPct: DiscountPct,
              };
              if (updatedProduct.Quantity > 0) {
                return updatedProduct;
              }
              return null;
            }
            return p;
          })
          .filter(Boolean),
      };

    
    case EMPTY_CART:
      return { ...state, cart: [] };

    case IS_LOADING_ADDRESS:
      return { ...state, isLoadingAddress: action.payload.isLoadingAddress };
    case "IS_PRICE_CHANGED":
      let changeCart = [
        ...state.cart.slice(0, action.payload.index),
        {
          ...state.cart[action.payload.index],
          isPriceChanged: action.payload.value,
        },
        ...state.cart.slice(action.payload.index + 1),
      ];

      return {
        ...state,
        cart: [...changeCart],
      };
    default:
      return state;
  }
}
