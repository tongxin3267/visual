<template>
  <div class="chat">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'chat',
    data() {
      return {
        msg: 'Welcome to chat App'
      }
    }
  }
</script>
