<template>
	<div v-if="media != undefined && media.length != 0" @click.stop="mediaClicked()" @dblclick.stop="mediaDoubleClicked()">

		<v-img v-if="media.length == 1 && media[0].type == 'image'" :src="media[0].path" :alt="media[0].name" :max-height="imgHeight" :contain="imgContain"></v-img>

		<vue-plyr v-else-if="media[0].type == 'video'" ref="plyr" :options="plyrOptions" :emit="['enterfullscreen', 'exitfullscreen']" @exitfullscreen="handleExitFullScreen()" @enterfullscreen="handleEnterFullScreen()">
			<video :poster="media[0].posterPath" size="720">
				<source :src="media[0].path" type="video/mp4">
			</video>
		</vue-plyr>

		<v-carousel v-else hide-delimiters hide-controls :height="carouselHeight">
			<v-carousel-item v-for="(media, index) in media" :key="index" :src="media.path" @click.stop="carouselItemClicked(index)"></v-carousel-item>
		</v-carousel>

		<v-dialog v-model="showFullScreenImage" hide-overlay fullscreen full-width lazy>
			<v-img :src="fullScreenImageSrc"></v-img>
		</v-dialog>

	</div>
</template>

<script>
	import { VuePlyr } from "vue-plyr"
	import "vue-plyr/dist/vue-plyr.css"

	export default {
		props: {
			media: {
				type: Array
			},
			imgHeight: {
				type: String,
			},
			imgContain: {
				type: Boolean,
				default: false,
			},
			carouselHeight: {
				type: String,
			}
		},
		components: {
			"vue-plyr": VuePlyr,
		},
		data() {
			return {
				showFullScreenImage: false,
				fullScreenImageSrc: null,
				plyrOptions: {
					controls: [
						"play",
						"progress",
						"current-time",
						"mute",
						"volume",
						"fullscreen",
					],
				},
			}
		},
		methods: {
			handleExitFullScreen() {
				window.screen.orientation.lock("portrait")
			},
			handleEnterFullScreen() {
				window.screen.orientation.unlock()
			},
			mediaClicked() {
				if (this.media[0].type === "video") {
					const player = this.$refs.plyr.player
					if (player.playing == true) {
						player.pause()
					} else {
						player.play()
					}
				}
				if (this.media[0].type === "image") {
					this.fullScreenImageSrc = this.media[0].path
					this.showFullScreenImage = true
				}
			},
			mediaDoubleClicked() {
				if (this.media[0].type === "video") {
					const player = this.$refs.plyr.player
					if (player.fullscreen.active == false) {
						player.fullscreen.enter()
					} else {
						player.fullscreen.exit()
					}
				}
			},
			carouselItemClicked(itemIndex) {
				console.log(itemIndex)
			}

		},
	}
</script>

<style lang="scss">
	// just copied from plyr source css to change some css properties
	.plyr {
		-moz-osx-font-smoothing: auto;
		-webkit-font-smoothing: subpixel-antialiased;
		direction: ltr;
		font-family: Avenir, "Avenir Next", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
		font-variant-numeric: tabular-nums;
		font-weight: 500;
		line-height: 1.7;
		max-width: 100%;
		min-width: 110px;
		position: relative;
		text-shadow: none;
		-webkit-transition: -webkit-box-shadow .3s ease;
		transition: -webkit-box-shadow .3s ease;
		transition: box-shadow .3s ease;
		transition: box-shadow .3s ease, -webkit-box-shadow .3s ease;
	}

	// same as above
	.plyr__control {
		background: 0 0;
		border: 0;
		border-radius: 3px;
		color: inherit;
		cursor: pointer;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		overflow: visible;
		padding: 0px;
		position: relative;
		-webkit-transition: all .3s ease;
		transition: all .3s ease;
	}
</style>