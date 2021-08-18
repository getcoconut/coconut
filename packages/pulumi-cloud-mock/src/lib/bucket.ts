/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class Bucket extends pulumi.ComponentResource implements cloud.Bucket {
  constructor(name: string, opts?: pulumi.ResourceOptions) {
    super('cloud:bucket:Bucket', name, {}, opts);

    throw new Error('Method not implemented.');
  }

  onPut(
    name: string,
    handler: cloud.BucketHandler,
    filter?: cloud.BucketFilter
  ): void {
    throw new Error('Method not implemented.');
  }

  onDelete(
    name: string,
    handler: cloud.BucketHandler,
    filter?: cloud.BucketFilter
  ): void {
    throw new Error('Method not implemented.');
  }

  get(key: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }

  put(key: string, contents: Buffer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
