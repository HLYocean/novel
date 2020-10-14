import {
    Toast,
    Search,
    CountDown,
    DropdownMenu,
    DropdownItem,
    Slider,
    Swipe,
    SwipeItem,
    Lazyload,
    Tab, Tabs,Sidebar, SidebarItem
} from 'vant'



const vants = [Toast, Search, CountDown, DropdownMenu,
    DropdownItem, Slider, Swipe, SwipeItem, Lazyload,Tab, Tabs,Sidebar, SidebarItem

]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    },


}