import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import locationsData from "./utils/default_places"
import {gmapApi} from "vue2-google-maps"

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        google: gmapApi,
        places: [{}],
        centerCoords: { lat: 35.6806921503547 , lng: 139.75187940573224 },
        zoom: 10,
        loggedIn: false,
        showBusinessView: false,
        user: {},
        showLogin: false,
        showCreateAccount: false,
        showAddBusiness: false,
        businessList: [{}]
    },

    mutations: {

        setShowsToFalse(state) {
            state.showBusinessView = false;
            state.showAddBusiness = false;
            state.showCreateAccount = false;
            state.showLogin = false;
        },

        showAddBusiness(state) {
            state.showAddBusiness = true

        },
        setShowCreateAccountToggle(state) {
            state.showCreateAccount = true      
        },

        setLoginToggle(state) {
            state.showLogin = true

        },

        setShowBusinessView(state) {
            state.showBusinessView = true
        },

        setLoggedInToggle(state) {
            state.showLogin = false
            state.loggedIn = true
        },

        setPlaces(state, listOfPlaces) {
            state.places = listOfPlaces
        },

        setCenter(state, coords) {
            state.centerCoords = coords
            state.zoom = 15
        },

        setBusinessList(state, businessList) {
            state.businessList = businessList
        },

        setUser(state, user) {
            state.user = user
        }

    },

    actions: {
        async getPlaces({ commit }) {
            try {
                // const res = await axios.post("/", query)
                commit("setPlaces", locationsData.data.location)

            } catch (err) {
                console.error(err)
            }         
        },

        async getCoords({commit}, searchInput) {
            try {
                const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}&key=AIzaSyBN_Xp-EDhMj_SmTAppedBb4o4KFd6uj5E`)
                console.log(res)

                commit("setCenter")
            } catch (err) {
                console.error(err)
            }
        },

        async verifyLogin({ commit }) {
            try {
                //const res = await axios.post("", details)
                //console.log(res)
                const res = {
                    data: {
                        username: "business_user",
                        type: "business",
                        substatus: "",
                        businesses: [
                            {
                                name: "Business1",
                                capacity: "0",
                            },
                            {
                                name: "Business2",
                                capacity: "1"
                            },
                            {
                                name:"Business3",
                                capacity: "2"
                            }
                        ]
                    }
                }
                if (res.data.type === "business") {
                    commit("setUser", res.data)
                    commit("setBusinessList", res.data.businesses)
                    commit("setShowsToFalse")
                    commit("setLoggedInToggle")
                    commit("setShowBusinessView")
                } else {
                    commit("setLoggedInToggle")
                }
            } catch (err) {
                console.error(err)
            }
        },

        async createUser( { commit } ) {
            commit("setShowsToFalse")
            commit("setLoginToggle")
            

            // try {
            //     const res = await axios.post("", payload)
            //     if (res.data !== "Completed") {
            //         commit("setUserErrorToggle", res.data)
            //     } else {
            //         commit("setCreateAccountToggle")
            //     }
            // } catch (err) {
            //     console.error(err)
            // }

        },

        async addBusiness( { commit, state}, newBusiness ) {
            try {
                commit("setShowsToFalse")
                commit("setShowBusinessView")
                console.log(state.user)
                state.user.businesses.push(newBusiness)
            } catch (err) {
                console.error(err)
            }
        }

    }
})