import React, { useEffect } from 'react'

const BehaviouralChatBot = () => {


    useEffect(() => {
        fetchProfileComplitionDetails()
    }, []);

    // profileComplition Api
    const fetchProfileComplitionDetails = async (path = "", reOpenModel = false) => {
        let link = reOpenModel ? path : 'chat'
        const result = await getProfileCmpDetails(link);
        setProfileCmpModalProps(result);
        if (result?.navigationLink && result?.navigationLink !== "")
            navigate(`/${result?.navigationLink}`)
    };
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default BehaviouralChatBot