import Link from "next/link";
import React, { FunctionComponent } from "react";

type ModalProps = {
    modalText: string;
    onClose: () => void;
}
const Modal: FunctionComponent<ModalProps> = ({ modalText, onClose }) => {
    return (
        <div className="fixed pin z-50 overflow-auto flex h-full w-full">
            <div className="relative p-8 m-auto flex-col flex justify-center items-center border-2 rounded bg-slate-300">
                <h1 className="text-4xl font-extrabold text-blue-500 m-4 p-4">
                {modalText}
                </h1>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={onClose}>
                        Close
                    </button>

                    <a href="/graph" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded" >
                        Show graph
                    </a>
                </div>
            </div>
        </div>)
}

export default Modal;

