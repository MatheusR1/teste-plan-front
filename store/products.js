export const state = () => ({
    products: [],
    brands: [],
})

export const getters = {
    getProducts(state) {
        return state.products
    },
    getBrands(state) {
        return state.brands
    }
}

export const mutations = {
    update(state, payload) {
        let { id } = payload

        let newProducts = state.products.map(item => {
            if (item.id === id) {
                let brand = state.brands.find(item => item.id === payload.brand_id)
                payload.brand = brand
                Object.assign(item, payload)
            }
            return item
        })

        state.products = newProducts
    },

    remove(state, payload) {
        state.products = state.products.filter(item => item.id !== payload);
    },

    create() {

    },

    setProducts(state, payload) {
        state.products = payload
    },
    setBrands(state, payload) {
        state.brands = payload
    }
}

export const actions = {
    async updateProducts({ commit }, payload) {
        try {
            let { id, ...data } = payload

            let response = await this.$axios.put(`api/products/${id}`, data)

            if (response.status === 200) {
                commit('update', payload)
                return true;
            }

        } catch (error) {
            console.error(error)
            return false;
        }
    },

    async createProduct({ commit }, payload) {
        try {

            let response = await this.$axios.post(`api/products/`, payload)

            if (response.status === 201) {
                return true;
            }

        } catch (error) {
            console.error(error)
            return false;
        }
    },

    async deleteProduct({ commit }, payload) {
        try {

            let { id } = payload

            let response = await this.$axios.delete(`api/products/${id}`)

            if (response.status === 200) {
                commit('remove', id)
                return true;
            }

        } catch (error) {
            console.error(error)
            return false;
        }
    },

    async setProductsBrands({ commit }) {
        try {
            let promisses = [
                this.$axios.get('api/products'),
                this.$axios.get('api/brands')
            ]

            let values = await Promise.all(promisses)
            commit('setProducts', values[0].data.data)
            commit('setBrands', values[1].data.data)
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }
}