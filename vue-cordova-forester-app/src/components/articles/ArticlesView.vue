<template>
	<v-container align-content-center>
		<v-layout class="mt-4" align-center column fill-height width="100vw">
			<v-card width="100vw" color="rgba(240,240,240,1)">
				<main-article :content-data="contentList[0]" @showModal="handleModal" />

				<h3 v-if="contentAmount >= 2" class="pt-1 pl-2">Reszta aktualności:</h3>

				<h3 v-if="contentAmount == 0" class="pt-1 pl-2">
					Aktualnie nie ma żadnych wpisów
				</h3>

				<v-article v-for="(content, index) in contentList.slice(1)" :content-data="content" :index="index" :key="content.id" @showModal="handleModal" />
			</v-card>

			<article-modal v-if="showModal" :content-data="modalContent" @closeModal="showModal = false" />
		</v-layout>

		<router-view />
	</v-container>
</template>

<script>
	import MainArticle from "./MainArticle"
	import Article from "./Article"
	import ArticleModal from "./ArticleModal"

	export default {
		components: {
			"main-article": MainArticle,
			"v-article": Article,
			"article-modal": ArticleModal
		},
		props: {
			contentList: {
				type: Array
			},
			contentAmount: {
				type: Number
			}
		},
		data() {
			return {
				showModal: false,
				modalContent: null
			}
		},
		methods: {
			handleModal(content) {
				this.modalContent = content
				this.showModal = true
			}
		},
		created() {
			document.addEventListener("backbutton", () => { this.showModal = false  })
		}
	}
</script>

<style scoped lang="scss">
	.full-width {
		width: 100vw;
		position: fixed;
		left: 0;
		top: 0;
		background: #004d34 !important;
		color: white !important;
	}

	.modal-animated-enter-active {
		animation: zoomIn 0.4s;
	}

	.modal-animated-leave-active {
		animation: zoomOut 0.4s;
	}
</style>