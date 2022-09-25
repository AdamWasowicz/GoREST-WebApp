import React from "react";
import './style.scss';
import { Index, IndexRange, InfiniteLoader, List, ListRowProps } from 'react-virtualized';


interface InfiniteListProps {
    //InfiniteLoader
    isRowLoaded: (params: Index) => boolean,
    loadMoreRowsCallback: (params: IndexRange) => Promise<void>,
    minimumBatchSize?: number,
    threshold?: number,
    maxRowCount?: number,

    //List
    height: number,
    width: number,
    rowCount: number,
    rowHeight: number,
    renderRowCallback: (props: ListRowProps) => JSX.Element,
    listClassName?: string,
}


const InfiniteList: React.FC<InfiniteListProps> = (props) => {

    const defaultMaxRowCount = 3000;
    const defaultMinimumBatchSize = 1;
    const defaultThreshold = 10;
    const defaultListClassName = 'InfiniteList';


    return (
        <InfiniteLoader
            isRowLoaded={props.isRowLoaded}
            loadMoreRows={props.loadMoreRowsCallback}
            rowCount={props.maxRowCount ? props.maxRowCount : defaultMaxRowCount}
            minimumBatchSize={props.minimumBatchSize ? props.minimumBatchSize : defaultMinimumBatchSize}
            threshold={props.threshold ? props.threshold : defaultThreshold}
        >
            {({ onRowsRendered, registerChild }) => (
                <List
                    height={props.height}
                    width={props.width}
                    rowCount={props.rowCount}
                    rowHeight={props.rowHeight}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowRenderer={props.renderRowCallback}
                    className={props.listClassName ? props.listClassName : defaultListClassName}
                    style={{ width: '100%' }}
                />
            )}
        </InfiniteLoader>
    )
}

export default InfiniteList;