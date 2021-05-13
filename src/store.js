import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
require('dotenv').config()
import locationsData from "./utils/default_places"
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
        showSubscribeView: false,
        showPaymentView: false,
        businessList: [],
        bussinessId: "",
        subscription: {},
        markers: {},
        stripePublishableKey: process.env.STRIPE_PUBLISH_KEY // How to use env vars in Vue 2?
    },

    mutations: {
        resetMarkers(state, name) {
            state.markers[name] = false
        },

        setMarkers(state, markers) {
            state.markers = markers
        },

        setShowsToFalse(state) {
            state.showBusinessView = false;
            state.showAddBusiness = false;
            state.showCreateAccount = false;
            state.showLogin = false;
            state.showSubscribeView = false;
            state.showPaymentView = false;
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
        },

        setShowSubscribeView(state) {
            state.showSubscribeView = true
        },

        setBusinessId(state, busId) {
            state.bussinessId = busId
        },

        setSubscription(state, subscription) {
            state.subscription = subscription
        },

        setShowPaymentView(state) {
            state.showPaymentView = true;
        }

    },

    actions: {
        async getPlaces({ commit, state }) {
            try {
                // const res = await axios.get(`/api/businesses/?lat=${state.centerCoords.lat}&lng=${state.centerCoords.lng}`)

                commit("setPlaces", locationsData.data.location)

            } catch (err) {
                console.error(err)
            }         
        },

        async getCoords({commit}, searchInput) {
            try {
                const data = await axios.get(`http://api.positionstack.com/v1/forward?access_key=398eab52cb4a639899b5f91cb6bed03a&query=${searchInput}`)

                const coords = {
                    lat: data.data.data[0].latitude,
                    lng: data.data.data[0].longitude
                }

                commit("setCenter", coords)
            } catch (err) {
                console.error(err)
            }
        },

        async verifyLogin({ commit }, loginInput) {
            try {
                // login in user
                const res = await axios.post('/api/users/login', loginInput)

                const user = res.data.data.user
                // user object:
                // {
                    // email: "yosh@me.com"
                    // stripeId: "cus_JTDCuGfSWbKzyg"
                    // userId: "3325b376-8853-4e6a-a876-0334a4e04ded"
                    // userType: "Business"
                    // username: "yosh"
                // }


                // initialize business array from response data
                const businesses = res.data.data.businesses
                
                // businesses array: 
                // [
                    // {
                        // address1: "港区六本木6丁目12-1"
                        // address2: "ヒルズ けやき坂通り レジデンスA棟"
                        // busCreatedAt: "2021-05-12T12:06:48.208Z"
                        // busId: "7b734653-573e-4c2b-b97e-d72577692264"
                        // busName: "B BAR ROPPONGI"
                        // capacityStatus: 3
                        // lat: 35.65905
                        // lng: 139.72874
                        // openHours: null STRING
                        // postalCode: "106-0032"
                        // prefecture: "東京都"
                        // slogan: null STRING
                        // specials: null STRING
                        // subStatus: "active" or "expired" or "" // if active, show slogan, theme, specials, and openHours
                        // theme: null STRING
                    // },
                // ]
                if (user.userType === "Business") {
                    commit("setUser", user)
                    if (businesses[0].busId !== null) {
                        commit("setBusinessList", businesses)
                    }
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

        async createUser( { commit }, signupInput) {
            // create user
            const userRes = await axios.post('/api/users/sign-up', {
                email: signupInput.email,
                username: signupInput.username,
                password: signupInput.password,
                userType: signupInput.accountType
            })
            // create object for Stripe customer creation request body ({id: "id", email: "email"})
            const customerPostObj = {id: userRes.data.id, email: userRes.data.email}
            // create Stripe customer
            await axios.post('/api/stripe/create-customer', customerPostObj)

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
                // add new bussiness
                const res = await axios.post('/api/businesses', newBusiness)
                // ensure to capture postgreSQL businessId and,
                // include it in the newBusiness obj before pushing to state
                newBusiness.busId = res.data.id
                state.businessList.push(newBusiness)
                commit("setShowsToFalse")
                commit("setShowBusinessView")
            } catch (err) {
                console.error(err)
            }
        },

        setBussinessId({commit}, busId) {
            commit("setBusinessId", busId)
        },

        async createSubscription({ state, commit }) {
            const res = await axios.post('/api/stripe/create-subscription', {
                stripeId: state.user.stripeId,
                userId: state.user.userId,
                busId: state.bussinessId
            })

            const subscription = {
                stripeSubId: res.data.stripeSubId,
                stripeClientSecret: res.data.stripeClientSecret
            }

            commit("setSubscription", subscription)
        }

    }
})