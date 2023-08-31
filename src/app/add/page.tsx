"use client"
import React, { FormEvent, useEffect, useState } from "react";
import { LogEntryInput } from "../LogEntry";

const Add = () => {

    const todayDate: Date = new Date();
    const [date, setDate] = useState(todayDate);
    const [dateAsString, setDateAsString] = useState(todayDate.toISOString().substr(0, 10));
    const [temperature, setTemperature] = useState(38.0);
    const [logEntryInput, setLogEntryInput] = useState<LogEntryInput>();
    const url = 'https://localhost:44304/api/LogEntry';


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // aviod page reload
        const body: LogEntryInput = { temperature: temperature, date: date }
        setLogEntryInput(body)
        console.log(logEntryInput);

        postJSON(url, JSON.stringify(body))
            .then(() => {
                console.log("done?")
            })
    }

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
        <div className="flex flex-col justify-center items-center m-12 p-12">
            Add temperature
            <form onSubmit={handleSubmit} className="text-black flex flex-col items-center">
                <input
                    className="m-4 w-min"
                    id="temp_id"
                    type="number"
                    step={0.1}
                    onChange={(e) => { addTemperature(e.target.value); }}
                    value={temperature}
                />

                <input
                    className="m-4 w-fit"
                    id="date_id"
                    type="date"
                    onChange={(e) => { addDate(e.target.value) }}
                    defaultValue={dateAsString}
                    max={dateAsString}
                />


                <button type="submit" className="text-white">Submit</button>
            </form>

        </div>)
}

export default Add;



async function postJSON<T>(url: string, body?: string): Promise<T> {
    return await internalPOST(url, body, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
}

async function internalPOST<T>(
    url: string,
    body?: string,
    headers?: HeadersInit
): Promise<T> {
    let responseOk: boolean;
    console.log(body)
    return await fetch(url, {
        method: "POST",
        body: body,
        headers,
    })
        .then((res) => {
            responseOk = res.ok;
            return res.json();
        })
        .then((body) => {
            if (responseOk) {
                return body;
            } else {
                console.error(body);
                throw body;
            }
        });
}