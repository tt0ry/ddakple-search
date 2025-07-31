/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement, ReactNode } from "react";

interface MaybeProps {
    test: any;
    children: ReactNode | ReactElement;
}

const Maybe = ({ test, children }: MaybeProps) => {
    return <>{test ? children : null}</>;
};

export default Maybe;
