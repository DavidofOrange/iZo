<template>
<div class="map-container">
    <GmapMap 
        class="gmap-default"
        :center="this.$store.state.centerCoords"
        :zoom="this.$store.state.zoom"
        :optimzed="false"
        map-type-id="roadmap"
        :options="this.gmapOptions"
    >
        <GmapCustomMarker
            v-for="(place, index) in places"
            :key="index"
            :marker="{lat: place.latitude, lng: place.longitude}"
            @click.native="renderInfoBox(place.name)"
        >
        <InfoBoxTemp
            class="info-box"
            v-show="markers[place.name]"
            :place="place"
            @click="renderInfoBox(place.name)"
         />
         
        <img v-show="place.capacity_status == 0 && place.sub_status !== 'active'" src="../assets/open.png" />
        <img v-show="place.capacity_status == 1 && place.sub_status !== 'active'" src="../assets/seats_available.png" />
        <img v-show="place.capacity_status == 2 && place.sub_status !== 'active'" src="../assets/full.png" />
        <img v-show="place.capacity_status == 3 && place.sub_status !== 'active'" src="../assets/closed.png" />
        <img v-show="place.capacity_status == 0 && place.sub_status === 'active'" src="../assets/open.png" />
        <img v-show="place.capacity_status == 1 && place.sub_status === 'active'" src="../assets/seats_available.png" />
        <img v-show="place.capacity_status == 2 && place.sub_status === 'active'" src="../assets/full.png" />
        <img v-show="place.capacity_status == 3 && place.sub_status === 'active'" src="../assets/closed.png" />  
        </GmapCustomMarker>

    </GmapMap>        
</div>  
</template>

<script>
import GmapCustomMarker from "vue2-gmap-custom-marker"
import InfoBoxTemp from "./InfoBoxTemp"

export default {
    name: "Map",
    components: {
        GmapCustomMarker,
        InfoBoxTemp
    },
    data() {
        return {
            gmapOptions: {
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"}
                    ]
                }]
            }

        }
    },

    computed: {
        places() {
            return this.$store.state.places
        },

        markers() {
            return this.$store.state.markers
        }
    },
    methods: {
        renderInfoBox(placeName) {

            const data = {}
            if (this.$store.state.markers[placeName] == true) {
                data[placeName] = false
            } else {
                data[placeName] = true
            }

            this.$store.commit("setMarkers", data)
        }

    }
}
</script>

<style>

.gmap-default {
    width: 100%;
    height: 88vh;
    outline: none;
    z-index: 0;
}

.map-container {
    display: flex;
    position: relative;
    z-index: 0;
}

</style>
