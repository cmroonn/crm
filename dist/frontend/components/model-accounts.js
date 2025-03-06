import React from 'react';
import { useTranslation } from 'adminjs';
import { Box, Input, Select, Button } from '@adminjs/design-system';
import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';
async function getSources() {
    try {
        const response = await axios.get('/api/source/getAll');
        return response;
    }
    catch (error) {
        console.error(error);
    }
}
async function getAccounts() {
    try {
        console.log('da');
        const response = await axios.get('/api/accounts/getAll');
        return response;
    }
    catch (error) {
        console.error(error);
    }
}
export const useSources = () => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        getSources().then(res => setOptions([res]));
    }, []);
    try {
        const newArr = options[0].data;
        let arr = [];
        newArr.forEach(el => {
            arr.push({
                label: el.name,
                value: el.id
            });
        });
        console.log(arr);
        setOptions(arr);
    }
    catch (e) {
        console.log('s');
    }
    return options;
};
const GlobalStyle = createGlobalStyle `
  .group-box {
	display: grid;
	gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
	max-width: 600px;
	align-items: center;
  }
`;
const ModelAccounts = (props) => {
    console.log(props);
    const { translateMessage } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [sources, setSources] = useState([]);
    const [group, setGroups] = useState([
        {
            source: { value: '', label: '' },
            login: "",
            password: "",
            employee_id: props.record.id
        }
    ]);
    useEffect(() => {
        async function fetchData() {
            let sources = await axios.get('/api/source/getAll');
            const sourcesnewArr = sources.data;
            let sourcesArr = [];
            sourcesnewArr.forEach(el => {
                sourcesArr.push({
                    label: el.name,
                    value: el.id
                });
            });
            setSources(sourcesArr);
            const accounts = await axios.get(`/api/accounts/getAll/${props.record.id}`, {
                params: {
                    employee_id: props.record.id
                }
            });
            const newArr = accounts.data;
            let arr = [];
            newArr.forEach(el => {
                arr.push({
                    login: el.login,
                    password: el.password,
                    source: el.source_id,
                    employee_id: el.employee_id
                });
            });
            arr.forEach(account => {
                sourcesArr.forEach(source => {
                    if (account.source === source.value) {
                        account.source = source;
                    }
                });
            });
            if (arr.length > 0) {
                setGroups(arr);
            }
        }
        ;
        fetchData();
    }, []);
    const handleAddGroup = (e) => {
        e.preventDefault();
        const newGroup = [...group];
        newGroup.push({
            source: { value: '', label: '' },
            login: "",
            password: "",
            employee_id: props.record.id
        });
        setGroups(newGroup);
    };
    const _handleChange = (event, type, groupIndex) => {
        if (type === "source") {
            const newGroup = [...group];
            newGroup[groupIndex].source = event;
            setGroups(newGroup);
        }
        else if (type === "login") {
            const newGroup = [...group];
            newGroup[groupIndex].login = event.target.value;
            setGroups(newGroup);
        }
        else if (type === "password") {
            const newGroup = [...group];
            newGroup[groupIndex].password = event.target.value;
            setGroups(newGroup);
        }
    };
    const handleRemoveGroup = (event, i) => {
        event.preventDefault();
        const values = [...group];
        if (values.length <= 1) {
            return;
        }
        values.splice(i, 1);
        setGroups(values);
    };
    const handleSaveData = async () => {
        const values = [...group];
        const resourceId = props.record.id;
        const response = await axios.post('/api/accounts/save', {
            resourceId,
            values,
        });
        return response;
    };
    if (props.where === 'edit') {
        return (React.createElement(Box, { className: "main-box", mb: "xl" },
            React.createElement(GlobalStyle, null),
            group.map((i, groupIndex) => {
                return (React.createElement(Box, { className: "group-box", mb: "xl", key: `${i}-${groupIndex}` },
                    React.createElement(Select, { value: i.source, onChange: selected => _handleChange(selected, "source", groupIndex), options: sources, name: "source", variant: "default", isLoading: isLoading }),
                    React.createElement(Input, { placeholder: "\u041B\u043E\u0433\u0438\u043D", name: "login", onChange: e => _handleChange(e, "login", groupIndex), value: i.login }),
                    React.createElement(Input, { placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", name: "password", onChange: e => _handleChange(e, "password", groupIndex), value: i.password }),
                    React.createElement(Button, { size: "sm", variant: "outlined", onClick: (e) => handleAddGroup(e) }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451"),
                    React.createElement(Button, { size: "sm", variant: "outlined", onClick: (e) => handleRemoveGroup(e, groupIndex) }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443")));
            }),
            React.createElement(Button, { size: "lg", variant: "filled", onClick: () => handleSaveData() }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u044B")));
    }
    else if (props.where === 'show') {
        return (React.createElement(Box, { className: "main-box", mb: "xl" },
            React.createElement(GlobalStyle, null),
            group.map((i, groupIndex) => {
                return (React.createElement(Box, { className: "group-box", mb: "xl", key: `${i}-${groupIndex}` },
                    React.createElement("p", null,
                        " ",
                        i.source.label,
                        " "),
                    React.createElement("p", null,
                        " ",
                        i.login),
                    React.createElement("p", null,
                        " ",
                        i.password)));
            })));
    }
};
export default ModelAccounts;
