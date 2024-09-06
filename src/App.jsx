import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [records, setRecords] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
        }
    };

    const stop = () => {
        if (isRunning) {
            setIsRunning(false);
        }
    };

    const reset = () => {
        if (isRunning) {
            stop();
        }
        setElapsedTime(0);
    };

    const simpan = () => {
        if (isRunning) {
            addRecord(elapsedTime);
        }
    };

    const addRecord = (time) => {
        setRecords([...records, time]);
    };

    const deleteRecord = (index) => {
        setRecords(records.filter((_, i) => i !== index));
    };

    const formatTime = (time) => {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor(time / (1000 * 60) % 60);
        let seconds = Math.floor(time / 1000 % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-4">
            <div className="flex flex-col justify-center items-center border-8 border-2 border-black rounded-3xl bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16">
                <div className="text-4xl sm:text-5xl md:text-6xl font-mono text-gray-800 mb-6 sm:mb-8 md:mb-10">
                    {formatTime(elapsedTime)}
                </div>
                <div className="mb-6 sm:mb-8 md:mb-10 space-y-2 sm:space-y-4">
                    <button
                        onClick={start}
                        className="px-4 py-2 mr-2 sm:px-6 sm:py-3 text-base sm:text-xl font-mono text-white bg-blue-600 border-2 border-black rounded-lg hover:bg-blue-700 transition">Start</button>
                    <button
                        onClick={stop}
                        className="px-4 py-2 mr-2 sm:px-6 sm:py-3 text-base sm:text-xl font-mono text-white bg-blue-600 border-2 border-black rounded-lg hover:bg-blue-700 transition">Stop</button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 mr-2 sm:px-6 sm:py-3 text-base sm:text-xl font-mono text-white bg-blue-600 border-2 border-black rounded-lg hover:bg-blue-700 transition">Reset</button>
                    <button
                        onClick={simpan}
                        className="px-4 py-2 mr-2 sm:px-6 sm:py-3 text-base sm:text-xl font-mono text-white bg-blue-600 border-2 border-black rounded-lg hover:bg-blue-700 transition">Save</button>
                </div>
                <div className="w-full mt-6 sm:mt-8 md:mt-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8">Records</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-600 text-white border-2 border-black">
                            <tr>
                                <th className="px-4 py-2 sm:px-8 sm:py-4 text-left text-xs sm:text-sm font-mono uppercase tracking-wider">No</th>
                                <th className="px-4 py-2 sm:px-8 sm:py-4 text-left text-xs sm:text-sm font-mono uppercase tracking-wider">Time</th>
                                <th className="px-4 py-2 sm:px-8 sm:py-4 text-left text-xs sm:text-sm font-mono uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 sm:px-8 sm:py-4 whitespace-nowrap text-sm sm:text-lg">{index + 1}</td>
                                    <td className="px-4 py-2 sm:px-8 sm:py-4 whitespace-nowrap text-sm sm:text-lg">{formatTime(record)}</td>
                                    <td className="px-4 py-2 sm:px-8 sm:py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => deleteRecord(index)}
                                            className="text-red-600 hover:text-red-700 text-sm sm:text-lg">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;
