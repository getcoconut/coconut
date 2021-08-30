/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class Table extends pulumi.ComponentResource implements cloud.Table {
  public readonly primaryKey: pulumi.Output<string>;
  public readonly primaryKeyType: pulumi.Output<string>;

  // For mocking and testing purposes
  public $data: Array<unknown> = [];

  constructor(
    name: string,
    primaryKey?: pulumi.Input<string>,
    primaryKeyType?: pulumi.Input<cloud.PrimaryKeyType>,
    opts?: pulumi.ResourceOptions
  ) {
    super('cloud:table:Table', name, {}, opts);

    this.primaryKey = pulumi.output(primaryKey || 'id');
    this.primaryKeyType = pulumi.output(primaryKeyType || 'string');

    this.registerOutputs({
      primaryKey: this.primaryKey,
      primaryKeyType: this.primaryKeyType,
    });
  }

  async get(query: unknown): Promise<any> {
    const [primaryKey, primaryKeyType] = await this.$getOutputs();
    const keys = Object.keys(query);

    if (keys.length !== 1 || keys[0] !== primaryKey) {
      throw new Error(
        `Invalid query '${JSON.stringify(
          query
        )}'. Query must contain the primary key, and only the primary key.`
      );
    }

    if (typeof query[keys[0]] !== primaryKeyType) {
      throw new Error(
        `Invalid query '${JSON.stringify(
          query
        )}'. The value of the primary key must be of type '${
          this.primaryKeyType
        }'`
      );
    }

    return this.$data?.find((item) => item[primaryKey] === query[primaryKey]);
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

  // We can't access output values through Output.get() as the dpeloyment will
  // never finish and the get() function is only callable in code that runs in
  // the cloud post-deployment. So we use apply() for that.
  $getOutputs(): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
      try {
        pulumi.all([this.primaryKey, this.primaryKeyType]).apply(resolve);
      } catch (err) {
        reject(err);
      }
    });
  }
}
