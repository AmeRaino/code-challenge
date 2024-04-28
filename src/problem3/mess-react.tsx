import { BLOCKCHAIN_TYPE, PRIORITY_DEFAULT } from "./constant";
import Rows from "./rows";
import { WalletBalance } from "./type";

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    const priority = BLOCKCHAIN_TYPE[blockchain];

    if (!priority) return PRIORITY_DEFAULT;
    return priority;

    //Instead of using a switch case, I made a trade-off, shifting the focus from computational cost to memory cost
    //in order to enhance the readability of the function.
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);

        // using guard clauses to prevent nested if statements.
        if (balancePriority <= PRIORITY_DEFAULT) return false;

        if (balance.amount <= 0) return true;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // simplify sorting
        return rightPriority - leftPriority;
      });

    //Since I don't know what's inside the useWalletBalances and usePrices hooks, if they return an array as a state from useState,
    //then the dependency below is fine and won't be triggered every time the component rerenders.
    // However, if they don't for some reason, before exporting the value from the hook, I would create a unique ID from these arrays.
    // For example, { id: uuid(), data }, and use the ID instead of reference for the dependency.
  }, [balances, prices]);

  return (
    <div {...rest}>
      <Rows sortedBalances={sortedBalances} />
    </div>
  );
};
