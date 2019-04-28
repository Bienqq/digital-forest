<template>
	<v-dialog v-model="dialog" width="600px">
		<v-card>
			<v-card-title>
				<span class="headline">Warunki korzystania</span>
			</v-card-title>
			<v-card-text>Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra
				urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus
				velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue
				in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum
				varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices
				nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc
				tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor.
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" flat="flat" @click="$emit('closeDialog')">Zamknij</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		data() {
			return {
				dialog: false
			}
		},
		mounted() {
			this.dialog = true
		}
	}
</script>

<style scoped lang="scss">
</style>