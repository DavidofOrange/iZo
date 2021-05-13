<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <span class="navbar-brand mb-0 h1" @click.prevent="goHome">IZAKA-YA' OPEN</span>
            <span class="navbar-brand mb-0 h1">Business Account</span>
        </nav>
        <div>Business</div>
        <div class="accordion" id="accordionExample">
            <div class="card" @click="showCard(index)" v-for="(business, index) in this.$store.state.businessList" :key="index">
                <div class="card-header" :id="`heading${collapseCounter[index]}`">
                    <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="`#collapse${collapseCounter[index]}`" aria-expanded="true" :aria-controls="`collapse${collapseCounter[index]}`">
                        {{business.busName}}
                    </button>
                    </h2>
                </div>
                <div :id="`collapse${collapseCounter[index]}`" :class="[clickedCard === index ? 'collapse show' : 'collapse']" :aria-labelledby="`heading${collapseCounter[index]}`" data-parent="#accordionExample">
                    <div class="card-body">
                        <label for="customRange2" class="form-label">Current Capacity</label>
                        <div class="capacity-title">
                        <div>Open</div><div>Some Seats</div><div>Full</div><div>Closed</div>
                        </div>
                        <input type="range" class="form-range" min="0" max="3" :value="business.capacityStatus" 
                            @change.prevent="showSaveNewCapacityToggle({
                                element: collapseCounter[index], 
                                business: business})" id="customRange2" :ref="`capacity${collapseCounter[index]}`">
                    </div>
                    <a href="#" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" v-show="business.subStatus !== 'active'" @click.prevent="goPremium({busId: business.busId, subStatus: business.subStatus})">Go Premium</a>
                    <a href="#" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" v-show="business.subStatus === 'active'" @click.prevent="updateFeatures({busId: business.busId, subStatus: business.subStatus})">Update Business</a>
                </div>
            </div>
        </div>
        <a href="#" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" @click.prevent="addBusiness">Add Business</a>
        <a href="#" v-show="showSaveNewCapacity" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" @click.prevent="saveNewCapacity">Save Changes</a>
        <a href="#" v-show="showSaveNewCapacity" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true" @click.prevent="cancelCapacityChanges">Cancel</a>

    </div>
</template>

<script>
export default {
    name: "BusinessView",
    data() {
        return {
            collapseCounter: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"],
            clickedCard: 0,
            showSaveNewCapacity: false,
            changedBusinessCapacity: {}
        }
    },

    methods: {
        cancelCapacityChanges() {
            this.showSaveNewCapacity = false

        },

        showSaveNewCapacityToggle(businessObject) {
            const className = `capacity${businessObject.element}`
            const capacityNumber = this.$refs[className][0].value

            const data = {
                name: businessObject.business.name,
                capacity: capacityNumber
            }

            this.changedBusinessCapacity = data

            this.showSaveNewCapacity = true            
            
        },

        saveNewCapacity() {
            console.log(this.changedBusinessCapacity)
            //this.$store.commit("updateCapacity", this.changedBusinessCapacity)
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

.btn.btn-secondary.btn-lg.active {
    margin-top: 2%;
}

.accordion {
    margin-left: auto;
    margin-right: auto;
    width: 50%
}

</style>