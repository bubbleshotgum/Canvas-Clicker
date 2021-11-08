<template>
	<p
		v-for="p in paragraphs"
		:key="p.id"
	>{{ p.content }}</p>
</template>

<script>
export default {
	props: {
		paragraphs: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
p {
	-webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
</style>
