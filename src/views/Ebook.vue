<template>
  <div class="main-container">
    <h1>E-book Manual do Hamburgueiro</h1>
    <EbookView />
  </div>
</template>

<script>
import EbookView from "../components/EbookView.vue";

export default {
  name: "Ebook",
  components: {
    EbookView
  }
}
</script>

<style scoped>
</style>