import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

export const getGoalTimePeriod = {
    WEEKWISE: 0,
    DAYSWISE: 1,
    MONTHWISE: 2,
};
const LifeStyleGoalTabs = () => {

    const [getActiveLifestyleGoal, setActiveLifestleGoal] = useState(getGoalTimePeriod.WEEKWISE);

    return (
        <div>
            <Row className="mb-4">
                <Col lg="3" sm="6">
                    <div
                        className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                            getGoalTimePeriod.WEEKWISE
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setActiveLifestleGoal(getGoalTimePeriod.WEEKWISE)
                        }
                    >
                        Create goal for <strong>1 week</strong>
                    </div>
                </Col>
                <Col lg="3" sm="6">
                    <div
                        className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                            getGoalTimePeriod.DAYSWISE
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setActiveLifestleGoal(getGoalTimePeriod.DAYSWISE)
                        }
                    >
                        Create goal for <strong>15 days</strong>
                    </div>
                </Col>
                <Col lg="3" sm="6">
                    <div
                        className={`al_lightbgbutton ${getActiveLifestyleGoal ===
                            getGoalTimePeriod.MONTHWISE
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setActiveLifestleGoal(getGoalTimePeriod.MONTHWISE)
                        }
                    >
                        Create goal for <strong>1 month</strong>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LifeStyleGoalTabs