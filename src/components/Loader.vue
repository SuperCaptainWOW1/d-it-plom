<template>
  <div class="loader">
    <div></div>
  </div>
</template>

<style scoped>
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
