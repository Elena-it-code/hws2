import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
    className,
    onChange,
    onChangeOption,
    ...restProps
}) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
              <option
                  id={'hw7-option-' + o.id}
                  className={s.option}
                  key={o.id}
                  value={o.id}
              >
                  {o.value}
              </option>
          ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        const actualSelectValue = e.currentTarget.value; // достаем значение value, текущее то, что введено и записано в select "с задней стороны", но пока не отображается для UI
        if (onChangeOption) {
            onChangeOption(actualSelectValue)
        } // делают студенты +++

    }

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect


/*разберем каждую строку кода:

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        const actualValue = e.currentTarget.value;
        if (onChangeOption) { //
            onChangeOption(actualValue)
        } // делают студенты +++
    }

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
**1.** Здесь объявляется константа `onChangeCallback`, которая является функцией. Эта функция принимает один аргумент `e`,
который имеет тип `ChangeEvent<HTMLSelectElement>`. Это событие изменения для элемента `<select>`.

    const actualValue = e.currentTarget.value;
**2.** В этой строке мы извлекаем текущее значение из элемента `<select>`, который вызвал событие. `e.currentTarget`
ссылается на элемент, который вызвал событие, а `value` - это текущее значение этого элемента.

    if (onChangeOption) {
**3.** Здесь проверяется, существует ли функция `onChangeOption`. Если она определена, то условие будет истинным.

        onChangeOption(actualValue)
**4.** Если условие истинно, вызывается функция `onChangeOption` с аргументом `actualValue`, который содержит
текущее значение элемента `<select>`.

    Таким образом, эта функция обрабатывает событие изменения для элемента `<select>`, извлекает текущее значение и
    передает его в функцию `onChangeOption`, если она определена.*/
