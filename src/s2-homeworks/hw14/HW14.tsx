import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test2',
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [find, setFind] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<string[]>([])

    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                // сохранить пришедшие данные
                if (res?.data) {
                    setTechs(res.data.techs);
                }
            })
            .catch((e) => {
                alert(e.response?.data?.errorText || e.message)
            })
            .finally(() => setLoading(false)) // ✅ убираем крутилку -->  '...ищем'
    }

    const onChangeText = (value: string) => {
        setFind(value)
        // добавить/заменить значение в квери урла
        // Создаем новый объект параметров на основе текущих
        // URLSearchParams - это нативный API для работы с query-параметрами
        const newSearchParams = new URLSearchParams(searchParams);
        // Устанавливаем или обновляем параметр 'search'
        if (value) {
            newSearchParams.set('search', value); // добавляет или заменяет параметр
        } else {
            newSearchParams.delete('search'); // удаляет параметр, если значение пустое
        }
        // Обновляем URL без перезагрузки страницы
        setSearchParams(newSearchParams);
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <SuperDebouncedInput
                    id={'hw14-super-debounced-input'}
                    value={find}
                    onChangeText={onChangeText}
                    onDebouncedChange={sendQuery}
                />

                <div id={'hw14-loading'} className={s.loading}>
                    {isLoading ? '...ищем' : <br/>}
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
