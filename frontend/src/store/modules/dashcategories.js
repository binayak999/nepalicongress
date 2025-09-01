const state = {
    dashcategories: {
      
        desserts: [
            {
                sn: "1",
                name: "Post",
                content: "Add all the post.",
            },
            {
                sn: "2",
                name: "News",
                content: "Add all the post.",
            },
            {
                sn: "3",
                name: "Post",
                content: "Add all the post.",
            },
            {
                sn: "4",
                name: "Post",
                content: "Add all the post.",
            },
        ],
    }

};

const getters = {
    allDashCategories: (state) => Object.assign(state.dashcategories)
};


const actions = {
};

const mutations = {
    menuMutation: (state, category) => (state.dashcategories = category)
};

export default {
    state,
    getters,
    actions,
    mutations,
};
