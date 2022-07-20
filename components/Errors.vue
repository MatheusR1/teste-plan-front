<template>
  <div>
    <div v-for="(error, index) in errors" :key="index" >
        <v-alert
            dense
            outlined
            type="error"
        >
        {{error}}
        </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    errors : []
  }
}
</script>
