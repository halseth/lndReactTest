//
//  LndReactModule.m
//  lndReactTest
//
//  Created by Johan Torås Halseth on 26/04/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "LndReactModule.h"
#import <React/RCTLog.h>
#import <Lndbindings/Lndbindings.h>

@implementation LndReactModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start:(RCTResponseSenderBlock)callback)
{
  NSFileManager *fileMgr = [NSFileManager defaultManager];
  NSURL *dir = [[fileMgr URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];

  NSString *lndConf = [[NSBundle mainBundle] pathForResource:@"lnd" ofType:@"conf"];
  NSString *confTarget = [dir.path stringByAppendingString:@"/lnd.conf"];

  [fileMgr removeItemAtPath:confTarget error:nil];
  [fileMgr copyItemAtPath:lndConf toPath: confTarget error:nil];

  RCTLogInfo(@"lnd dir: %@", dir.path);

  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^(void){
    RCTLogInfo(@"Starting lnd");
    LndbindingsStart(dir.path);
  });


  // TODO: callback when rpc server is ready.
  NSArray *events = @[@"started"];
  callback(@[[NSNull null], events]);
}

RCT_EXPORT_METHOD(getInfo:(RCTResponseSenderBlock)callback)
{
  RCTLogInfo(@"Getting info");

  // TODO: handle error.
  NSString *info = LndbindingsGetInfo(nil);

  NSArray *events = @[info];
  callback(@[[NSNull null], events]);
}

@end
