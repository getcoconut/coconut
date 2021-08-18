/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class Service extends pulumi.ComponentResource implements cloud.Service {
  public readonly name: string;
  public readonly endpoints: pulumi.Output<cloud.Endpoints>;
  public readonly defaultEndpoint: pulumi.Output<cloud.Endpoint>;

  constructor(
    name: string,
    args: cloud.ServiceArguments,
    opts?: pulumi.ResourceOptions
  ) {
    super('cloud:service:Service', name, {}, opts);

    throw new Error('Method not implemented.');
  }

  getEndpoint(
    containerName?: string,
    containerPort?: number
  ): Promise<cloud.Endpoint> {
    throw new Error('Method not implemented.');
  }
}

export class SharedVolume
  extends pulumi.ComponentResource
  implements cloud.SharedVolume
{
  public readonly kind: 'SharedVolume';
  public readonly name: string;

  constructor(name: string, opts?: pulumi.ResourceOptions) {
    super('cloud:volume:Volume', name, {}, opts);

    throw new Error('Method not implemented.');
  }
}

export class HostPathVolume implements cloud.HostPathVolume {
  public readonly kind = 'HostPathVolume';
  public readonly path: string;
}

export class Task extends pulumi.ComponentResource implements cloud.Task {
  constructor(
    name: string,
    container: cloud.Container,
    opts?: pulumi.ResourceOptions
  ) {
    super('cloud:task:Task', name, {}, opts);

    throw new Error('Method not implemented.');
  }

  run(options?: cloud.TaskRunOptions): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
