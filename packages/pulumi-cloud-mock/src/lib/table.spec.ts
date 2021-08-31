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

      await expect(table.get({ invalidPK: 'value' })).rejects.toThrow(
        /Query must contain the primary key, and only the primary key/
      );

      await expect(table.get({ id: '1', extraProp: '1' })).rejects.toThrow(
        /Query must contain the primary key, and only the primary key/
      );

      await expect(table.get({ id: 123 })).rejects.toThrow(
        /The value of the primary key must be of type 'string'/
      );
    });

    it('Returns undefined if item not found', async () => {
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

      expect(item).toEqual(data[1]);
    });
  });

  describe('insert', () => {
    it('Fails for invalid item', async () => {
      const table = new Table('test');

      await expect(table.insert({ noPK: 'value' })).rejects.toThrow(
        /Primary key missing/
      );

      await expect(table.insert({ id: 123 })).rejects.toThrow(
        /The value of the primary key must be of type 'string'/
      );
    });

    it('Fails if item with same id exists', async () => {
      const table = new Table('test');

      table.$data = [
        { id: '1', name: 'Coconut' },
        { id: '2', name: 'Coco' },
      ];

      await expect(
        table.insert({ id: '2', name: 'Coco beach' })
      ).rejects.toThrow(/There is already an item with primary key '2'./);
    });

    it('Inserts item', async () => {
      const table = new Table('test');
      const item = { id: '1', name: 'Coco beach' };

      await table.insert(item);

      expect(table.$data).toHaveLength(1);
      expect(table.$data[0]).toMatchObject(item);
    });
  });

  describe('scan', () => {
    it('Returns all items if called without a callback', async () => {
      const itemCount = Table.$pageSize * 3.3; // 4 pages, last not full
      const table = new Table('test');

      table.$data = createData(itemCount);

      const items = await table.scan();

      expect(items).toMatchObject(table.$data);
    });

    it('Calls callback for all pages if it always returns true', async () => {
      const itemCount = Table.$pageSize * 3.3; // 4 pages, last not full
      const table = new Table('test');
      const cbItems = [];

      const cb = jest.fn(async (items) => {
        cbItems.push(...items);

        return true;
      });

      table.$data = createData(itemCount);

      const items = await table.scan(cb);

      expect(items).toBeUndefined();
      expect(cb).toHaveBeenCalledTimes(4);
      expect(cbItems).toMatchObject(table.$data);
    });

    it('Stops when callback returns false', async () => {
      const itemCount = Table.$pageSize * 3.3; // 4 pages, last not full
      const stopId = `${2.1 * Table.$pageSize}`; // Stop on 3rd page
      const table = new Table('test');
      const cbItems = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cb = jest.fn(async (items: any[]) => {
        cbItems.push(...items);

        return items.findIndex((item) => item.id === stopId) < 0;
      });

      table.$data = createData(itemCount);

      const items = await table.scan(cb);

      expect(items).toBeUndefined();
      expect(cb).toHaveBeenCalledTimes(3);
      expect(cbItems).toMatchObject(table.$data.splice(0, Table.$pageSize * 3));
    });
  });

  describe('delete', () => {
    it('Fails for invalid query', async () => {
      const table = new Table('test');

      await expect(table.delete({ invalidPK: 'value' })).rejects.toThrow(
        /Query must contain the primary key, and only the primary key/
      );

      await expect(table.delete({ id: '1', extraProp: '1' })).rejects.toThrow(
        /Query must contain the primary key, and only the primary key/
      );

      await expect(table.delete({ id: 123 })).rejects.toThrow(
        /The value of the primary key must be of type 'string'/
      );
    });

    it('Fails if item not found', async () => {
      const table = new Table('test');

      await expect(table.delete({ id: '1' })).rejects.toThrow(/Item not found/);
    });

    it('Deletes item if found', async () => {
      const table = new Table('test');
      const data = createData(3);

      table.$data = [...data];

      await table.delete({ id: '2' });

      expect(table.$data).toMatchObject([data[0], data[2]]);
    });
  });
});

function createData(itemCount: number) {
  return new Array(itemCount)
    .fill(null)
    .map((_, index) => ({ id: `${index + 1}`, name: `Coconut ${index + 1}` }));
}
