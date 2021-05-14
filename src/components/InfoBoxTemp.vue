<template>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h3 class="card-title">{{place.name}}</h3>
        <h4 class="card-subtitle mb-2 text-muted">{{this.capacityStatusMap[place.capacity_status]}}</h4>
        <h6 class="details" v-show="place.sub_status == 'active'">Slogan: {{place.slogan}}</h6>
        <h6 class="details" v-show="place.sub_status == 'active'">Theme: {{place.theme}}</h6>
        <h6 class="details" v-show="place.sub_status == 'active'">Specials: {{place.specials}}</h6>
        <h6 class="details" v-show="place.sub_status == 'active'">Open Hours: {{place.open_hours}}</h6>
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
            capacityStatusMap: {
                0: "Plenty of space",
                1: "Seats Available",
                2: "Very Busy",
                3: "Closed"
            }            
        }

    },

}
</script>

<style>
.exit-button {
    margin-left: auto;
    cursor: pointer;
}

.card {
    background-color: rgb(43, 43, 43);
}
</style>    