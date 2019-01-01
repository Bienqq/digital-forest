<template>
  <div>
    <todo-card></todo-card>
  </div>

</template>

<script>
import TodoCard from "./TodoCard";


export default {
  name: "Menu",
  components: {
    "todo-card": TodoCard
  }
};
</script>

<style>
</style>
