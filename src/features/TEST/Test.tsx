import {FC} from 'react';
import SuperButton from '../../common/components/SuperButton/SuperButton';
import SuperCheckbox from '../../common/components/SuperCheckbox/SuperCheckbox';
import SuperDebouncedInput from '../../common/components/SuperDebouncedInput/SuperDebouncedInput';
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan';
import SuperInputText from '../../common/components/SuperInputText/SuperInputText';
import SuperRadio from '../../common/components/SuperRadio/SuperRadio';
import SuperRange from '../../common/components/SuperRange/SuperRange';
import SuperSelect from '../../common/components/SuperSelect/SuperSelect';
import s from './Test.module.css'

const test=[
    {id:1, value: 'one'},
    {id:2, value: 'two'},
    {id:3, value: 'three'},
    {id:4, value: 'four'}
]
export const Test: FC = () => {
    return (
        <div className={s.superContainer}>
            <div className={s.container}>
                Buttons
                <SuperButton disabled>
                    disabled
                </SuperButton>
                <SuperButton>
                    default
                </SuperButton>
                <SuperButton xType="red">
                    red
                </SuperButton>
                <SuperButton xType="secondary">
                    secondary
                </SuperButton>
            </div>
            <div className={s.container}>
                Checkbox
                <SuperCheckbox>
                    click here
                </SuperCheckbox>
            </div>
            <div className={s.container}>
                SuperDebouncedInput
                <SuperDebouncedInput/>

            </div>
            <div className={s.container}>
                EditableSpan
                <SuperEditableSpan value='write here'/>
            </div>
            <div className={s.container}>
                Input
                <SuperInputText/>
            </div>
            <div className={s.container}>
                Radio
                <SuperRadio options={test} value={1}/>
            </div>
            <div className={s.container}>
                Range
                <SuperRange/>
            </div>
            <div className={s.container}>
                Select
                <SuperSelect  options={test} value={2}/>
            </div>

        </div>
    );
};
