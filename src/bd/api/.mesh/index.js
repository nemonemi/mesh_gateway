"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = void 0;
const tslib_1 = require("tslib");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const transpile_only_1 = (0, tslib_1.__importDefault)(require("ts-node/register/transpile-only"));
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const transform_mock_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-mock"));
const merger_bare_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const authors_query_ts_1 = (0, tslib_1.__importDefault)(require("./../../../resolvers/authors.query.ts"));
const authors_mutation_ts_1 = (0, tslib_1.__importDefault)(require("./../../../resolvers/authors.mutation.ts"));
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: transpile_only_1.default,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: graphql_1.default,
    // @ts-ignore
    ["@graphql-mesh/transform-mock"]: transform_mock_1.default,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: merger_bare_1.default,
    // @ts-ignore
    ["../../resolvers/authors.query.ts"]: authors_query_ts_1.default,
    // @ts-ignore
    ["../../resolvers/authors.mutation.ts"]: authors_mutation_ts_1.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
require("ts-node/register/transpile-only");
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const events_1 = require("events");
const utils_1 = require("@graphql-mesh/utils");
const graphql_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const transform_mock_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-mock"));
const merger_bare_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-bare"));
const utils_2 = require("@graphql-mesh/utils");
exports.rawConfig = { "sources": [{ "name": "Authors", "handler": { "graphql": { "endpoint": "./src/mock-schema/mock-schema.graphql" } } }], "transforms": [{ "mock": { "if": true, "initializeStore": "./src/resolvers/authors.query.ts#initializeStore", "mocks": [{ "apply": "Query.author", "custom": "./src/resolvers/authors.query.ts#author" }, { "apply": "Mutation.uploadFile", "custom": "./src/resolvers/authors.mutation.ts#uploadFile" }, { "apply": "Mutation.uploadFileWithUnion", "custom": "./src/resolvers/authors.mutation.ts#uploadFileWithUnion" }] } }], "require": ["ts-node/register/transpile-only"], "serve": { "port": 4000, "cors": { "origin": "http://localhost:3000" }, "playground": true, "browser": false } };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new events_1.EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new graphql_subscriptions_1.PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_1.DefaultLogger('???????');
    const sources = [];
    const transforms = [];
    const authorsTransforms = [];
    const additionalTypeDefs = [];
    const authorsHandler = new graphql_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Authors',
        handler: authorsHandler,
        transforms: authorsTransforms
    });
    transforms.push(new transform_mock_2.default({
        apiName: '',
        config: exports.rawConfig.transforms[0].mock,
        baseDir,
        cache,
        pubsub,
        syncImportFn
    }));
    const merger = new merger_bare_2.default({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    const additionalResolvers = await (0, utils_2.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
function getSdk(requester) {
    return {};
}
exports.getSdk = getSdk;
