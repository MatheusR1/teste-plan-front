<template>
    <v-row justify="center">
        <v-dialog v-model="showModal" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Produto</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="formUpdateProduct">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="Nome*" 
                                        v-model="form.name" 
                                        :rules="rules.name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea 
                                        outlined 
                                        label="descrição" 
                                        v-model="form.description">
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-select 
                                        :items="brands" 
                                        :item-text="'name'" 
                                        :item-value="'id'" 
                                        label="Marca*"
                                        name="brand" 
                                        v-model="defaultSelected" 
                                        required>
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                    <small>* indica que é obrigatório</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="blue darken-1" 
                        text 
                        @click="showModal = false">
                        Fechar
                    </v-btn>
                    <v-btn 
                        color="blue darken-1" 
                        text 
                        @click="updateProduct()">
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

import {mapActions} from 'vuex';

export default {
    props: {
        dialog: false,
        product: '',
        brands: [],
    },
    data: () => ({
        showModal: false,
        defaultSelected: '',
        form: {
            name: '',
            description: '',
            brand_id: '',
        },
        rules: {
            name: [(v) => !!v || "Nome é obrigatório"],
            select : [(v) => !!v || "descricao é obrigatório"]
        }
    }),
    watch: {
        dialog(val, old) {
            this.showModal = val
        },
        showModal(val, old) {
            this.$emit('changeDialog', val)
        },
        product(val) {
            this.defaultSelected = { 'id': val.brand.id, 'name': val.brand.name }
            if (this.product !== '') {
                this.form.name = this.product.name;
                this.form.description = this.product.description;
            }
        }
    },
    methods: {
        ...mapActions('products', ['updateProducts']),

        updateProduct() {
            this.$refs.formUpdateProduct.validate()

            let data = {
                ...this.form, 'brand_id': this.defaultSelected.id ?
                    this.defaultSelected.id :
                    this.defaultSelected
            }
        
            this.updateStore(data)
        },

        async updateStore(data) {
            let id = this.product.id
            let payload = { id, ...data }
            let response = await this.updateProducts(payload)

            response ? this.$toast.success('Eletronico atualizado com sucesso') : 
            this.$toast.error('Erro ao atualizar produto')
        }
    }
}
</script>