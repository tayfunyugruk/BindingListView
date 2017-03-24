#import <UIKit/UIKit.h>
@class RCTBridge;

@interface RCTBindingListView : UIView<UITableViewDataSource, UITableViewDelegate>

- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

@property (nonatomic) float rowHeight;
@property (nonatomic) NSInteger numRows;
@property (nonatomic) NSArray *binding;
@property (nonatomic) NSArray *rows;

@end
