import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react'
import s from './SuperCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        onChange,
        onChangeChecked,
        className,
        spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        id,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => { // задачка на написание onChange
        const checked = e.currentTarget.checked // получаем значение отмечен ли чекбокс

        // вызываем обработчики onChange и onChangeChecked, если они определены
        if (onChange) {
            onChange(e); // передаем событие в качестве аргумента функции onChange
        }
        if (onChangeChecked) {
            onChangeChecked(checked); // передаем значение checked в функцию onChangeChecked
        }
    }

    // 1. `const checked = e.currentTarget.checked` - Здесь мы получаем значение `checked` из события `e`,
    // которое указывает, отмечен ли чекбокс или нет.
    // 2. Затем идет проверка на существование функции `onChange` с помощью условия `if (onChange)`.
    // Если функция `onChange` определена, то она вызывается с передачей события `e` в качестве аргумента: `onChange(e)`.
    // 3. После этого идет проверка на существование функции `onChangeChecked` с помощью условия `if (onChangeChecked)`.
    // Если функция `onChangeChecked` определена, то она вызывается с передачей значения `checked` в качестве аргумента: `onChangeChecked(checked)`.
    // Таким образом, эта функция `onChangeCallback` предназначена для обработки события изменения чекбокса.
    // Она вызывает соответствующие обработчики, если они были переданы в качестве аргументов, и
    // передает им информацию о том, был ли чекбокс отмечен или снят.



    const finalInputClassName = s.checkbox
        + (className ? ' ' + className : '')

    return (
        <label className={s.label}>
            <input
                id={id}
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            {children && (
                <span
                    id={id ? id + '-span' : undefined}
                    className={s.spanClassName}
                >
                    {children}
                </span>
            )}
        </label> // благодаря label нажатие на спан передастся в инпут
    )
}

export default SuperCheckbox
