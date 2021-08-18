import { pulumiCloudMock } from './pulumi-cloud-mock';

describe('pulumiCloudMock', () => {
  it('should work', () => {
    expect(pulumiCloudMock()).toEqual('pulumi-cloud-mock');
  });
});
