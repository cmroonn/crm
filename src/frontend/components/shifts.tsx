import React from 'react'
import { ShowPropertyProps, useTranslation, useCurrentAdmin, } from 'adminjs'
import { Box, Input, Select, SelectAsync, Button, Text, DropZone } from '@adminjs/design-system'
import { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import axios from 'axios';
import { startOfWeek, setDefaultOptions, endOfWeek, eachDayOfInterval } from 'date-fns';
import InputMask from 'react-input-mask';

const GlobalStyle = createGlobalStyle`
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

const Shifts: React.FC<ShowPropertyProps> = (props) => {
	const [currentAdmin] = useCurrentAdmin();
	const [shifts, setShifts] = useState([]);
	const [inProgress, setInProgress] = useState(false);
	const [timer, setTimer] = useState('00:00');
	const [sources, setSources] = useState([]);

	async function getSources () {
		console.log('sources')
		let sources = await axios.get('/api/source/getAll');
		const sourcesnewArr = sources.data;
		let sourcesArr = [];
		sourcesnewArr.forEach(el => {
			sourcesArr.push({
				label: el.name,
				value: el.id,
				inputValue: '',
			})
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
			})

			if (response.data.length === 0) {
				alert("Смены не найдены.")
				return;
			}

			setShifts(response.data);
		}

		
		fetchShifts();
		getSources();

	
		// async function fetchData(huy) {
		// 	console.log('start2')
		// 	console.log(huy)
		// 	let dates = [...huy.weeks];
		// 	dates = dates.map(el => {
		// 		return el = {
		// 			date: el.date,
		// 			user_id: Number(currentAdmin.id)
		// 		}
		// 	})
		// 	console.log(dates)
		// 	const response = await axios.post('/api/schedule/getall', {
		// 		dates
		// 	})

		// 	console.log(response)
		// 	if (response.data.length === 0) {
		// 		return;
		// 	}
		// 	setIsNew(false);
		// 	let arr = [...huy.times];
		// 	console.log(arr)
		// 	arr.forEach(el => {
		// 		response.data.forEach(inner => {
		// 			if (el.date === inner.date) {
		// 				el.start = inner.start
		// 				el.end = inner.end
		// 			}
		// 		})
		// 	})

		// 	setTime(arr);
		// 	console.log('end2')
		// }

		// const data = setData()
		// console.log(data)
		// fetchData(data)
	}, []);

	useEffect(() => {
		if(inProgress) {
			setTimeout(() => {
				let startTime = localStorage.getItem("startTime");
				const date = new Date();
				let hours = String(date.getHours())
				Number(hours) < 10 ? hours = "0" + hours : hours;
				let minutes = String(date.getMinutes())
				Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
				const time = `${hours}:${minutes}`;

				const getDate = (timeString: string): Date => new Date(0, 0, 0, parseInt(timeString.split(':')[0]), parseInt(timeString.split(':')[1])); // получение даты из строки (подставляются часы и минуты
				const different: number = getDate(time).getTime() - getDate(startTime).getTime();
				
				let hours2: any = Math.floor((different % 86400000) / 3600000);
				let minutes2: any = Math.round(((different % 86400000) % 3600000) / 60000);
				Number(hours2) < 10 ? hours2 = "0" + hours2 : hours2;
				Number(minutes2) < 10 ? minutes2 = "0" + minutes2 : minutes2;
				const result: string = hours2 + ':' + minutes2;
				console.log(result);
				setTimer(result);
			}, 500);

			setInterval(() => {
				let startTime = localStorage.getItem("startTime");
				const date = new Date();
				let hours = String(date.getHours())
				Number(hours) < 10 ? hours = "0" + hours : hours;
				let minutes = String(date.getMinutes())
				Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
				const time = `${hours}:${minutes}`;

				const getDate = (timeString: string): Date => new Date(0, 0, 0, parseInt(timeString.split(':')[0]), parseInt(timeString.split(':')[1])); // получение даты из строки (подставляются часы и минуты
				const different: number = getDate(time).getTime() - getDate(startTime).getTime();
				
				let hours2: any = Math.floor((different % 86400000) / 3600000);
				let minutes2: any = Math.round(((different % 86400000) % 3600000) / 60000);
				Number(hours2) < 10 ? hours2 = "0" + hours2 : hours2;
				Number(minutes2) < 10 ? minutes2 = "0" + minutes2 : minutes2;
				const result: string = hours2 + ':' + minutes2;
				console.log(result);
				setTimer(result);
			}, 60000);
		}
	}, [inProgress])

	
	const startShift = async (id) => {
		const date = new Date();
		let hours = String(date.getHours())
		Number(hours) < 10 ? hours = "0" + hours : hours;
		let minutes = String(date.getMinutes())
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
		})

		console.log(response);

		setInProgress(true);
	};

	const closeShift = async () => {
		const shiftId = localStorage.getItem("shiftId");
		const date = new Date();
		let hours = String(date.getHours())
		Number(hours) < 10 ? hours = "0" + hours : hours;
		let minutes = String(date.getMinutes())
		Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
		const endTime = `${hours}:${minutes}`;

		const response = await axios.post('/api/reports/update', {
			data: [{
				shiftId,
				endTime,
				user_id: Number(currentAdmin.id),
				sources
			}]
		})

		if (response) {
			localStorage.removeItem("startTime");
			localStorage.removeItem("shiftId");
			window.location.reload();
		}
		
	};


	const handleChange = (e, index) => {
		const newGroup = [...sources];
		console.log(newGroup)
		newGroup[index].inputValue = e.target.value;
		setSources(newGroup);
	}



	if (!inProgress) {
		return (
			<Box variant="container">
				<GlobalStyle />
				{shifts.length === 0 ? 'Смен не найдено.' : ''}
				{
					shifts.map((shift, index) => {
						if (shift.start && shift.end !== '') {
							return (
								<Box variant="card" mb={5} key={index}>
									<Text>{shift.date}</Text>
									<Text>{shift.start} - {shift.end}</Text>
									<Button onClick={() => startShift(shift.id)}>Начать смену</Button>
								</Box>
							);
						}
					})
				
				}
			</Box>
		);
	} else {
		return (
			<Box variant="container">
				<Box variant="card">
					<Text mb={5}>Длительность смены: {timer}</Text>
					
					{
						sources.map((source, index) => {
							return (
								<Box mb={5} key={index}>
									<Text>
										{source.label}
									</Text>

									<Input value={source.inputValue} onChange={(e) => handleChange(e, index)}/>
								</Box>
							);
						})
					}

					<Box mt={5} mb={5}>
						<DropZone
							translations={{
								acceptedSize: 'Максимальный размер: {{maxSize}}',
								acceptedType: 'Поддерживает: {{mimeTypes}}',
								placeholder: 'Перетащите файлы сюда',
								unsupportedSize: 'Файл {{fileName}} слишком большой',
								unsupportedType: 'Файл {{fileName}} имеет недопустимый формат: {{fileType}}'
							}}
							uploadLimitIn="KB"
							multiple
							validate={{
								maxSize: undefined,
								mimeTypes: [
									"image/png",
									"image/jpg",
									"image/jpeg"
								]
							}}
						/>
					</Box>

					<Button onClick={() => closeShift()} variant="outline">Завершить смену</Button>
				</Box>
			</Box>
		)
	}
}

export default Shifts;