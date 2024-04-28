export interface WalletBalance {
  currency: string;
  amount: number;

  // In the filter balance method, I noticed that you use a blockchain property
  // which was not included in the defined interface, so I go ahead and add it, assuming it is a string.
  blockchain: string;
}

export interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

export interface Price {}
