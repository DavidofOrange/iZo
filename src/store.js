import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
// import locationsData from "./utils/default_places"
import {gmapApi} from "vue2-google-maps"

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        google: gmapApi,
        places: [{}],
        centerCoords: { lat: 35.6806921503547 , lng: 139.75187940573224 },
        zoom: 15,
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
        },

        setBusinessList(state, businessList) {
            state.businessList = businessList
        },

        setUser(state, user) {
            state.user = user
        },

        setZoom(state, zoom) {
            state.zoom = zoom
        }

    },

    actions: {
        async getPlaces({ state }) {
            try {
                const res = await axios.get(`/api/businesses/?lat=${state.centerCoords.lat}&lng=${state.centerCoords.lng}`)
                console.log(res.data);
                // commit("setPlaces", res.data)

            } catch (err) {
                console.error(err)
            }         
        },

        async getCoords({commit}, searchInput) {
            try {
                const data = await axios.get(`http://api.positionstack.com/v1/forward?access_key=398eab52cb4a639899b5f91cb6bed03a&query=${searchInput}`)
                console.log(data.data.data)

                const coords = {
                    lat: data.data.data[0].latitude,
                    lng: data.data.data[0].longitude
                }

                commit("setCenter", coords)
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