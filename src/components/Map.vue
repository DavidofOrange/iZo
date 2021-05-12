<template>
<div class="map-container">
    <GmapMap 
        class="gmap-default"
        :center="this.$store.state.centerCoords"
        :zoom="this.$store.state.zoom"
        map-type-id="roadmap"
    >
        <GmapMarker
            v-for="(place, index) in places"
            :key="index"
            :position="place.coords"
            @click="toggleInfoBox(place, index)"
        />
       <!-- <InfoBox  
            class="info-box"
            v-for="(place, index) in places"
                :key="index"
                :name="place.name"
                :capacity="place.capacity"
                :position="place.coords"
                :clickable="true" @click="toggleInfoBox(place, index)
          /> --> 
    </GmapMap>
</div>  
</template>


<script>
export default {
    name: "Map",
    computed: {
        places() {
            return this.$store.state.places
        },
    },
    methods: {

    }
}
</script>

<style>

.gmap-default {
    width: 100%;
    height: 88vh;
}

.map-container {
    display: flex;
}
/* .info-box {
        width: 50px;
        height: 60px;
    } */
</style>
