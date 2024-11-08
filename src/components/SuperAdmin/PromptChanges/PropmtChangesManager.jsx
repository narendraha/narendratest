import React from "react";
import { PropmtChangesFilter } from "./PromptChangesFilter";
import { PromptChangesAction } from "./PropmptChangeAction";


const PropmtChangesManager = () => {
    return (
        <React.Fragment>
            <div className="wflexLayout">
                <PropmtChangesFilter />
                <PromptChangesAction />
            </div>
        </React.Fragment>
    )
}

export default PropmtChangesManager;