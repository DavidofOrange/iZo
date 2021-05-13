<template>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h3 class="card-title">{{place.name}}</h3>
        <h4 class="card-subtitle mb-2 text-muted">{{capacity}}</h4>
        <h6 class="details" v-show="place.subStatus == 'active'">Slogan: {{place.slogan}}</h6>
        <h6 class="details" v-show="place.subStatus == 'active'">Theme: {{place.theme}}</h6>
        <h6 class="details" v-show="place.subStatus == 'active'">Specials: {{place.specials}}</h6>
        <h6 class="details" v-show="place.subStatus == 'active'">Open Hours: {{place.openHours}}</h6>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
    </div>
</template>

<script>
export default {
    name: "InfoBoxTemp",
    props: {
        place: Object,
    },
    data() {
        return {
            capacity: "",            
        }

    },

    beforeMount() {
        this.seatStatusParser()


    },   

    methods: {
        seatStatusParser() {
            switch(this.place.capacity) {
                case 0:
                    this.capacity = "Plenty of"
                    break;
                case 1: 
                    this.capacity = "Seats Available"
                    break;
                case 2: 
                    this.capacity = "Very Busy"
                    break;
                case 3:
                    this.capacity = "Closed"
                    break;
            }

        },
    }

}
</script>

<style>
.exit-button {
    margin-left: auto;
    cursor: pointer;
}


.details {
    margin-left: -60%
}

.card-body {
    z-index: 20;
}
</style>    