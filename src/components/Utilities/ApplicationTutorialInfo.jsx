import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHATutAndHeader } from "../../_mock/helperIndex";
import { setHATutorialComponent } from "../../store/UtilityCallFunction/slice";


export const ApplicationTutorialInfo = React.memo(() => {
    const dispatch = useDispatch();

    const haTutorialCmp = useSelector((state) => (state?.utilityCallFunctionSlice?.haTutorialCmp) || undefined);
    let getCurrentComponent = getHATutAndHeader?.find((x) => x.headerKey === haTutorialCmp) || "";

    // hide tutorial link after 5 sec
    useEffect(() => {
        setTimeout(() => {
            dispatch(setHATutorialComponent(null))
        }, 5000)
    }, [dispatch, getCurrentComponent])

    return (
        <React.Fragment>
            {getCurrentComponent && <div className='al_menu_info'>
                <small> {getCurrentComponent?.header} Tutorial | Welcome to HelloAlfred.ai</small>
                <a href={getCurrentComponent?.youtubeLink} rel="noreferrer" target="_blank" className="d-flex"> <i className='icon_alfred_details' /></a>
            </div>}
        </React.Fragment >
    )
});
