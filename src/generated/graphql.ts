import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cart = {
  __typename?: 'Cart';
  products: PagedCartProducts;
  total: Scalars['Float'];
};

export type CartProduct = {
  __typename?: 'CartProduct';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  total: Scalars['Int'];
};

export type PagedCartProducts = Pagination & {
  __typename?: 'PagedCartProducts';
  page: Scalars['Int'];
  results: Array<CartProduct>;
  size: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type PagedProducts = Pagination & {
  __typename?: 'PagedProducts';
  page: Scalars['Int'];
  results: Array<ProductUnion>;
  size: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type Pagination = {
  page: Scalars['Int'];
  size: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
};

export type PaginationParams = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};

export type Product = {
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  price: Scalars['Float'];
  rating: Rating;
  title: Scalars['String'];
};

export type ProductInStock = Product & {
  __typename?: 'ProductInStock';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  limited: Scalars['Boolean'];
  price: Scalars['Float'];
  quantity: Quantity;
  rating: Rating;
  title: Scalars['String'];
};

export type ProductOutOfStock = Product & {
  __typename?: 'ProductOutOfStock';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  price: Scalars['Float'];
  rating: Rating;
  title: Scalars['String'];
};

export type ProductReplaced = Product & {
  __typename?: 'ProductReplaced';
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  price: Scalars['Float'];
  rating: Rating;
  replacement: ProductInStock;
  title: Scalars['String'];
};

export type ProductUnion = ProductInStock | ProductOutOfStock | ProductReplaced;

export type Quantity = {
  __typename?: 'Quantity';
  max: Scalars['Int'];
  min: Scalars['Int'];
  step: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  cart: Cart;
  products: PagedProducts;
};


export type QueryCartArgs = {
  pagination?: InputMaybe<PaginationParams>;
};


export type QueryProductsArgs = {
  pagination: PaginationParams;
};

export type Rating = {
  __typename?: 'Rating';
  count: Scalars['Int'];
  rate: Scalars['Float'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cart: ResolverTypeWrapper<Cart>;
  CartProduct: ResolverTypeWrapper<CartProduct>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PagedCartProducts: ResolverTypeWrapper<PagedCartProducts>;
  PagedProducts: ResolverTypeWrapper<Omit<PagedProducts, 'results'> & { results: Array<ResolversTypes['ProductUnion']> }>;
  Pagination: ResolversTypes['PagedCartProducts'] | ResolversTypes['PagedProducts'];
  PaginationParams: PaginationParams;
  Product: ResolversTypes['ProductInStock'] | ResolversTypes['ProductOutOfStock'] | ResolversTypes['ProductReplaced'];
  ProductInStock: ResolverTypeWrapper<ProductInStock>;
  ProductOutOfStock: ResolverTypeWrapper<ProductOutOfStock>;
  ProductReplaced: ResolverTypeWrapper<ProductReplaced>;
  ProductUnion: ResolversTypes['ProductInStock'] | ResolversTypes['ProductOutOfStock'] | ResolversTypes['ProductReplaced'];
  Quantity: ResolverTypeWrapper<Quantity>;
  Query: ResolverTypeWrapper<{}>;
  Rating: ResolverTypeWrapper<Rating>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Cart: Cart;
  CartProduct: CartProduct;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  PagedCartProducts: PagedCartProducts;
  PagedProducts: Omit<PagedProducts, 'results'> & { results: Array<ResolversParentTypes['ProductUnion']> };
  Pagination: ResolversParentTypes['PagedCartProducts'] | ResolversParentTypes['PagedProducts'];
  PaginationParams: PaginationParams;
  Product: ResolversParentTypes['ProductInStock'] | ResolversParentTypes['ProductOutOfStock'] | ResolversParentTypes['ProductReplaced'];
  ProductInStock: ProductInStock;
  ProductOutOfStock: ProductOutOfStock;
  ProductReplaced: ProductReplaced;
  ProductUnion: ResolversParentTypes['ProductInStock'] | ResolversParentTypes['ProductOutOfStock'] | ResolversParentTypes['ProductReplaced'];
  Quantity: Quantity;
  Query: {};
  Rating: Rating;
  String: Scalars['String'];
};

export type CartResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  products?: Resolver<ResolversTypes['PagedCartProducts'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CartProduct'] = ResolversParentTypes['CartProduct']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagedCartProductsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PagedCartProducts'] = ResolversParentTypes['PagedCartProducts']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['CartProduct']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagedProductsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PagedProducts'] = ResolversParentTypes['PagedProducts']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['ProductUnion']>, ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = {
  __resolveType: TypeResolveFn<'PagedCartProducts' | 'PagedProducts', ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalResults?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  __resolveType: TypeResolveFn<'ProductInStock' | 'ProductOutOfStock' | 'ProductReplaced', ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ProductInStockResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductInStock'] = ResolversParentTypes['ProductInStock']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  limited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Quantity'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductOutOfStockResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductOutOfStock'] = ResolversParentTypes['ProductOutOfStock']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductReplacedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductReplaced'] = ResolversParentTypes['ProductReplaced']> = {
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  replacement?: Resolver<ResolversTypes['ProductInStock'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductUnionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ProductUnion'] = ResolversParentTypes['ProductUnion']> = {
  __resolveType: TypeResolveFn<'ProductInStock' | 'ProductOutOfStock' | 'ProductReplaced', ParentType, ContextType>;
};

export type QuantityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Quantity'] = ResolversParentTypes['Quantity']> = {
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  step?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType, Partial<QueryCartArgs>>;
  products?: Resolver<ResolversTypes['PagedProducts'], ParentType, ContextType, RequireFields<QueryProductsArgs, 'pagination'>>;
};

export type RatingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Rating'] = ResolversParentTypes['Rating']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Cart?: CartResolvers<ContextType>;
  CartProduct?: CartProductResolvers<ContextType>;
  PagedCartProducts?: PagedCartProductsResolvers<ContextType>;
  PagedProducts?: PagedProductsResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductInStock?: ProductInStockResolvers<ContextType>;
  ProductOutOfStock?: ProductOutOfStockResolvers<ContextType>;
  ProductReplaced?: ProductReplacedResolvers<ContextType>;
  ProductUnion?: ProductUnionResolvers<ContextType>;
  Quantity?: QuantityResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rating?: RatingResolvers<ContextType>;
};

