<template>
  <v-form ref="form" v-model="valid" lazy-validation >
    <v-text-field v-model="form.name" :rules="rules.name" label="Nome" required></v-text-field>

    <v-text-field v-model="form.description" :rules="rules.description" label="Descrição" required></v-text-field>

    <v-select 
      :items="volts" 
      :rules="rules.voltage"
      v-model="form.voltage"
      label="Voltagem*" 
      name="volts"
      required />

    <v-select 
      :items="brands" 
      :item-text="'name'" 
      :item-value="'id'" 
      :rules="rules.brand_id"
      v-model="form.brand_id"
      label="Marca*" 
      name="brand"
      required />

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submitForm()">
      Criar
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Limpar
    </v-btn>

  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'createPage',
  data: () => ({
    valid: false,
    volts: ['110', '2020'],
    form: {
      name: '',
      description: '',
      brand_id: '',
      voltage: ''
    },
    rules: {
      name: [v => !!v || 'Nome é Obrigatório'],
      description: [v => !!v || 'Descrição é obrigatória'],
      brand_id: [v => !!v || 'Marca deve ser selecionada'],
      voltage: [v => !!v || 'Voltagem deve ser selecionada'],
    },
    checkbox: false,
  }),
  computed: mapState('products', ['brands']),
  async beforeMount() {
    if (this.brands.length === 0){
      await this.setProductsBrands();
    }
  },
  methods: {
    ...mapActions('products', ['createProduct', 'setProductsBrands']),

    async submitForm() {

      if (! this.$refs.form.validate()){
        return;
      }

      let response = await this.createProduct(this.form)

      if (!response) return this.$toast.error('Não foi possível Criar o Eletronico')

      return this.$toast.success('Eletronico criado com sucesso')

    },
    reset() {
      this.$refs.form.reset()
    }
  },
}
</script>
