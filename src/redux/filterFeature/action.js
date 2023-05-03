import { APPLY_FILTER } from "./actionTypes"

export const applyFilter = (filter) => {
    return {
        type: APPLY_FILTER,
        payload: filter
    }
};
