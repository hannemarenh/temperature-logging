"use client"
import { FormEvent, useState } from "react";
import { postLogEntry } from "../api";
import { ErrorModal, Modal } from "../components/modal";
import { LogEntryInput } from "../LogEntry";

const Add = () => {

    const todayDate: Date = new Date();
    const [date, setDate] = useState(todayDate);
    const [dateAsString, setDateAsString] = useState(todayDate.toISOString().substr(0, 10));
    const [temperature, setTemperature] = useState(38.0);
    const [openDialog, setIsOpenDialog] = useState(false);
    const [error, setError] = useState(false);

    const url = 'https://localhost:44304/api/LogEntry';
    const defaultStyle = "flex flex-col justify-center items-center m-12 p-12";
    const openDialogStyle = "flex flex-col justify-center items-center m-12 p-12 opacity-20";
    const [style, setStyle] = useState(defaultStyle);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // aviod page reload
        const body: LogEntryInput = { temperature: temperature, date: date }

        postLogEntry(url, JSON.stringify(body))
            .then(() => {
                handleOpenDialog();
            })
            .catch(() => {
                setError(true);
            })
    }

    const handleOpenDialog = () => {
        if (openDialog) {
            setStyle(defaultStyle);
        }
        else {
            setStyle(openDialogStyle)
        }
        setIsOpenDialog(!openDialog)
    };

    const addTemperature = (e: string) => {
        const tempAsNumber: number = +e;
        setTemperature(tempAsNumber)
    }

    const addDate = (e: string) => {
        const dateAsDateTime = new Date(e)
        setDate(dateAsDateTime)
        setDateAsString(e)
    }

    return (

        <>
            {openDialog && <Modal onClose={handleOpenDialog} modalText="Submitted!" />}
            {error && <ErrorModal onClose={() => setError(false)} errorType="serverError" />}


            <div className={style} >
                <h1 className="text-4xl font-extrabold text-blue-500 m-4 p-4">
                    Add temperature
                </h1>
                <form onSubmit={handleSubmit} className="text-black flex flex-col items-center">
                    <input
                        className="m-4 p-2 w-20"
                        id="temp_id"
                        type="number"
                        step={0.1}
                        onChange={(e) => { addTemperature(e.target.value); }}
                        value={temperature}
                    />

                    <input
                        className="m-4 p-2"
                        id="date_id"
                        type="date"
                        onChange={(e) => { addDate(e.target.value) }}
                        defaultValue={dateAsString}
                        max={dateAsString}
                    />

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">Submit</button>
                </form>

            </div>
        </>)
}

export default Add;
