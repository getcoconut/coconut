import pulumi = require('@pulumi/pulumi');

import { Table } from './table';

describe('Table resource', () => {
  describe('constructor', () => {
    it('Creates an instance with the correct defaults', (done) => {
      const table = new Table('test');

      pulumi
        .all([table.primaryKey, table.primaryKeyType])
        .apply(([primaryKey, primaryKeyType]) => {
          try {
            expect(primaryKey).toBe('id');
            expect(primaryKeyType).toBe('string');
            done();
          } catch (err) {
            done(err);
          }
        });
    });

    it('Creates an instance with the specified settings', (done) => {
      const table = new Table('test', 'pk', 'number');

      pulumi
        .all([table.primaryKey, table.primaryKeyType])
        .apply(([primaryKey, primaryKeyType]) => {
          try {
            expect(primaryKey).toBe('pk');
            expect(primaryKeyType).toBe('number');
            done();
          } catch (err) {
            done(err);
          }
        });
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
});
