/* eslint-disable @typescript-eslint/no-unused-vars */

import { timer } from '@pulumi/cloud';
import * as pulumi from '@pulumi/pulumi';

export function interval(
  name: string,
  options: timer.IntervalRate,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void {
  throw new Error('Method not implemented.');
}

export function cron(
  name: string,
  cronTab: string,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void {
  throw new Error('Method not implemented.');
}

export function daily(
  name: string,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void;
export function daily(
  name: string,
  schedule: timer.DailySchedule,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void;
export function daily(
  name: string,
  scheduleOrHandler: timer.DailySchedule | timer.Action,
  handlerOrOptions?: timer.Action | pulumi.ResourceOptions,
  opts?: pulumi.ResourceOptions
): void {
  throw new Error('Method not implemented.');
}

export function hourly(
  name: string,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void;
export function hourly(
  name: string,
  schedule: timer.HourlySchedule,
  handler: timer.Action,
  opts?: pulumi.ResourceOptions
): void;
export function hourly(
  name: string,
  scheduleOrHandler: timer.HourlySchedule | timer.Action,
  handlerOrOptions?: timer.Action | pulumi.ResourceOptions,
  opts?: pulumi.ResourceOptions
): void {
  throw new Error('Method not implemented.');
}
