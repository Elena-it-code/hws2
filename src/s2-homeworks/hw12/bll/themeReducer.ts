const initState = {
    themeId: 1,
}

// Создаём тип на основе initState
export type ThemeState = typeof initState

export const themeReducer = (state: ThemeState = initState, action: ChangeThemeIdActionType): ThemeState => {
    switch (action.type) {
        // дописать
        case "SET_THEME_ID" : {
            return {...state, themeId: action.id}
        }

        default:
            return state
    }
}

export const changeThemeId = (id: number) => ({type: 'SET_THEME_ID', id} as const)

// Action type
export type ChangeThemeIdActionType = ReturnType<typeof changeThemeId>
