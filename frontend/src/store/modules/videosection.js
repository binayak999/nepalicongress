const state = {
    menus: [
        {
            title: "Dashboard",
            path:'/',
        },
        {
            title: "Posts",
            open:false,
            path:undefined,
            submenu: [
                { title: "Posts List", path: "/" },
                { title: "Add Post", path: "/" },
            ],
        },
        {
            title: "Votings",
            open:false,
            path:undefined,
            submenu: [
                { title: "Voting List", path: "/" },
                { title: "Add New Vote", path: "/" },
            ],
        },
        {
            title: "Polls",
            open:false,
            path:undefined,
            submenu: [
                { title: "Poll List", path: "/" },
                { title: "Add New Poll", path: "/" },
            ],
        },
        {
            title: "Events",
            open:false,
            path:undefined,
            submenu: [
                { title: "Events List", path: "/" },
                { title: "Add Event", path: "/" },
            ],
        },
        {
            title: "Report Box",
            open:false,
            path:undefined,
            submenu: [
                { title: "Report List", path: "/" },
                { title: "Add New Report", path: "/" },
            ],
        },
        {
            title: "USers",
            open:false,
            path:undefined,
            submenu: [
                { title: "Users List", path: "/" },
                { title: "Memebers List", path: "/" },
                { title: "Add New", path: "/" },
            ],
        },
        {
            title: "Feedbacks",
            path:'/',
        },
    ],

};

const getters = {
    allMenu: (state) => Object.assign(state.menus)
};


const actions = {
};

const mutations = {
    menuMutation: (state, menu) => (state.menus = menu)
};

export default {
    state,
    getters,
    actions,
    mutations,
};
