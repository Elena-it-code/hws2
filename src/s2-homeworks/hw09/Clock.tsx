import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)

        // Если таймер уже запущен, не запускаем новый
        if (timerId !== undefined) return;

        // Функция для обновления времени
        const updateClock = () => {
            setDate(new Date());
        };

        // Запускаем обновление времени каждую секунду
        const id = setInterval(updateClock, 1000) as unknown as number;
        setTimerId(id);
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)

        // Останавливаем таймер, если он запущен
        if (timerId !== undefined) {
            clearInterval(timerId);
            setTimerId(undefined);
        }
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true);
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false);
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const stringTime = `${hours}:${minutes}:${seconds}`; // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    const stringDate = `${day}.${month}.${year}`; // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const optionsDay: Intl.DateTimeFormatOptions = { weekday: 'long' }; // Указываем, что это правильный тип
    // const stringDay = 'date->day' || <br/> // пишут студенты
    const stringDay = new Intl.DateTimeFormat('en-US', optionsDay).format(date); // Получаем день недели на английском

    // Форматируем месяц
    const optionsMonth : Intl.DateTimeFormatOptions = { month: 'long' }; // // Указываем, что это правильный тип
    // const stringMonth = 'date->month' || <br/> // пишут студенты
    const stringMonth = new Intl.DateTimeFormat('en-US', optionsMonth).format(date); // 'January', 'February' и т.д.

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    className={'secondary'}
                    style={{marginRight: '20px', width: '80px', color: 'FFF'}}
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    Start
                </SuperButton>
                <SuperButton
                    style={{width: '80px', color: 'FFF'}}
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    Stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
