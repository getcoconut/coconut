import * as pulumi from '@pulumi/pulumi';

// Mock the external calls to the Pulumi CLI.
// Ref: https://www.pulumi.com/docs/guides/testing/unit
pulumi.runtime.setMocks({
  newResource: function (args: pulumi.runtime.MockResourceArgs): {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
  } {
    return {
      id: args.inputs.name + '_id',
      state: args.inputs,
    };
  },
  call: function (args: pulumi.runtime.MockCallArgs) {
    return args.inputs;
  },
});
