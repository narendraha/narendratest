import { AxiosInstance } from '../_mock/utilities';

// custom pattens for custom validations
export const customPatterns = [{},
{ type: 'alphasp', pattern: /^[a-zA-Z]*$/, message: 'alphasp', alowChar: '^[a-zA-Z{spacial}]*$' },
]


// lifestyle tab Symptoms Keys
export const lifeStyleGoalSymptomsKeys = {
    infirmity: "Infirmity",
    nsynacpe: "Near Syncope",
    tirednessafterwards: "Tiredness afterwards",
    syncope: "syncope",
    p_tiredness: "Pronounced tiredness",
    breathnessda: "Breathlessness during Physical activity",
    breathnessea: "Breathlessness even at rest",
    dizziness: "Dizziness",
    col_swet: "Cold Sweat",
    chest_pain: "Chest pain",
    pressurechest: "Pressure / Discomfort in chest",
    worry: "Worry",
    weakness: "Weakness"
}

// Profile complition summary
const getProfileCompletionSUmmary = async (payload) => {
    try {
        const response = await AxiosInstance("application/json").post(
            "/profile-completions-summary",
            payload
        );
        if (
            response &&
            response.status === 200 &&
            response.data.statuscode === 200
        ) {
            return response.data;
        }
    } catch (error) {
        return false;
    }
};


export const getProfileCmpDetails = async (link, reOpenModel = false) => {
    let redirectionPath = "", modalMessage = "", isModalVisible = false, navigationLink = ""
    let reqObj = ((link === "historychat") ? { history_chat: true } : (link === "transcriptsummary") ? { history_trans: true } : "")
    const profileCompletion = reqObj && await getProfileCompletionSUmmary(reqObj);
    console.log("profileCompletion_response=>", { link, profileCompletion })
    if (profileCompletion?.status && profileCompletion?.data) {
        redirectionPath = { link: link, route: profileCompletion?.data?.web_redirection_key };
        if (!reOpenModel)
            isModalVisible = !isModalVisible;
        modalMessage = profileCompletion?.message;
    } else {
        isModalVisible = false;
        navigationLink = link
    }
    return { redirectionPath, isModalVisible, modalMessage, navigationLink }
}