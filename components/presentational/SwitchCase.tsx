import React, { JSX } from "react";

interface SwitchCaseProps {
    tests: Array<{
        test: boolean;
        component: JSX.Element;
    }>;
    defaultComponent?: JSX.Element;
}

const SwitchCase = ({
    tests,
    defaultComponent,
}: SwitchCaseProps): JSX.Element => {
    const filteredTarget = tests.find(({ test }) => test);
    let targetNode;

    if (filteredTarget) {
        targetNode = filteredTarget.component;
    } else if (defaultComponent) {
        targetNode = defaultComponent;
    } else {
        targetNode = null;
    }
    return <>{targetNode}</>;
};

export default SwitchCase;
