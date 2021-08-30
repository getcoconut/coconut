import pulumi = require('@pulumi/pulumi');

import { Table } from './table';

describe('Table resource', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('Creates an instance with the correct defaults', async () => {
      const table = new Table('test');
      const [primaryKey, primaryKeyType] = await table.$getOutputs();

      expect(primaryKey).toBe('id');
      expect(primaryKeyType).toBe('string');
    });

    it('Creates an instance with the specified settings', async () => {
      const table = new Table('test', 'pk', 'number');
      const [primaryKey, primaryKeyType] = await table.$getOutputs();

      expect(primaryKey).toBe('pk');
      expect(primaryKeyType).toBe('number');
    });

    it('Registers the outputs', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 'registerOutputs' is protected so not accessible for TS
      jest.spyOn(pulumi.ComponentResource.prototype, 'registerOutputs');

      const table = new Table('test', 'pk', 'number');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 'registerOutputs' is protected so not accessible for TS
      expect(table.registerOutputs).toHaveBeenCalledWith(
        expect.objectContaining({
          primaryKey: table.primaryKey,
          primaryKeyType: table.primaryKeyType,
        })
      );
    });
  });

  describe('get', () => {
    it('Fails for invalid query', async () => {
      const table = new Table('test');

      await expect(table.get({ invalidPK: 'value' })).rejects.toThrow();
      await expect(table.get({ id: 123 })).rejects.toThrow();
      await expect(table.get({ id: '1', extraProp: '1' })).rejects.toThrow();
    });

    it('Returns undefined if no item found', async () => {
      const table = new Table('test');
      const item = await table.get({ id: '1' });

      expect(item).toBeUndefined();
    });

    it('Returns the correct item if found', async () => {
      const table = new Table('test');

      const data = [
        { id: '1', name: 'Coconut' },
        { id: '2', name: 'Coco' },
      ];

      table.$data = data;

      const item = await table.get({ id: '2' });

      expect(item).toBe(data[1]);
    });
  });
});
