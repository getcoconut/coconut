/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class Topic<T>
  extends pulumi.ComponentResource
  implements cloud.Topic<T>
{
  constructor(name: string, opts?: pulumi.ResourceOptions) {
    super('cloud:topic:Topic', name, {}, opts);

    throw new Error('Method not implemented.');
  }

  publish(item: T): Promise<void> {
    throw new Error('Method not implemented.');
  }

  subscribe(name: string, handler: (item: T) => Promise<void>): void {
    throw new Error('Method not implemented.');
  }
}
