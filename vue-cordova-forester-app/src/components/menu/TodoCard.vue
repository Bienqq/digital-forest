<template>
  <b-card tag="article" class="text-center m-2 card-element small" bg-variant="light" border-variant="secondary" no-body>
    <ul class="list-inline mb-0 mr-2 pb-0 ml-auto">
      <li class="list-inline-item">X</li>
      <li class="list-inline-item">X</li>
      <li class="list-inline-item">X</li>
    </ul>
    <h6 class="p-0 m-0">Drzewo do wyciencia  </h6>
    <img src="@/assets/img/TestCardImg1.jpg" alt="Image" class="mt-1 mb-1 ml-auto mr-auto card-background-image">
        <b-card-body class="p-0 pl-1 pr-1 small">
                Jakis tekst jak za będzie za dlugi to bedzie mozna rozwinanc  ...
        </b-card-body>
  </b-card>
</template>

<script>


export default {
  name: "TodoCard",

};
</script>

<style lang="scss" scoped>
.card-background-image {
  object-fit: cover;
  object-position: center;
  display: block;
  width: 140px;
  height: 80px;
  border-radius: 3%;
}


.card-element {
  transition: all 0.3s ease-in-out;
  height: 170px;
  width: 170px;

  &:hover {
    box-shadow: 0px 0px 18px 9px rgba(187, 187, 187, 1);
  }
}
</style>
