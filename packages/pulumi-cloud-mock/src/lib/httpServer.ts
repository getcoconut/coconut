import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class HttpServer
  extends pulumi.ComponentResource
  implements cloud.HttpServer
{
  public readonly url: pulumi.Output<string>;

  public constructor(
    name: string,
    createRequestListener: cloud.RequestListenerFactory,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super('cloud:httpserver:HttpServer', name, {}, opts);

    throw new Error('Method not implemented.');
  }
}
