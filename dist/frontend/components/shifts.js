import React from 'react';
import { useCurrentAdmin, } from 'adminjs';
import { Box, Input, Button, Text, DropZone } from '@adminjs/design-system';
import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
const GlobalStyle = createGlobalStyle `
  .weeks-wrapper {
	display: grid;
	gap: 30px;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
  }

  .fields-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
  }

  .input {
	width: 100%;
 }
`;
const Shifts = (props) => {
    const [currentAdmin] = useCurrentAdmin();
    const [shifts, setShifts] = useState([]);
    const [inProgress, setInProgress] = useState(false);
    const [timer, setTimer] = useState('00:00');
    const [sources, setSources] = useState([]);
    async function getSources() {
        console.log('sources');
        let sources = await axios.get('/api/source/getAll');
        const sourcesnewArr = sources.data;
        let sourcesArr = [];
        sourcesnewArr.forEach(el => {
            sourcesArr.push({
                label: el.name,
                value: el.id,
                inputValue: '',
            });
        });
        setSources(sourcesArr);
    }
    useEffect(() => {
        localStorage.getItem("startTime") ? setInProgress(true) : false;
        async function fetchShifts() {
            const response = await axios.post('/api/schedule/getall', {
                dates: [{
                        user_id: Number(currentAdmin.id),
                        isFinished: false,
                    }]
            });
            if (response.data.length === 0) {
                alert("Смены не найдены.");
                return;
            }
            setShifts(response.data);
        }
        fetchShifts();
        getSources();
    }, []);
    useEffect(() => {
        if (inProgress) {
            setTimeout(() => {
                let startTime = localStorage.getItem("startTime");
                const date = new Date();
                let hours = String(date.getHours());
                Number(hours) < 10 ? hours = "0" + hours : hours;
                let minutes = String(date.getMinutes());
                Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
                const time = `${hours}:${minutes}`;
                const getDate = (timeString) => new Date(0, 0, 0, parseInt(timeString.split(':')[0]), parseInt(timeString.split(':')[1]));
                const different = getDate(time).getTime() - getDate(startTime).getTime();
                let hours2 = Math.floor((different % 86400000) / 3600000);
                let minutes2 = Math.round(((different % 86400000) % 3600000) / 60000);
                Number(hours2) < 10 ? hours2 = "0" + hours2 : hours2;
                Number(minutes2) < 10 ? minutes2 = "0" + minutes2 : minutes2;
                const result = hours2 + ':' + minutes2;
                console.log(result);
                setTimer(result);
            }, 500);
            setInterval(() => {
                let startTime = localStorage.getItem("startTime");
                const date = new Date();
                let hours = String(date.getHours());
                Number(hours) < 10 ? hours = "0" + hours : hours;
                let minutes = String(date.getMinutes());
                Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
                const time = `${hours}:${minutes}`;
                const getDate = (timeString) => new Date(0, 0, 0, parseInt(timeString.split(':')[0]), parseInt(timeString.split(':')[1]));
                const different = getDate(time).getTime() - getDate(startTime).getTime();
                let hours2 = Math.floor((different % 86400000) / 3600000);
                let minutes2 = Math.round(((different % 86400000) % 3600000) / 60000);
                Number(hours2) < 10 ? hours2 = "0" + hours2 : hours2;
                Number(minutes2) < 10 ? minutes2 = "0" + minutes2 : minutes2;
                const result = hours2 + ':' + minutes2;
                console.log(result);
                setTimer(result);
            }, 60000);
        }
    }, [inProgress]);
    const startShift = async (id) => {
        const date = new Date();
        let hours = String(date.getHours());
        Number(hours) < 10 ? hours = "0" + hours : hours;
        let minutes = String(date.getMinutes());
        Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
        const time = `${hours}:${minutes}`;
        localStorage.setItem('startTime', time);
        localStorage.setItem('shiftId', id);
        console.log(localStorage.getItem('startTime'));
        const response = await axios.post('/api/reports/save', {
            data: [{
                    shiftId: id,
                    startTime: time,
                    user_id: Number(currentAdmin.id)
                }]
        });
        console.log(response);
        setInProgress(true);
    };
    const closeShift = async () => {
        const shiftId = localStorage.getItem("shiftId");
        const date = new Date();
        let hours = String(date.getHours());
        Number(hours) < 10 ? hours = "0" + hours : hours;
        let minutes = String(date.getMinutes());
        Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
        const endTime = `${hours}:${minutes}`;
        const response = await axios.post('/api/reports/update', {
            data: [{
                    shiftId,
                    endTime,
                    user_id: Number(currentAdmin.id),
                    sources
                }]
        });
        if (response) {
            localStorage.removeItem("startTime");
            localStorage.removeItem("shiftId");
            window.location.reload();
        }
    };
    const handleChange = (e, index) => {
        const newGroup = [...sources];
        console.log(newGroup);
        newGroup[index].inputValue = e.target.value;
        setSources(newGroup);
    };
    if (!inProgress) {
        return (React.createElement(Box, { variant: "container" },
            React.createElement(GlobalStyle, null),
            shifts.length === 0 ? 'Смен не найдено.' : '',
            shifts.map((shift, index) => {
                if (shift.start && shift.end !== '') {
                    return (React.createElement(Box, { variant: "card", mb: 5, key: index },
                        React.createElement(Text, null, shift.date),
                        React.createElement(Text, null,
                            shift.start,
                            " - ",
                            shift.end),
                        React.createElement(Button, { onClick: () => startShift(shift.id) }, "\u041D\u0430\u0447\u0430\u0442\u044C \u0441\u043C\u0435\u043D\u0443")));
                }
            })));
    }
    else {
        return (React.createElement(Box, { variant: "container" },
            React.createElement(Box, { variant: "card" },
                React.createElement(Text, { mb: 5 },
                    "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0441\u043C\u0435\u043D\u044B: ",
                    timer),
                sources.map((source, index) => {
                    return (React.createElement(Box, { mb: 5, key: index },
                        React.createElement(Text, null, source.label),
                        React.createElement(Input, { value: source.inputValue, onChange: (e) => handleChange(e, index) })));
                }),
                React.createElement(Box, { mt: 5, mb: 5 },
                    React.createElement(DropZone, { translations: {
                            acceptedSize: 'Максимальный размер: {{maxSize}}',
                            acceptedType: 'Поддерживает: {{mimeTypes}}',
                            placeholder: 'Перетащите файлы сюда',
                            unsupportedSize: 'Файл {{fileName}} слишком большой',
                            unsupportedType: 'Файл {{fileName}} имеет недопустимый формат: {{fileType}}'
                        }, uploadLimitIn: "KB", multiple: true, validate: {
                            maxSize: undefined,
                            mimeTypes: [
                                "image/png",
                                "image/jpg",
                                "image/jpeg"
                            ]
                        } })),
                React.createElement(Button, { onClick: () => closeShift(), variant: "outline" }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0441\u043C\u0435\u043D\u0443"))));
    }
};
export default Shifts;
