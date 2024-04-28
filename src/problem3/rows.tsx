import { Price, WalletBalance } from "./type";
import React from "react";

/*
I think there's a typo; it should be `formattedBalances.map` instead of `sortedBalances.map` in your code snippet.
But I would remove the unnecessary map of formattedBalances and simply map sortedBalances directly.
Within the loop, I can format the amount value anyway.

 Also, I moved the row component outside of the WalletPage component (can create separate component) to make it easier to maintain
 and to avoid any issues with the lifecycle of the row component when nested inside another component.
*/
const Rows = ({
  sortedBalances,
  prices,
}: {
  sortedBalances: WalletBalance[];
  prices: Price[];
}) => {
  return (
    <>
      {sortedBalances.map(({ balance, index }) => {
        const { amount } = balance;

        const usdValue = prices?.[balance.currency] * amount;
        const formattedAmount =
          typeof amount !== "number"
            ? parseFloat(amount).toFixed()
            : amount.toFixed();

        return (
          <WalletRow
            className={classes.row}
            key={index}
            amount={amount}
            usdValue={usdValue}
            formattedAmount={formattedAmount}
          />
        );
      })}
    </>
  );
};

export default Rows;

/*
The removed mapping sortedBalances to format amount like this as I mentioned above, but if I have to keep it this is how I would do
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //The balance value from the map is already a new reference, so there's no need to use the spread operator here.
  //This prevents memory leaks that can occur when using the spread operator in a loop.
  // Additionally, if the backend returns a value that is not a number type, then toFixed will crash. So, it's better to check it in advance.

  let amount = balance.amount;
  if (typeof amount !== "number") amount = parseFloat(amount);
  balance["formatted"] = amount.toFixed();

  return balance;
});
*/
