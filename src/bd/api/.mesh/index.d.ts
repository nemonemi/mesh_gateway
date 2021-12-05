import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: Date;
};
export declare type Query = {
    authors: Array<ExistingAuthor>;
    author: ExistingAuthor;
    authorPerhaps: ExistingAuthorResult;
};
export declare type QueryauthorArgs = {
    id: Scalars['ID'];
};
export declare type QueryauthorPerhapsArgs = {
    id: Scalars['ID'];
};
export declare type AuthorModel = {
    id: Scalars['ID'];
    name: Scalars['String'];
    type: AuthorType;
    created_at?: Maybe<Scalars['DateTime']>;
};
export declare type ExistingAuthor = AuthorModel & {
    id: Scalars['ID'];
    name: Scalars['String'];
    type: AuthorType;
    created_at?: Maybe<Scalars['DateTime']>;
    registration_number?: Maybe<Scalars['String']>;
};
export declare type ExistingAuthorResult = ExistingAuthor | AuthorDoesNotExistError;
export declare type AuthorDoesNotExistError = {
    message: Scalars['String'];
};
export declare type User = {
    id: Scalars['ID'];
    first_name?: Maybe<Scalars['String']>;
    last_name?: Maybe<Scalars['String']>;
};
export declare type AuthorType = {
    id: Scalars['ID'];
    name: Scalars['String'];
    version?: Maybe<Scalars['String']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    AuthorModel: ResolversTypes['ExistingAuthor'];
    String: ResolverTypeWrapper<Scalars['String']>;
    ExistingAuthor: ResolverTypeWrapper<ExistingAuthor>;
    ExistingAuthorResult: ResolversTypes['ExistingAuthor'] | ResolversTypes['AuthorDoesNotExistError'];
    AuthorDoesNotExistError: ResolverTypeWrapper<AuthorDoesNotExistError>;
    User: ResolverTypeWrapper<User>;
    AuthorType: ResolverTypeWrapper<AuthorType>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    ID: Scalars['ID'];
    AuthorModel: ResolversParentTypes['ExistingAuthor'];
    String: Scalars['String'];
    ExistingAuthor: ExistingAuthor;
    ExistingAuthorResult: ResolversParentTypes['ExistingAuthor'] | ResolversParentTypes['AuthorDoesNotExistError'];
    AuthorDoesNotExistError: AuthorDoesNotExistError;
    User: User;
    AuthorType: AuthorType;
    DateTime: Scalars['DateTime'];
    Boolean: Scalars['Boolean'];
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    authors?: Resolver<Array<ResolversTypes['ExistingAuthor']>, ParentType, ContextType>;
    author?: Resolver<ResolversTypes['ExistingAuthor'], ParentType, ContextType, RequireFields<QueryauthorArgs, 'id'>>;
    authorPerhaps?: Resolver<ResolversTypes['ExistingAuthorResult'], ParentType, ContextType, RequireFields<QueryauthorPerhapsArgs, 'id'>>;
}>;
export declare type AuthorModelResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorModel'] = ResolversParentTypes['AuthorModel']> = ResolversObject<{
    __resolveType: TypeResolveFn<'ExistingAuthor', ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['AuthorType'], ParentType, ContextType>;
    created_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
}>;
export declare type ExistingAuthorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExistingAuthor'] = ResolversParentTypes['ExistingAuthor']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['AuthorType'], ParentType, ContextType>;
    created_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    registration_number?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type ExistingAuthorResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExistingAuthorResult'] = ResolversParentTypes['ExistingAuthorResult']> = ResolversObject<{
    __resolveType: TypeResolveFn<'ExistingAuthor' | 'AuthorDoesNotExistError', ParentType, ContextType>;
}>;
export declare type AuthorDoesNotExistErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorDoesNotExistError'] = ResolversParentTypes['AuthorDoesNotExistError']> = ResolversObject<{
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type AuthorTypeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorType'] = ResolversParentTypes['AuthorType']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    AuthorModel?: AuthorModelResolvers<ContextType>;
    ExistingAuthor?: ExistingAuthorResolvers<ContextType>;
    ExistingAuthorResult?: ExistingAuthorResultResolvers<ContextType>;
    AuthorDoesNotExistError?: AuthorDoesNotExistErrorResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    AuthorType?: AuthorTypeResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryAuthorsSdk = {
    authors: InContextSdkMethod<Query['authors'], {}, MeshContext>;
    author: InContextSdkMethod<Query['author'], QueryauthorArgs, MeshContext>;
    authorPerhaps: InContextSdkMethod<Query['authorPerhaps'], QueryauthorPerhapsArgs, MeshContext>;
};
export declare type MutationAuthorsSdk = {};
export declare type SubscriptionAuthorsSdk = {};
export declare type AuthorsContext = {
    ["Authors"]: {
        Query: QueryAuthorsSdk;
        Mutation: MutationAuthorsSdk;
        Subscription: SubscriptionAuthorsSdk;
    };
};
export declare type MeshContext = AuthorsContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import 'ts-node/register/transpile-only';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{}>;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {};
export declare type Sdk = ReturnType<typeof getSdk>;
