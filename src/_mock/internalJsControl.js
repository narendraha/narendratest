import { AxiosInstance } from '../_mock/utilities';

// gender options 
export const getGenderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
];

//  residence options
export const getResidenceoptions = [
    { value: "Cohabitant", label: "Cohabitant" },
    { value: "Non-Resident", label: "Non-Resident" },
    { value: "Other", label: "Other" },
];

// eductaion options
export const getEductaionOptions = [
    { value: "High school", label: "High school" },
    { value: "undergraduate", label: "undergraduate" },
    { value: "graduate", label: "graduate" },
    { value: "postgraduate", label: "postgraduate" },
];

// actionTypes
export const getActionTypes = {
    UNSELECT: 0,
    EDIT: 1,
    ISCONFIRM: 2,
    SELECT: 3
}

// profile page sub componets 
export const getProfileTabs = {
    CHANGEPASSWORD: "changePassword",
    BANKDETAILS: "bankDetails",
    SETTINGS: "settings"
}

// Home page tabs
export const getActivetab = {
    HEALTHHUB: "health_hub",
    EXPTMONITORING: "expert_monitoring",
    SYMPTOMSLIST: "list_your_symptoms",
    LIFEGOAL: "lifestyle_goals",
    ORMANAGEMENT: "optimal_risk_managemment"
}

// custom pattens for custom validations
export const customPatterns = [{},
{ type: 'alphasp', pattern: /^[a-zA-Z]*$/, message: 'alphasp', alowChar: '^[a-zA-Z{spacial}]*$' },
{ type: 'alphaspace', pattern: /^[a-zA-Z ]*$/, message: 'alphaspace', alowChar: '^[a-zA-Z {spacial}]*$' },
{ type: 'number', pattern: /^[0-9]{1,20}$/, message: 'number', alowChar: null },

]


// lifestyle tab Symptoms Keys
export const lifeStyleGoalSymptomsKeys = {
    breathnessda: "Breathlessness during Physical activity",
    breathnessea: "Breathlessness even at rest",
    dizziness: "Dizziness",
    col_swet: "Cold Sweat",
    p_tiredness: "Pronounced tiredness",
    chest_pain: "Chest pain",
    pressurechest: "Pressure / Discomfort in chest",
    worry: "Worry",
    weakness: "Weakness",
    infirmity: "Infirmity",
    nsynacpe: "Near Syncope",
    syncope: "syncope",
    tirednessafterwards: "Tiredness afterwards",
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
    let reqObj = ((link === "historychat") ? { history_chat: true } : (link === "transcriptsummary") ? { history_trans: true } : (link === "chat") ? { behavioural_chat: true } : "")
    const profileCompletion = reqObj && await getProfileCompletionSUmmary(reqObj);
    console.log("profileCompletion_response=>", { reqObj, link, profileCompletion })
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
};


// for Api Integration
export const callAPI = async ({ url, method, data, contentType }) => {
    const axiosInstance = AxiosInstance(contentType);
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// preventdefault for numbers 

export const allowedNumbersOnField = (fieldLength, e) => {
    const re = /^[0-9\b]+$/;

    if (!re.test(e.key) || (e.target.value.length >= fieldLength && e.key !== 'Backspace')) {
        e.preventDefault();
    }
}
