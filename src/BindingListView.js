import React, {Component} from 'react';
import {View, requireNativeComponent, Text} from 'react-native';

const RCTBindingListView = requireNativeComponent('RCTBindingListView');
const RCTBindingCell = requireNativeComponent('RCTBindingCell');

export default class BindingListView extends Component {
    render() {
        const poolChildren = [];
        for (let i = 0; i < this.props.poolSize; i++) {
            const child = (
                <Text key={i}></Text>
            );
            poolChildren.push(child);
        }
        return (
            <RCTBindingListView
                rows={this.props.rows}
                binding={this.props.rows}
                numRows={this.props.rows.length}
                rowHeight={this.props.rowHeight}
                style={this.props.style}
            >
                {poolChildren}
            </RCTBindingListView>
        );
    }
}
