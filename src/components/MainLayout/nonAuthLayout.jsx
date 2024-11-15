import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import ConfirmationAction from './ConfirmationAction';
import Loading from './Loading';
import { ApplicationTutorialInfo } from '../Utilities/ApplicationTutorialInfo';

export default function NonAuthLayout() {
    return (
        <Row className='h-100 mx-0'>
            <ConfirmationAction />
            <Col lg="12" id='al_main_landing' className='px-0'>
                {/* application tutorial */}
                <ApplicationTutorialInfo />
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </Col>
            <Loading />
        </Row>
    );
}
