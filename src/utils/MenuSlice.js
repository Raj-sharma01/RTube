import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: 'Menu',
    initialState: {
        isMenuOpen: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        },
        closeMenu: (state) => {
            state.isMenuOpen = false
        },
        openMenu:(state)=>{
            state.isMenuOpen=true
        }
    }
}
)

export const {toggleMenu,closeMenu,openMenu}=MenuSlice.actions
export default MenuSlice.reducer