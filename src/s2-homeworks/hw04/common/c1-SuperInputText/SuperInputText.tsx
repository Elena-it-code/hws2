import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        id,

        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)

        onChangeText?.(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e)

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    /*const finalSpanClassName = s.error
        + (spanClassName ? ' ' + spanClassName : '')
    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : ' ' + s.superInput)
        + (className ? ' ' + className : '') // задача на смешивание классов*/

    const finalSpanClassName = s.error
        + (spanClassName ? `${spanClassName}` + spanClassName : '')
    const finalInputClassName = s.input
        + (error ? ` ${s.errorInput}` : ` ${s.superInput}`)
        + (className ? ` ${className}` : ''); // задача на смешивание классов

    /*
    1. В первой строке переменная `finalSpanClassName` формируется путем конкатенации строки `s.error` и,
    если `spanClassName` определен, строки с пробелом, за которой следует значение `spanClassName`.
    Выражение `(spanClassName ? ` ${spanClassName}` : '')` представляет собой условное выражение, которое проверяет,
    определено ли значение `spanClassName`. Если оно определено, мы добавляем его в строку с пробелом,
    если нет - добавляем пустую строку
    2. Во второй строке переменная `finalInputClassName` формируется аналогично. Первым шагом добавляется
    значение `s.input`. Затем в зависимости от условия `error` через тернарный оператор добавляется
    `s.errorInput` или `s.superInput`, опять же, с пробелом перед каждым из этих классов. Затем, если
    определено значение `className`, оно добавляется с пробелом на конце.<br/><br/>Итак, в обоих случаях
    мы формируем строки классов с использованием тернарного оператора для условного добавления классов и
    пробелов между ними.
    */

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <span
                id={id ? id + '-span' : undefined}
                className={finalSpanClassName}
            >
                {error}
            </span>
        </div>
    )
}

export default SuperInputText
