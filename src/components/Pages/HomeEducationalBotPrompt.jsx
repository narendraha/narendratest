import React from "react";
import { Card, CardBody, Col, Row } from 'reactstrap';

// Prompt Questions 
let promptQuestions = [
    { qid: 1, question: "What is Artial Fibrillation?" },
    { qid: 2, question: "Is Atrial Fibrillation dangerous?" },
    { qid: 3, question: "How do you diagnose Atrial Fibrillation?" },
    { qid: 4, question: "What are the symptoms of Atrial Fibrillation?" }
]
const HomeEducationalBotPrompt = ({ props }) => {

    const promptHandleChange = (question) => {
        props?.handleFormSubmit(question)
    }

    return (
        <React.Fragment>
            <Row className="mt-3 al_promptcard">
                {promptQuestions && promptQuestions?.map((promptQuestion, index) => (
                    <Col xs="6" className="mb-3" key={promptQuestion?.qid}>
                        <Card className='al_cardview pointer' onClick={() => promptHandleChange(promptQuestion?.question)}>
                            <CardBody className='p-3'>
                                <div className="text-xs-small lh-normal">{promptQuestion?.question}</div>
                                <i className="icon_alfred_back-arrow"></i>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default HomeEducationalBotPrompt;