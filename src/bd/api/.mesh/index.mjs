import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from 'ts-node/register/transpile-only';
import ExternalModule_1 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_2 from '@graphql-mesh/graphql';
import ExternalModule_3 from '@graphql-mesh/transform-mock';
import ExternalModule_4 from '@graphql-mesh/merger-bare';
import ExternalModule_5 from './../../../resolvers/authors.query.ts';
import ExternalModule_6 from './../../../resolvers/authors.mutation.ts';
const importedModules = {
    // @ts-ignore
    ["ts-node/register/transpile-only"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/transform-mock"]: ExternalModule_3,
    // @ts-ignore
    ["@graphql-mesh/merger-bare"]: ExternalModule_4,
    // @ts-ignore
    ["../../resolvers/authors.query.ts"]: ExternalModule_5,
    // @ts-ignore
    ["../../resolvers/authors.mutation.ts"]: ExternalModule_6
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const syncImportFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import 'ts-node/register/transpile-only';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql';
import MockTransform from '@graphql-mesh/transform-mock';
import BareMerger from '@graphql-mesh/merger-bare';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
export const rawConfig = { "sources": [{ "name": "Authors", "handler": { "graphql": { "endpoint": "./src/mock-schema/mock-schema.graphql" } } }], "transforms": [{ "mock": { "if": true, "initializeStore": "./src/resolvers/authors.query.ts#initializeStore", "mocks": [{ "apply": "Query.author", "custom": "./src/resolvers/authors.query.ts#author" }, { "apply": "Mutation.uploadFile", "custom": "./src/resolvers/authors.mutation.ts#uploadFile" }, { "apply": "Mutation.uploadFileWithUnion", "custom": "./src/resolvers/authors.mutation.ts#uploadFileWithUnion" }] } }], "require": ["ts-node/register/transpile-only"], "serve": { "port": 4000, "cors": { "origin": "http://localhost:3000" }, "playground": true, "browser": false } };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const authorsTransforms = [];
    const additionalTypeDefs = [];
    const authorsHandler = new GraphqlHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    sources.push({
        name: 'Authors',
        handler: authorsHandler,
        transforms: authorsTransforms
    });
    transforms.push(new MockTransform({
        apiName: '',
        config: rawConfig.transforms[0].mock,
        baseDir,
        cache,
        pubsub,
        syncImportFn
    }));
    const merger = new BareMerger({
        cache,
        pubsub,
        logger: logger.child('BareMerger'),
        store: rootStore.child('bareMerger')
    });
    const additionalResolversRawConfig = [];
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [];
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export function getSdk(requester) {
    return {};
}
