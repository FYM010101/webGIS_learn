import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state = {

    _defaultView: '',       //默认地图View
    _defaultMapTreeVisible: false,  //目录树默认不显示
    _defaultXZQHComponentVisible: false,
};

const getters = {

    _getDefaultView() {
        return state._defaultView;
    },
    _getDefaultMapTreeVisible() {
        return state._defaultMapTreeVisible;
    },
    _getDefaultXZQHComponentVisible() {
        return state._defaultXZQHComponentVisible;
    },
};

const mutations = {

    _setDefaultView(state, value) {
        state._defaultView = value;
    },
    _setDefaultMapTreeVisible(state, value) {
        state._defaultMapTreeVisible = value;
    },
    _setDefaultXZQHComponentVisible(state, value) {
        state._defaultXZQHComponentVisible = value;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;

