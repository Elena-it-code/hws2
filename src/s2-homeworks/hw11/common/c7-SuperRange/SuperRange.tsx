import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера // пишет студент
                // Стили для активной полосы (трека)
                color: 'rgba(1, 203, 34, 1)',

                // Стили для неактивной полосы (трека)
                '& .MuiSlider-track': {
                    backgroundColor: 'gba(1, 203, 34, 1)',
                },

                // Стили для ползунка (thumb)
                '& .MuiSlider-thumb': {
                    backgroundColor: 'rgba(1, 203, 34, 1)',
                    border: '2px solid rgba(1, 203, 34, 1)',
                },

                // Стили для rail (неактивная полоса)
                '& .MuiSlider-rail': {
                    backgroundColor: 'rgba(139, 139, 139, 1)',
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
