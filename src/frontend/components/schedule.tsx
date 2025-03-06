import React from 'react'
import { ShowPropertyProps, useTranslation, useCurrentAdmin, } from 'adminjs'
import { Box, Input, Select, SelectAsync, Button, Text } from '@adminjs/design-system'
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

const Schedule: React.FC<ShowPropertyProps> = (props) => {
	const [currentAdmin] = useCurrentAdmin();
	const [week, setWeek] = useState([]);
	const [time, setTime] = useState([]); 
	const [isNew, setIsNew] = useState(true); 
	useEffect(() => {
		function setData() {
			const getWeek = () => {
				setDefaultOptions({ weekStartsOn: 1 })
				const today = startOfWeek(new Date());
				const lastday = endOfWeek(new Date())
			
				const days = [
					'Понедельник',
					'Вторник',
					'Среда',
					'Четверг',
					'Пятница',
					'Суббота',
					'Воскресенье'
				]
			
				let result: Array<any> = eachDayOfInterval({
					start: today,
					end: lastday
				})
			
				result =  result.map((el, i) => {
					return el = {
						date: new Date(el).toLocaleDateString('ru-ru'),
						dayName: days[i],
					};
				})
			
				return result;
			}

			const weeks = getWeek();
			setWeek(weeks)
		
			const arr = []
			weeks.forEach(el => {
				console.log('rab')
				arr.push({
					start: "",
					end: "",
					date: el.date,
					user_id: Number(currentAdmin.id)
				})
			})
			
			setTime(arr);
		
			return {
				weeks,
				times: arr
			}
		}

		async function fetchData(huy) {
			console.log('start2')
			console.log(huy)
			let dates = [...huy.weeks];
			dates = dates.map(el => {
				return el = {
					date: el.date,
					user_id: Number(currentAdmin.id)
				}
			})
			console.log(dates)
			const response = await axios.post('/api/schedule/getall', {
				dates
			})

			console.log(response)
			if (response.data.length === 0) {
				return;
			}
			setIsNew(false);
			let arr = [...huy.times];
			console.log(arr)
			arr.forEach(el => {
				response.data.forEach(inner => {
					if (el.date === inner.date) {
						el.start = inner.start
						el.end = inner.end
					}
				})
			})

			setTime(arr);
			console.log('end2')
		}

		const data = setData()
		console.log(data)
		fetchData(data)
	}, []);

	const _handleChange = (event, type, index) => {
		console.log('huy')
		if (type === "start") {
		  const newGroup = [...time];
		  console.log(newGroup)
		  newGroup[index].start = event.target.value;
		  setTime(newGroup);
		} else if (type === "end") {
			const newGroup = [...time];
			newGroup[index].end = event.target.value;
			setTime(newGroup);
		} 
	};

	const handleSave = (isNew) => {
		console.log('pizda')
		const data = [...time];
		console.log(data);
		if (isNew) {
			const response = axios.post("/api/schedule/save", {
				data
			})
		} else {
			const response = axios.post("/api/schedule/update", {
				data
			})
		}
	};	


	  


	return (
		<Box variant="transparent" className="weeks-wrapper">
			<GlobalStyle/>
			{
				week.map((day, index) => {
					return (
						<Box variant="card" mb="xl" key={`${day.date}-${index}`}>
							<p onClick={() => console.log(week)}>{day.dayName}, {day.date}</p>
							<div className="fields-wrapper">
								<label>
									<Text variant="sm">
										Начало смены
									</Text>
									<InputMask 
										mask="99:99"
										data-date={day.date}
										data-key={index}
										onChange={e => _handleChange(e, 'start', index)}
										className="input"
										value={time[index].start}
									/>
								</label>
								
								<label>
									<Text variant="sm">
										Конец смены
									</Text>
									<InputMask 
										mask="99:99"
										data-key={index}
										data-date={day.date}
										onChange={e => _handleChange(e, 'end', index)}
										className="input"
										value={time[index].end}
									/>
								</label>
							</div>
						</Box>
					);
				})
			}

		
				
			<Button variant="contained" size="lg" onClick={() => handleSave(isNew)}>
				Сохранить
			</Button>
				
			
		</Box>
	);
}

export default Schedule;