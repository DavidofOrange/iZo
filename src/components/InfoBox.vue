<template>
        <div>
         
        </div>
</template>

<script>
    export default {
        name: InfoBox,
        props: {
            name: String,
            capacity: String,
            position: Object
        },
        data: () => {
            return {
                place: this.$store.state.places,
                infoContent: '',
                infoBoxPos: null,
                infoBoxOpen: false,
                currentMidx: null,
                //optional: offset infowindow so it visually sits nicely on top of our marker
                infoOptions: {
                    pixelOffset: {
                    width: 0,
                    height: -35
                    }
                },
                marker: [{
                    position: {
                    lat: this.$store.state.places,
                    lng: this.$store.state.places
                    },
                    infoText: 'Marker'
                }],
            }
        },
         methods: {
          toggleInfoBox: function(marker, idx) {
            this.infoBoxPos = marker.position;
            this.infoContent = marker.infoText;

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoBoxOpen = !this.infoBoxOpen;
            }
            //if different marker set infoBox to open and reset current marker index
            else {
              this.infoBoxOpen = true;
              this.currentMidx = idx;

            }
          }
         }
    }
</script>

<style>
  
</style>