<template>
  <div class="pdf-container">
    <div class="pdfInfo">
      <div>
        <span style="font-weight: bold;">Total de pág:</span>
        {{ numPages }}
      </div>
      <button @click="currentPage > 1 && currentPage--">Página anterior</button>
      <button @click="currentPage < numPages && currentPage++">Próxima página</button>
      <div>
        <span style="font-weight: bold;">Pág. atual:</span>
        {{ currentPage }}
      </div>
    </div>
    <div>
      <pdf src="/ebook/ebook1.pdf" :page="currentPage"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'pdfvuer'

export default {
  name: "EbookView",
  components: {
    pdf
  },
  data() {
    return {
      numPages: 0,
      currentPage: 1,
      pdfdata: undefined
    }
  },
  mounted() {
    this.getPdf()
  },
  methods: {
    getPdf() {
      this.pdfdata = pdf.createLoadingTask('/ebook/ebook1.pdf');
      this.pdfdata.then(pdfvuer => {
        console.log(pdfvuer)
        this.numPages = pdfvuer.numPages;
      })
    }
  }
}
</script>

<style scoped>
.pdf-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pdfInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: x-large;
}

.pdfInfo button {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}
</style>