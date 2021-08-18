/* eslint-disable @typescript-eslint/no-explicit-any */
// Reference: https://github.com/pulumi/pulumi-cloud/blob/master/aws/index.ts

// Note: We only export values (not types) from this module.  Nothing should ever be referencing
// this package.  Instead things should only reference the @pulumi/cloud package.  That package
// actually exports the API types.

export * from './lib/bucket';
export * from './lib/api';
export * from './lib/httpServer';
export * from './lib/table';
export * from './lib/topic';
export * from './lib/service';
import * as timer from './lib/timer';
export { timer };

// Code purely for enforcement that our module properly exports the same surface area as the API. We
// don't ever actually pull in any value from these modules, so there is no actual dependency or
// cost here.  This code can also go into a separate file if we don't want it cluttering this one.

import * as apiModule from '@pulumi/cloud';
import * as thisModule from './index';

let apiShape: typeof apiModule = undefined as any;
const thisShape: typeof thisModule = undefined as any;

// This line ensures that our exported API is a superset of the framework API.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
apiShape = thisShape;
