#import "RCTBindingListView.h"
#import "RCTBindingCell.h"
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#import <React/UIView+React.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTRootView.h>

@interface RCTUIManager (BindingListView)

- (void)updateView:(NSNumber *)reactTag viewName:(NSString *)viewName props:(NSDictionary *)props;

@end

@implementation RCTBindingListView

RCTBridge *_bridge;
UITableView *_tableView;
RCTUIManager *_uiManager;
NSMutableArray *_unusedCells;
static NSString *CellIdentifier = @"newFriendCell";

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
  RCTAssertParam(bridge);
  
  if ((self = [super initWithFrame:CGRectZero]))
  {
    _bridge = bridge;
    while ([_bridge respondsToSelector:NSSelectorFromString(@"parentBridge")]
           && [_bridge valueForKey:@"parentBridge"])
    {
      _bridge = [_bridge valueForKey:@"parentBridge"];
    }
    _uiManager = _bridge.uiManager;
    _unusedCells = [NSMutableArray array];
    [self createTableView];
  }
  
  return self;
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
  //[_unusedCells addObject:subview];
  UITableViewCell *cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CellIdentifier];
  [_unusedCells addObject:cell];
}

- (void)layoutSubviews
{
  [_tableView setFrame:self.frame];
}

- (void)createTableView
{
  _tableView = [[UITableView alloc] initWithFrame:CGRectZero style:UITableViewStylePlain];
  _tableView.dataSource = self;
  _tableView.delegate = self;
  _tableView.backgroundColor = [UIColor whiteColor];
  [self addSubview:_tableView];
}

- (void)setRowHeight:(float)rowHeight
{
  _tableView.estimatedRowHeight = rowHeight;
  _rowHeight = 100;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)theTableView
{
  return 1;
}

- (NSInteger)tableView:(UITableView *)theTableView numberOfRowsInSection:(NSInteger)section
{
  return self.numRows;
}

- (RCTBindingCell*)getUnusedCellFromPool
{
  RCTBindingCell* res = [_unusedCells lastObject];
  [_unusedCells removeLastObject];
  if (res != nil)
  {
    res.tag = [_unusedCells count];
  }
  if (res == nil)
  {
    NSLog(@"BindingListView Error: Not enough cells, increase poolSize");
  }
  return res;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
  return self.rowHeight;
}

- (UITableViewCell *)tableView:(UITableView *)theTableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  RCTBindingCell *cell = (RCTBindingCell *)[theTableView dequeueReusableCellWithIdentifier:CellIdentifier];
  
  if (cell == nil)
  {
    cell = [self getUnusedCellFromPool];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:_bridge moduleName: @"TestRow" initialProperties:@{@"message" : [NSString stringWithFormat:@"Hi from Objective-C !!! %ld", (long)indexPath.row]}];
    
    [cell addSubview:rootView];
  }
  
  RCTRootView *rootView = cell.subviews[1];
  
  rootView.appProperties = @{@"message" : [NSString stringWithFormat:@"Hi from Objective-C !!! %ld", (long)indexPath.row]};
  
  return cell;
}

@end
