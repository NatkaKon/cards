import React from 'react'
import Slider, {SliderProps} from '@mui/material/Slider'


const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера // пишет студент
                color: '#00CC22',

                '& .MuiSlider-thumb': {
                    height: 18,
                    width: 18,
                    border: 'solid 5px white',
                    outline: 'solid 2px #00CC22',

                },
                '& .MuiSlider-rail': {
                    color: '#8B8B8B',
                },
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
