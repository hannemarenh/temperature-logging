import React, { FunctionComponent } from "react";

export type ErrorType = "serverError";

type ErrorModalProps = {
    onClose: () => void;
    errorType?: ErrorType;
}
const ErrorModal: FunctionComponent<ErrorModalProps> = ({ onClose, errorType }) => {
    return (
        <div className="fixed pin z-50 overflow-auto flex h-full w-full">
            <div className="relative p-8 m-auto flex-col flex justify-center items-center border-2 rounded bg-slate-300">
                <h1 className="text-4xl font-extrabold text-red-500 m-4 p-4">
                    An error occurred....
                </h1>
                {errorType && < p className="text-black">
                    Technical details: {errorType}
                </p>}
                <div>
                    <button className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 m-4 rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>)
}

export default ErrorModal;

