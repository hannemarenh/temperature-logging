"use client"
import { useEffect, useState } from "react";
import {
    CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis,
    YAxis, Label,
    ZAxis
} from "recharts";
import { get } from "../api";
import { ErrorModal } from "../components/modal";
import { LogEntry } from "../LogEntry";

type ScatterDataPoint = {
    x: number,
    y: number
}

type View = "day" | "month" | "year";

const Graph = () => {
    const url = 'https://localhost:44304/api/LogEntry';
    const [logEntryData, setLogEntryData] = useState<LogEntry[]>([])
    const [view, setView] = useState<View>("month");
    const [error, setError] = useState(false);



    useEffect(() => {
        get<LogEntry[]>(url).then((res) => {
            setLogEntryData(res)
        })
            .catch(() => {
                setError(true);
            })
    }, [])

    const getXData = (view: View, date: Date) => {
        switch (view) {
            case "day": {
                return new Date(date).getHours()
            }
            case "year": {
                return new Date(date).getMonth()
            }
            default: {
                return new Date(date).getDate()
            }
        }
    }

    const getYLabel = (view: View) => {
        switch (view) {
            case "day": {
                return "Time of the day"
            }
            case "year": {
                return "Month"
            }
            default: {
                return "Date"
            }
        }
    }


    const data: ScatterDataPoint[] = logEntryData.map((current) => {
        return {
            x: getXData(view, current.date),
            y: current.temperature,
        }
    })

    const getButtonStyle = (view: View, buttonView: View) => {
        const activeButtonStyle = "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4";
        const notActiveButtonStyle = "bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4";
        return view === buttonView ? activeButtonStyle : notActiveButtonStyle;
    }


    return (
        <div className="my-20">
            {error && <ErrorModal onClose={() => setError(false)} errorType="serverError" />}
            <div>
                <ResponsiveContainer height={400}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x">
                            <Label value={getYLabel(view)} offset={0} position="insideBottom" />
                        </XAxis>
                        <YAxis type="number" dataKey="y" name="Temperature" unit="C" >
                            <Label value="Temperature"   angle={-90} />
                        </YAxis>

                        <Legend />
                        {
                            <Scatter name={"Temperature"} data={data} fill="purple" />
                        }
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center my-4">
                <button onClick={() => setView("day")} className={getButtonStyle(view, "day")} >Day</button>
                <button onClick={() => setView("month")} className={getButtonStyle(view, "month")}>Month</button>
                <button onClick={() => setView("year")} className={getButtonStyle(view, "year")}>Year</button>
            </div>
        </div>)
}

export default Graph;