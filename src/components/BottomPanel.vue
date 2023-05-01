<script setup>
const props = defineProps({
  address: String,
  panelMode: String,
});
</script>

<template>
  <div :class="'store-create-block ' + panelMode" v-if="panelMode">
    <div v-if="address">
      <p class="address-title">Адрес:</p>
      <p class="address-text">
        {{ address }}
      </p>
      <button>Добавить предприятие</button>
    </div>
    <div v-else class="loader">
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.store-create-block {
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 34px 34px 0 0;
  padding: 30px;
  z-index: 10;
  display: none;
}
.store-create-block.small {
  height: 22vh;
  animation: slideInSmall 0.2s ease;
  display: block;
}
.store-create-block.normal {
  height: 30vh;
  display: block;
}
.store-create-block.big {
  height: 60vh;
  display: block;
}
.address-title {
  font-size: 1.4rem;
  text-align: center;
  font-weight: 700;
}
.address-text {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 0.6rem;
}

@keyframes slideInSmall {
  from {
    bottom: -18vh;
    opacity: 0.5;
  }

  to {
    bottom: 0;
    opacity: 1;
  }
}

button {
  border: none;
  border-radius: 8px;
  padding: 6px;
  background-color: #60ba62;
  color: #fff;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  margin: 0 1rem;
  width: calc(100% - 2rem);
}

/* Loader animation */
.loader {
  display: inline-flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80px;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 3px solid #60ba62;
  border-radius: 50%;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #60ba62 transparent transparent transparent;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
