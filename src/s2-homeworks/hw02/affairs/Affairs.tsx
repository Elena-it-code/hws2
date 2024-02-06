import React from 'react'
import Affair from './affair/Affair'
import {AffairType, FilterType} from '../HW2'
import s from './Affairs.module.css'

type AffairsPropsType = {
    data: AffairType[] // need to fix any
    setFilter: (filter: FilterType)=> void
    deleteAffairCallback: (_id: number)=> void
    filter: FilterType
}

function Affairs(props: AffairsPropsType) {
    const setAll = () => {
        props.setFilter('all')
    }
    const setHigh = () => {
        props.setFilter('high')
    }
    const setMiddle = () => {
        props.setFilter('middle')
    }
    const setLow = () => {
        props.setFilter('low')
    }

    const cnAll = s.button + ' ' + s.all + (props.filter === 'all' ? ' ' + s.active : '')
    const cnHigh = s.button + ' ' + s.high + (props.filter === 'high' ? ' ' + s.active : '')
    const cnMiddle = s.button + ' ' + s.middle + (props.filter === 'middle' ? ' ' + s.active : '')
    const cnLow = s.button + ' ' + s.low + (props.filter === 'low' ? ' ' + s.active : '')
    //В этой строке используется пустая строка в качестве разделителя между классами
    // - `const cnLow`: это объявление переменной `cnLow`.
    // - `s.button + ' ' + s.low`: это объединение классов `s.button` и `s.low` с помощью строки-разделителя `' '`.
    // - `(props.filter === 'low' ? ' ' + s.active : '')`: это условное выражение, которое добавляет класс `s.active` к строке, если `props.filter` равен `'low'`, в противном случае добавляется пустая строка (потому что условие не выполняется).
    // Таким образом, результатом строки `cnLow` будет комбинация классов, где классы `s.button` и `s.low` будут разделены пробелом, и если `props.filter` равен `'low'`, то будет добавлен класс `s.active`.
    // Например, если `props.filter` равен `'low'`, то `cnLow` будет содержать значение `"button low active"`, а если `props.filter` не равен `'low'`, то `cnLow` будет содержать значение `"button low"`.

    const mappedAffairs = props.data.map((a: AffairType) => (
        <Affair
            key={a._id} // кеи ОБЯЗАТЕЛЬНЫ в 99% - так что лучше их писать всегда при создании компонент в мапе
            affair={a}
            deleteAffairCallback={props.deleteAffairCallback}
        />
    ))

    return (
        <div>
            <div className={s.buttonContainer}>
                <button
                    id={'hw2-button-all'}
                    onClick={setAll}
                    className={cnAll}
                >
                    All
                </button>
                <button
                    id={'hw2-button-high'}
                    onClick={setHigh}
                    className={cnHigh}
                >
                    High
                </button>
                <button
                    id={'hw2-button-middle'}
                    onClick={setMiddle}
                    className={cnMiddle}
                >
                    Middle
                </button>
                <button
                    id={'hw2-button-low'}
                    onClick={setLow}
                    className={cnLow}
                >
                    Low
                </button>
            </div>
            <div className={s.affairs}>{mappedAffairs}</div>
        </div>
    )
}

export default Affairs
