import * as http from 'http';
import * as cloud from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export class HttpServer
  extends pulumi.ComponentResource
  implements cloud.HttpServer
{
  public readonly url: pulumi.Output<string>;
  public readonly server: http.Server;

  public constructor(
    name: string,
    createRequestListener: cloud.RequestListenerFactory,
    opts: pulumi.ComponentResourceOptions = {}
  ) {
    super('cloud:httpserver:HttpServer', name, {}, opts);

    this.server = http.createServer(createRequestListener());

    // Don't start handling errors until the server starts listening.
    // If an error is emitted before, it's handled in the url output promise.
    // TODO: This error handling is experimental and needs further digging
    // and testing.
    this.server.once('listening', () => {
      this.server.on('error', (err) => {
        throw err;
      });
    });

    this.url = pulumi.Output.create(
      new Promise((resolve, reject) => {
        // A promise can only be resolved or rejected once, so we must make
        // sure to handle the first event once and remove the other event
        // listener.

        const listeningHandler = () => {
          const address = this.server.address();

          this.server.off('error', reject);

          if (typeof address === 'string') {
            resolve(address);
          } else {
            const host =
              address.address === '::' ? 'localhost' : address.address;

            resolve(`http://${host}:${address.port}`);
          }
        };

        const errorHandler = (err) => {
          this.server.off('listening', listeningHandler);

          reject(err);
        };

        this.server.once('error', errorHandler);
        this.server.once('listening', listeningHandler);
      })
    );

    this.server.listen();

    this.registerOutputs({ url: this.url });
  }
}
