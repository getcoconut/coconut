/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

/*
 * Principles used in the implementation of the Table service:
 *
 * 1. Be strict: the mock provider is intended to be used during development
 *    and local testing, so it should help the developer identify any possible
 *    issues with his code. To achieve this, we should be strict about props
 *    validation and how the correct behviour should look like.
 * 2. Work with copies of data: when inserting data into the internal $data
 *    object or when returning data out of it, always make copies. This is to
 *    mimic the behaviour of real databases, as changing the properties of an
 *    object returned from the database doesn't update the corresponding item
 *    in the database.
 */

export class Table extends pulumi.ComponentResource implements cloud.Table {
  public readonly primaryKey: pulumi.Output<string>;
  public readonly primaryKeyType: pulumi.Output<string>;

  // For mocking and testing purposes
  public static $pageSize = 10;
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

    if (typeof query[primaryKey] !== primaryKeyType) {
      throw new Error(
        `Invalid query '${JSON.stringify(
          query
        )}'. The value of the primary key must be of type '${primaryKeyType}'.`
      );
    }

    const item = this.$data?.find(
      (item) => item[primaryKey] === query[primaryKey]
    );

    return item ? Object.assign({}, item) : undefined;
  }

  async insert(item: unknown): Promise<void> {
    const [primaryKey, primaryKeyType] = await this.$getOutputs();

    if (item[primaryKey] === undefined) {
      throw new Error(
        `Invalid item '${JSON.stringify(item)}'. Primary key missing.`
      );
    }

    if (typeof item[primaryKey] !== primaryKeyType) {
      throw new Error(
        `Invalid item '${JSON.stringify(
          item
        )}'. The value of the primary key must be of type '${primaryKeyType}'.`
      );
    }

    const existingItem = await this.get({ [primaryKey]: item[primaryKey] });

    if (existingItem) {
      throw new Error(
        `There is already an item with primary key '${item[primaryKey]}'.`
      );
    }

    this.$data.push(Object.assign({}, item));
  }

  scan(): Promise<any[]>;
  scan(callback: (items: any[]) => Promise<boolean>): Promise<void>;
  async scan(callback?: any): Promise<void | any[]> {
    const pageCount = Math.ceil(this.$data.length / Table.$pageSize);
    const data = [];

    let currentPage = 1;

    while (currentPage <= pageCount) {
      const start = (currentPage - 1) * Table.$pageSize;
      const end = start + Table.$pageSize;

      const pageItems = this.$data
        .slice(start, end)
        .map((item) => Object.assign({}, item));

      if (callback) {
        if (!(await callback(pageItems))) break;
      } else {
        data.push(...pageItems);
      }

      currentPage++;
    }

    return callback ? undefined : data;
  }

  async delete(query: unknown): Promise<void> {
    const [primaryKey] = await this.$getOutputs();
    const item = await this.get(query); // A simple way of validating the query and checking for item existence

    if (!item) {
      throw new Error('Item not found.');
    }

    const index = this.$data.findIndex(
      (item) => item[primaryKey] === query[primaryKey]
    );

    this.$data.splice(index, 1);
  }

  async update(query: unknown, updates: unknown): Promise<void> {
    const [primaryKey] = await this.$getOutputs();
    const item = await this.get(query); // A simple way of validating the query and checking for item existence

    if (!item) {
      throw new Error('Item not found.');
    }

    if (Object.prototype.hasOwnProperty.call(updates, primaryKey)) {
      throw new Error("Updates object can't contain primary key");
    }

    const index = this.$data.findIndex(
      (item) => item[primaryKey] === query[primaryKey]
    );

    Object.assign(this.$data[index], updates);
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
