import * as enums from '../enums';

export type Method = 'subscribe' | 'subscriptions' | 'unsubscribe';

export enum AuthenticatedSubscriptionName {
  balances = 'balances',
  orders = 'orders',
}

export enum UnauthenticatedSubscriptionName {
  candles = 'candles',
  l1orderbook = 'l1orderbook',
  l2orderbook = 'l2orderbook',
  tickers = 'tickers',
  trades = 'trades',
}

export type SubscriptionName =
  | keyof typeof UnauthenticatedSubscriptionName
  | keyof typeof AuthenticatedSubscriptionName;

export interface BalancesSubscription {
  name: 'balances';
}

export interface OrdersSubscription {
  name: 'orders';
}

export interface CandlesSubscription {
  name: 'candles';
  markets?: string[];
  interval: keyof typeof enums.CandleInterval;
}

export interface L1OrderBookSubscription {
  name: 'l1orderbook';
  markets?: string[];
}

export interface L2OrderBookSubscription {
  name: 'l2orderbook';
  markets?: string[];
}

export interface TickersSubscription {
  name: 'tickers';
  markets?: string[];
}

export interface TradesSubscription {
  name: 'trades';
  markets?: string[];
}

export type AuthenticatedSubscription =
  | BalancesSubscription
  | OrdersSubscription;

export type InternalAuthenticatedSubscription =
  | (BalancesSubscription & { wallet: string })
  | (OrdersSubscription & { wallet: string });

export type UnauthenticatedSubscription =
  | CandlesSubscription
  | L1OrderBookSubscription
  | L2OrderBookSubscription
  | TickersSubscription
  | TradesSubscription;

/*
 * Internal subscription does include wallet for generation of authentication tokens.
 * Should be used only in combination with existing SDK subscription methods.
 */
export type InternalSubscription =
  | InternalAuthenticatedSubscription
  | UnauthenticatedSubscription;

export type Subscription =
  | AuthenticatedSubscription
  | UnauthenticatedSubscription;

export type SubscribeRequest = {
  method: 'subscribe';
  cid?: string;
  token?: string;
  markets?: string[];
  subscriptions: (Subscription | SubscriptionName)[];
};

export type UnsubscribeSubscription = Partial<Subscription>;

export interface UnsubscribeRequest {
  method: 'unsubscribe';
  cid?: string;
  markets?: string[];
  subscriptions?: (UnsubscribeSubscription | SubscriptionName)[];
}

export interface SubscriptionsRequest {
  method: 'subscriptions';
  cid?: string;
}

export type Request =
  | SubscribeRequest
  | SubscriptionsRequest
  | UnsubscribeRequest;
