/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class Table extends pulumi.ComponentResource implements cloud.Table {
  public readonly primaryKey: pulumi.Output<string>;
  public readonly primaryKeyType: pulumi.Output<string>;

  constructor(
    name: string,
    primaryKey?: pulumi.Input<string>,
    primaryKeyType?: pulumi.Input<cloud.PrimaryKeyType>,
    opts?: pulumi.ResourceOptions
  ) {
    super('cloud:table:Table', name, {}, opts);

    throw new Error('Method not implemented.');
  }

  get(query: unknown): Promise<any> {
    throw new Error('Method not implemented.');
  }

  insert(item: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  scan(): Promise<any[]>;
  scan(callback: (items: any[]) => Promise<boolean>): Promise<void>;
  scan(callback?: any): Promise<void> | Promise<any[]> {
    throw new Error('Method not implemented.');
  }

  delete(query: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(query: unknown, updates: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
