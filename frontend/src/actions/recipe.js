import store from "../index"

export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"
export const CLEAR_RECIPE = "CLEAR_RECIPE"

const fetchingRecipe = () => ({
    type: GET_RECIPE,
})

const clearingRecipe = () => ({
    type: CLEAR_RECIPE,
})

const fetchedRecipe = (payload) => ({
    type: RECEIVE_RECIPE,
    payload,
})

const failedRecipe = (payload) => ({
    type: FAIL_RECIPE,
    payload,
})

export const executeRecipe = async(id) => {
    const response = await fetch(`/api/recipe/${id}`, {
        method: "GET",
    })

    const searchResults = await response.json()
    return searchResults
}

export const findRecipe = (id) => {
    return (dispatch) => {
        dispatch(fetchingRecipe())
        return executeRecipe(id)
            .then((res) => {
                dispatch(fetchedRecipe(res))
            })
            .catch((err) => dispatch(failedRecipe(err)))
    }


}

export const clearRecipe = () => {
    return (dispatch) => {
        dispatch(clearingRecipe())
        return;
    }
}