import React, { useState } from 'react'
import './loader.css'

const Skeleton = ({ type, layout, tabs, isFullWidth }) => {
  // console.log('typeWidget', type, layout, tabs);
  return (
    <div
      style={{
        isplay: 'flex',
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="shadow-md h-[328px] rounded p-3 w-full mx-auto">
        {/* <div className={`tabs flex flex-wrap`} >
                    <div className={`skeleton-loader h-3  mb-4 bg-gray-200 p-3 ${isFullWidth ? "w-11/12  " : "w-10/12"} `}></div>
                    {[...Array(3)].map((x, i) =>
                        <div className={`skeleton-loader mb-4 h-3 ml-2 bg-gray-200 p-3 w-1/18`} ></div>
                    )}
                </div> */}

        <div className={`tabs flex flex-wrap ml-3 mr-3`}>
          {[...Array(tabs)].map((x, i) => (
            <div
              className={`skeleton-loader mr-2 mb-4 bg-gray-200 p-3 w-16`}
              key={i}
            ></div>
          ))}
        </div>

        <div className={`ml-3 mr-3`}>
          {layout === 'graph' ? (
            <div className={`grid grid-cols-3 gap-4`}>
              <div className="skeleton-loader col-span-2 h-[252px] bg-gray-200  p-3  w-full mx-auto"></div>
              {/* h-[225px] */}
              <div className="mt-5">
                {[...Array(6)].map((x, i) => (
                  <div
                    className={`skeleton-loader bg-gray-200  p-3  mt-2  w-3/5 mx-auto`}
                    key={i}
                  ></div>
                ))}
              </div>
            </div>
          ) : (
            // : <div className={`skeleton-loader ${isFullWidth ? "h-[252px]" : "h-[292px]"} bg-gray-200 p-3 w-full mx-auto`}></div>}
            <div
              className={`skeleton-loader ${
                tabs != 0 ? 'h-[252px]' : 'h-[292px]'
              } bg-gray-200 p-3 w-full mx-auto`}
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Skeleton
