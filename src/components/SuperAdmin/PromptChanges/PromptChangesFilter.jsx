import React from "react";
import Select from "react-select";

const botoptions = [
    { value: "History", label: "History" },
    { value: "Behavior", label: "Behavior" },
    { value: "Education", label: "Education" },
];

export const PropmtChangesFilter = React.memo(() => {
    return (
        <React.Fragment>
            <div className="d-flex flex-wrap justify-content-between align-items-center al-pad pb-1 gap-2">
                <div class="d-flex flex-grow-1 align-items-center">
                    <h3 class="bc_main_text mb-0 me-4">Prompt's list</h3>
                    <Select
                        className="inputSelect w-20"
                        options={botoptions}
                        name="bottype"
                        onChange={() => { }}
                    />
                </div>
                <div class="w-auto">
                    <div class="al_searchleft px-0">
                        <input type="text" class="form-control" placeholder="Search" />
                        <i class="icon_alfred_search"></i>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
});