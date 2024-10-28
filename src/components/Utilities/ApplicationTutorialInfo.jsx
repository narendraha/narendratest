import React from "react";
import { useSelector } from "react-redux";
import { getHATutAndHeader } from "../../_mock/helperIndex";


export const ApplicationTutorialInfo = React.memo(() => {

    const haTutorialCmp = useSelector((state) => (state?.utilityCallFunctionSlice?.haTutorialCmp) || undefined);
    let getCurrentComponent = getHATutAndHeader?.find((x) => x.headerKey === haTutorialCmp) || "";

    return (
        <React.Fragment>
            {getCurrentComponent && 
                <a href={getCurrentComponent?.youtubeLink} rel="" target="_blank" className="al_menu_info"><small> {getCurrentComponent?.header} Tutorial | Welcome to HelloAlfred.ai</small> <i className='icon_alfred_details' /></a>
            }
        </React.Fragment >
    )
});
