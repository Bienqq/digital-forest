<template>
	<v-flex xs12 class="ma-2" v-if="content !== undefined">
		<v-card class="v-card mt-1 white--text elevation-8 gradient-light-dark animated fadeIn" @click="$emit('showModal', content)">
			<article-media :media="content.media" carousel-height="50vw" />

			<v-card-title primary-title>
				<div>
					<div class="headline">{{ content.title }}</div>
					<div class="subheading">{{ content.subTitle }}</div>
					<div class="hidden-xs-only mt-2">
						{{ descriptionPreview }}
					</div>
				</div>
			</v-card-title>
			<div class="text-xs-right pb-2 px-3">
				<v-icon class="white--text" medium>location_on</v-icon>
				<span>Warszawa</span>
			</div>
			<v-divider dark class="mx-2"></v-divider>

			<v-card-actions>
				<span class="pl-1">{{ content.publishDate }}</span>
				<v-spacer></v-spacer>
				<p @click.stop="showMore = !showMore">Czytaj więcej</p>
				<v-btn icon @click.stop="showMore = !showMore">
					<v-icon class=" white--text">{{
            showMore ? "keyboard_arrow_up" : "keyboard_arrow_down"
          }}</v-icon>
				</v-btn>
			</v-card-actions>

			<v-slide-y-transition>
				<div v-show="showMore" class="relative">
					<v-card-text class="pb-5">
						<p class="body-1">{{ content.description }}</p>
					</v-card-text>

					<v-card-text class="publisher body-2 text-xs-right">
						<v-divider dark class="pa-1"></v-divider>
						<span class="font-italic">{{ content.publisher }}</span>
					</v-card-text>
				</div>
			</v-slide-y-transition>
		</v-card>
	</v-flex>
</template>

<script>
	import ArticleMedia from "./ArticleMedia"

	export default {
		props: {
			contentData: {
				type: Object
			},
			descriptionVisible: {
				type: Boolean,
				default: false
			}
		},
		components: {
			"article-media": ArticleMedia
		},
		data() {
			return {
				showMore: this.descriptionVisible,
				content: this.contentData
			}
		},
		computed: {
			descriptionPreview() {
				if (this.content.description.length > 400) {
					return this.content.description.substring(0, 400) + "..."
				} else {
					return this.content.description
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v-card {
		background: white;
		margin: auto;
	}

	.publisher {
		position: absolute;
		bottom: 0;
	}

	.gradient-light-dark {
		background-image: linear-gradient(to top, #004d34, #08653e, #1c7d47, #32964c, #4caf50);
	}
</style>