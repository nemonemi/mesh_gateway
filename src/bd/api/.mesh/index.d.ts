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
    author: ExistingAuthorResult;
    authorPerhaps: ExistingAuthorResult;
};
export declare type QueryauthorArgs = {
    id: Scalars['ID'];
};
export declare type QueryauthorPerhapsArgs = {
    id: Scalars['ID'];
};
export declare type Mutation = {
    uploadFile?: Maybe<UploadFile>;
    uploadFileWithUnion?: Maybe<UploadFileResult>;
};
export declare type MutationuploadFileWithUnionArgs = {
    value?: Maybe<Scalars['String']>;
};
export declare type UploadFileResult = UploadFile | WrongFileTypeError;
export declare type UploadFile = {
    fileID: Scalars['ID'];
};
export declare type WrongFileTypeError = {
    message: Scalars['String'];
};
export declare type ExistingAuthor = {
    id: Scalars['ID'];
    name: Scalars['String'];
};
export declare type ExistingAuthorResult = ExistingAuthor | AuthorDoesNotExistError;
export declare type AuthorDoesNotExistError = {
    message: Scalars['String'];
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
    Mutation: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UploadFileResult: ResolversTypes['UploadFile'] | ResolversTypes['WrongFileTypeError'];
    UploadFile: ResolverTypeWrapper<UploadFile>;
    WrongFileTypeError: ResolverTypeWrapper<WrongFileTypeError>;
    ExistingAuthor: ResolverTypeWrapper<ExistingAuthor>;
    ExistingAuthorResult: ResolversTypes['ExistingAuthor'] | ResolversTypes['AuthorDoesNotExistError'];
    AuthorDoesNotExistError: ResolverTypeWrapper<AuthorDoesNotExistError>;
    AuthorType: ResolverTypeWrapper<AuthorType>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    ID: Scalars['ID'];
    Mutation: {};
    String: Scalars['String'];
    UploadFileResult: ResolversParentTypes['UploadFile'] | ResolversParentTypes['WrongFileTypeError'];
    UploadFile: UploadFile;
    WrongFileTypeError: WrongFileTypeError;
    ExistingAuthor: ExistingAuthor;
    ExistingAuthorResult: ResolversParentTypes['ExistingAuthor'] | ResolversParentTypes['AuthorDoesNotExistError'];
    AuthorDoesNotExistError: AuthorDoesNotExistError;
    AuthorType: AuthorType;
    DateTime: Scalars['DateTime'];
    Boolean: Scalars['Boolean'];
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    authors?: Resolver<Array<ResolversTypes['ExistingAuthor']>, ParentType, ContextType>;
    author?: Resolver<ResolversTypes['ExistingAuthorResult'], ParentType, ContextType, RequireFields<QueryauthorArgs, 'id'>>;
    authorPerhaps?: Resolver<ResolversTypes['ExistingAuthorResult'], ParentType, ContextType, RequireFields<QueryauthorPerhapsArgs, 'id'>>;
}>;
export declare type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    uploadFile?: Resolver<Maybe<ResolversTypes['UploadFile']>, ParentType, ContextType>;
    uploadFileWithUnion?: Resolver<Maybe<ResolversTypes['UploadFileResult']>, ParentType, ContextType, RequireFields<MutationuploadFileWithUnionArgs, never>>;
}>;
export declare type UploadFileResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UploadFileResult'] = ResolversParentTypes['UploadFileResult']> = ResolversObject<{
    __resolveType: TypeResolveFn<'UploadFile' | 'WrongFileTypeError', ParentType, ContextType>;
}>;
export declare type UploadFileResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UploadFile'] = ResolversParentTypes['UploadFile']> = ResolversObject<{
    fileID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type WrongFileTypeErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WrongFileTypeError'] = ResolversParentTypes['WrongFileTypeError']> = ResolversObject<{
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type ExistingAuthorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExistingAuthor'] = ResolversParentTypes['ExistingAuthor']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type ExistingAuthorResultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExistingAuthorResult'] = ResolversParentTypes['ExistingAuthorResult']> = ResolversObject<{
    __resolveType: TypeResolveFn<'ExistingAuthor' | 'AuthorDoesNotExistError', ParentType, ContextType>;
}>;
export declare type AuthorDoesNotExistErrorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuthorDoesNotExistError'] = ResolversParentTypes['AuthorDoesNotExistError']> = ResolversObject<{
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
    Mutation?: MutationResolvers<ContextType>;
    UploadFileResult?: UploadFileResultResolvers<ContextType>;
    UploadFile?: UploadFileResolvers<ContextType>;
    WrongFileTypeError?: WrongFileTypeErrorResolvers<ContextType>;
    ExistingAuthor?: ExistingAuthorResolvers<ContextType>;
    ExistingAuthorResult?: ExistingAuthorResultResolvers<ContextType>;
    AuthorDoesNotExistError?: AuthorDoesNotExistErrorResolvers<ContextType>;
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
export declare type MutationAuthorsSdk = {
    uploadFile: InContextSdkMethod<Mutation['uploadFile'], {}, MeshContext>;
    uploadFileWithUnion: InContextSdkMethod<Mutation['uploadFileWithUnion'], MutationuploadFileWithUnionArgs, MeshContext>;
};
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
