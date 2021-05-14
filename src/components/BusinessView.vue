<template>
    <div>
        <nav class="navbar">
            <div class="empty-div" @click="goHome">222222222</div>
            <span class="navbar-brand h1">Business Account</span>
        </nav>
        <div id="biz">Businesses</div>
        <div class="accordion" id="accordionExample">
            <div class="card" @click="showCard(index)" v-for="(business, index) in this.$store.state.businessList" :key="index">
                <div class="card-header" :id="`heading${collapseCounter[index]}`">
                    <h2 class="mb-0">
                    <button class="bus-btn" type="button" data-toggle="collapse" :data-target="`#collapse${collapseCounter[index]}`" aria-expanded="true" :aria-controls="`collapse${collapseCounter[index]}`">
                        {{business.busName}}
                    </button>
                    </h2>
                </div>
                <div :id="`collapse${collapseCounter[index]}`" class="collapse-div" :class="[clickedCard === index ? 'collapse show' : 'collapse']" :aria-labelledby="`heading${collapseCounter[index]}`" data-parent="#accordionExample">
                    <div class="card-body">
                        <label for="customRange2" class="form-label">Current Capacity</label>
                        <div class="capacity-title">
                        <div>Free</div><div>Moderate</div><div>Busy</div><div>Closed</div>
                        </div>
                        <input type="range" class="form-range" min="0" max="3" :value="business.capacityStatus" 
                            @change.prevent="updateCapacity({
                                element: collapseCounter[index], 
                                busId: business.busId})" id="customRange2" :ref="`capacity${collapseCounter[index]}`">
                    </div>
                    <a href="#" class="go-prem-btn" role="button" aria-pressed="true" v-show="business.subStatus !== 'active'" @click.prevent="goPremium({busId: business.busId, busName: business.busName, subStatus: business.subStatus})">Go Premium</a>
                    <a href="#" class="bus-info-btn" role="button" aria-pressed="true" v-show="business.subStatus === 'active'" @click.prevent="updateFeatures({busId: business.busId, busName: business.busName, subStatus: business.subStatus})">Update Business Info</a>
                </div>
            </div>
        </div>
        <a href="#" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" @click.prevent="addBusiness">Add Business</a>

    </div>
</template>

<script>
export default {
    name: "BusinessView",
    data() {
        return {
            collapseCounter: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"],
            clickedCard: 0,
        }
    },

    methods: {

        updateCapacity(businessObject) {
            const className = `capacity${businessObject.element}`
            const capacityNumber = parseInt(this.$refs[className][0].value)

            const data = {
                id: businessObject.busId,
                capacity_status: capacityNumber
            }

            this.$store.dispatch("updateCapacity", data)
        },

        showCard(clickedCard) {
            this.clickedCard = clickedCard
        },

        addBusiness() {
            this.$store.commit("setShowsToFalse")
            this.$store.commit("showAddBusiness")
        },

        goHome() {
            this.$store.commit("setShowsToFalse")
        },

        goPremium(currBus) {
            this.$store.dispatch("setCurrBusiness", currBus)
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowSubscribeView")
        },

        updateFeatures(currBus) {
            this.$store.dispatch("setCurrBusiness", currBus)
            this.$store.commit("setShowsToFalse")
            this.$store.commit("setShowFeaturesView")
        }
    }

}
</script>

<style>

.capacity-title {
    display: flex;
    justify-content: space-between;
}
a {
    text-decoration: none;
}
.go-prem-btn {
    background-color: rgb(255, 255, 255);
}
.form-group {}
.bus-btn {
    background-color: transparent;
    border:none;    
    color: white;
    padding: 10px;
    font-size: 1.2rem;
}
.btn.btn-secondary.btn-lg.active {
    margin-top: 2%;
}

.bus-info-btn {
    height:fit-content;
    font-size:16px;
    padding: 1vh;
    padding-top: 0.1vh;
    padding-bottom: 0.1vh;
    color: rgb(255, 255, 255);
    background-color: tomato;
    border-style: solid;
    border-color: rgb(68, 68, 68);
}
#biz {
    margin-top: 20px;
    color: white;
    font-size: larger;
}
.accordion {
    margin-left: auto;
    margin-right: auto;
    width: 50vw
}
.mb-0 {
    color: white;
    background-color: rgb(255, 59, 59);
    border-radius: 10px;
    height: 50px;
    text-align: center;
    margin-top: auto;
}
.card-body {
    color: white;
}
@media screen and (max-width: 480px) {
    .accordion {
        width: 95vw;
    }

}



</style>