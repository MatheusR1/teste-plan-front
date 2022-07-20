<template>
  <div>
    <v-container>
      <v-row>
        <h1>Eletronicos</h1>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" v-show="products.length > 0" v-for="product in products" :key="product.id">
          <div class="d-flex flex-row-reverse">
            <v-btn class="mx-2" fab dark small color="primary" @click="edit(product)">
              <v-icon dark>
                mdi-pencil-outline
              </v-icon>
            </v-btn>

            <v-btn class="mx-2" fab dark small color="red" @click="removeProduct(product)">
              <v-icon dark>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
          <div class="d-flex justify-center ma-4">
            <v-card width="350">
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.brand.name }}</v-card-subtitle>
              <v-card-text>
                {{ product.description }}
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- modals -->
    <modal-edit :dialog="openModal" :brands="brands" :product="productEdit" @changeDialog="openModal = $event" />

  </div>
</template>

<script>
import ModalEdit from '../components/ModalEdit.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    ModalEdit
  },
  data() {
    return {
      openModal: false,
      productEdit: '',
    }
  },
  async mounted() {
    let reponse = await this.setProductsBrands()

    if (!reponse) this.$toast.error('Não foi possível carregar os eletronicos, verifique sua conexao')

  },
  computed: mapState('products', ['products', 'brands']),
  methods: {
    ...mapActions('products', ['setProductsBrands', 'deleteProduct']),

    edit(product) {
      this.openModal = true
      this.productEdit = product
    },
    async removeProduct(product) {

      if (confirm('Deseja mesmo delete o eletronicos ?')) {

        let response = await this.deleteProduct(product)

        if (!response) this.$toast.error('Não foi possível deletar o eletronico');

        this.$toast.success('Producto deletetado com sucesso');
      }
    }
  },
}
</script>
