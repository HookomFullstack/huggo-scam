import { Checkbox } from "../helpers/Checkbox";
import options from '../../options.json';

export const CheckBoxUtil = () =>  {
    return (
        <Checkbox options={options.tableFiltersOptions} />
    )
}
