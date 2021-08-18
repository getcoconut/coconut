/* eslint-disable @typescript-eslint/no-unused-vars */

import * as cloud from '@pulumi/cloud';
import { Output } from '@pulumi/pulumi';

export class API implements cloud.API {
  static(
    path: string,
    localPath: string,
    options?: cloud.ServeStaticOptions
  ): void {
    throw new Error('Method not implemented.');
  }

  proxy(path: string, target: string | Output<cloud.Endpoint>): void {
    throw new Error('Method not implemented.');
  }

  route(method: string, path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  get(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  put(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  post(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  delete(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  options(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  all(path: string, ...handlers: cloud.RouteHandler[]): void {
    throw new Error('Method not implemented.');
  }

  attachCustomDomain(domain: cloud.Domain): void {
    throw new Error('Method not implemented.');
  }

  publish(): cloud.HttpDeployment {
    throw new Error('Method not implemented.');
  }
}

/**
 * @deprecated HttpEndpoint has been renamed to API
 */
export type HttpEndpoint = API;

/**
 * @deprecated HttpEndpoint has been renamed to API
 */
export const HttpEndpoint = API;
