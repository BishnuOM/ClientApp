import React, { Component} from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = ({ rowCount, isRow, columnCount = 1, isCircle = false, height = 50, width }) => {
    const rows = [];
    if (isRow && columnCount===1) {
        return (
            <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
                <Skeleton count={rowCount} height={height} />
            </SkeletonTheme>
        )
    }
    else if (isRow && columnCount > 1)
    {
        for (let i = 0; i < columnCount; i++) {
            rows.push(<div key={i} style={{ float: "left", width: '' + (100 / columnCount) + '' + "%" }}><Skeleton count={1} height={height} /></div>);
        }
        return (
            <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
                {rows}
            </SkeletonTheme>
        )
    }
    else if (isCircle) {
        return (
            <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
                <Skeleton width={width} height={height} circle />
            </SkeletonTheme>
        )
    }
    else {
        <></>
    }
}

export default Loading;

