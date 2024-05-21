import React from 'react';
import { useSelector } from 'react-redux';
import TopBarProgress from "react-topbar-progress-indicator";

function Loading() {
    const layoutloading = useSelector(state => state.Layout?.loading);
    console.log("layoutloading=>", layoutloading);

    TopBarProgress.config({
        barColors: {
            "0": "#666666"
        },
        shadowBlur: 1,
        shadowColor: "#000"
    });

    return (
        <>
            <div className="al_mainLoading">
                <TopBarProgress />
            </div>
        </>
    )
}
export default Loading;