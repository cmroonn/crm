import React from 'react'
import { ShowPropertyProps, useTranslation } from 'adminjs'
import { Box, Input, Select, SelectAsync, Button } from '@adminjs/design-system'
import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import axios from 'axios';


async function getSources() {
	try {
		const response = await axios.get('/api/source/getAll');
		return response;
	} catch (error) {
		console.error(error);
	}
}

async function getAccounts() {
	try {
		console.log('da');
		const response = await axios.get('/api/accounts/getAll');
		return response;
	} catch (error) {
		console.error(error);
	}
}



export const useSources = () =>
	{
		const [options, setOptions] = useState([]);
		useEffect(() => { 
			getSources().then(res => setOptions([res]))
			}, [])
		
		try {
			const newArr = options[0].data;
			let arr = [];
			newArr.forEach(el => {
				arr.push({
					label: el.name,
					value: el.id
				})
			});
			console.log(arr);
			setOptions(arr);
		} catch (e) {
			console.log('s');
		}
		return options
	}


// export const useAccounts = async () =>
// 	{
// 		// const sources = useSources();
// 		const [accounts, setAccounts] = useState([]);
// 		useEffect(() => { 
// 			const res = await getAccounts()
// 			setAccounts([res])
// 			}, [])

	
		
// 		try {
// 			const newArr = accounts[0].data;
// 			let arr = [];
// 			newArr.forEach(el => {
// 				arr.push({
// 					login: el.login,
// 					password: el.password,
// 					source: el.source_id,
// 					employee_id: el.employee_id
// 				})
// 			});
// 			console.log(arr);
// 			setAccounts(arr);
// 		} catch (e) {
// 			console.log('s');
// 		}
// 		return accounts
// 	}


const GlobalStyle = createGlobalStyle`
  .group-box {
	display: grid;
	gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
	max-width: 600px;
	align-items: center;
  }
`;

const ModelAccounts: React.FC<ShowPropertyProps> = (props) => {
  console.log(props);	
  const { translateMessage } = useTranslation()

  
  
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [sources, setSources] = useState([]);
  const [group, setGroups] = useState([
	{
	  source: {value: '', label: ''},
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
				})
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
				})
			});
		
			arr.forEach(account => {
				sourcesArr.forEach(source => {
					if (account.source === source.value) {
						account.source = source;
					}
				});
			});
			if(arr.length > 0) {
				setGroups(arr);
			}
			
		};
		fetchData();
	}, []);

  
  




  const handleAddGroup = (e) => {
	e.preventDefault();
    const newGroup = [...group];
    newGroup.push({
	  source: {value: '', label: ''},
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
    } else if (type === "login") {
		const newGroup = [...group];
		newGroup[groupIndex].login = event.target.value;
		setGroups(newGroup);
	} else if (type === "password") {
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

  if(props.where === 'edit') {
	return (
		<Box className="main-box" mb="xl">
			<GlobalStyle />
	
			{group.map((i, groupIndex) => { 
				return (
					<Box className="group-box" mb="xl" key={`${i}-${groupIndex}`}>
						<Select value={i.source} onChange={selected => _handleChange(selected, "source", groupIndex)} options={sources} name="source" variant="default" isLoading={isLoading}/>
						<Input placeholder="Логин" name="login" onChange={e => _handleChange(e, "login", groupIndex)} value={i.login} />
						<Input placeholder="Пароль" name="password" onChange={e => _handleChange(e, "password", groupIndex)} value={i.password} />
	
						<Button
							size="sm"
							variant="outlined"
							onClick={(e) => handleAddGroup(e)}
							
						>
							Добавить ещё
						</Button>
	
						<Button
							size="sm"
							variant="outlined"
							onClick={(e) => handleRemoveGroup(e, groupIndex)}
						>
							Удалить строку
						</Button>
					</Box>
				);
			})}
			<Button
				size="lg"
				variant="filled"
				onClick={() => handleSaveData()}
				
			>
				Сохранить аккаунты
			</Button>
		</Box>
	  );
  } else if (props.where === 'show') {
	return (
		<Box className="main-box" mb="xl">
			<GlobalStyle />
	
			{group.map((i, groupIndex) => { 
				return (
					<Box className="group-box" mb="xl" key={`${i}-${groupIndex}`}>
						<p> {i.source.label} </p>
						<p> { i.login }</p>
						<p> { i.password }</p>
					</Box>
				);
			})}
		</Box>
	  );
  }
  
}

export default ModelAccounts