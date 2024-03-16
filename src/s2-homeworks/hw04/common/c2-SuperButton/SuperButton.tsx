import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        xType, // определяет тип кнопки
        className, // классы для стилизации кнопок
        disabled, // указывает, отключена ли кнопка.
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = s.button // В итоговый класс `finalClassName` добавляется класс `s.button` из переменной `s`.

        + (disabled ? ` ${s.disabled}` :
            xType === 'red' ? ` ${s.red}` :
                xType === 'secondary' ? ` ${s.secondary}` : ` ${s.default}`)
        + (className ? ` ${className}` : ''); // задачка на смешивание классов*/

    /*+ (disabled
            ? ...
            : xType === 'red'
                ? ...
    + (className ? ' ' + className : '') // задачка на смешивание классов*/

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
