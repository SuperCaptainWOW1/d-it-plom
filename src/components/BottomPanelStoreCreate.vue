<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import Loader from "../components/Loader.vue";

import { apiAddress } from "../const";

const router = useRouter();

const props = defineProps({
  address: String,
  isShowPanel: Boolean,
  lng: Number,
  lat: Number,
});

const emit = defineEmits({
  close: null,
});

const panelMode = ref("small");
const isEditActive = ref(false);

const formData = reactive({
  name: "",
  votesNumber: 100,
});

const formDataRules = {
  name: { required },
  votesNumber: { required },
};

const v$ = useVuelidate(formDataRules, formData);

function startEdit() {
  isEditActive.value = true;

  panelMode.value = "normal";
}

function close() {
  emit("close");
  panelMode.value = "small";
  isEditActive.value = false;
}

async function addCompany() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  const newCompany = {
    name: formData.name,
    address: props.address,
    votesNumber: formData.votesNumber,
    lng: props.lng,
    lat: props.lat,
  };

  console.log(newCompany);

  // Make POST request to db
  await fetch(`${apiAddress}/companies`, {
    method: "POST",
    body: JSON.stringify(newCompany),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  router.push("/companies");
}
</script>

<template>
  <Transition name="slide">
    <div v-if="isShowPanel" :class="'store-create-block ' + panelMode">
      <span class="close" @click="close">
        <font-awesome-icon :icon="['fas', 'times']" />
      </span>

      <div v-if="isEditActive">
        <input
          v-model="formData.name"
          type="text"
          class="edit-name-input"
          placeholder="Введите название"
        />
        <p v-if="v$.name.$error" class="validation-error name">
          Это поле обязательно.
        </p>

        <p class="edit-address">{{ address }}</p>

        <input
          v-model="formData.votesNumber"
          type="number"
          class="edit-votes-input"
          placeholder="Максимальное коль-во заявок"
        />

        <p v-if="v$.votesNumber.$error" class="validation-error votes">
          Это поле обязательно.
        </p>

        <button class="add-company-button" @click="addCompany">Добавить</button>
      </div>

      <div v-else-if="address">
        <p class="address-title">Адрес:</p>
        <p class="address-text">
          {{ address }}
        </p>
        <button @click="startEdit">Добавить предприятие</button>
      </div>

      <Loader v-else />
    </div>
  </Transition>
</template>

<style scoped>
.store-create-block {
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 34px 34px 0 0;
  padding: 2.5rem 2rem;
  z-index: 10;
  display: none;
  transition: 0.2s;
}
.store-create-block.small {
  min-height: 15vh;
  display: block;
}
.store-create-block.normal {
  min-height: 20vh;
  display: block;
}
.store-create-block.big {
  min-height: 40vh;
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

.slide-enter-active,
.slide-leave-active {
  transition: 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  bottom: -10%;
  opacity: 0;
}

button {
  border: none;
  border-radius: 8px;
  padding: 6px;
  background-color: #60ba62;
  color: #fff;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.1);
  margin: 0 2rem;
  width: calc(100% - 4rem);
  cursor: pointer;
}

.add-company-button {
  margin-top: 1rem;
}

.close {
  position: absolute;
  top: 0.3rem;
  right: 0.6rem;
  padding: 0.5rem;
}

.edit-name-input {
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  width: 100%;
  color: #212121;
}

.edit-name-input:focus {
  outline: none;
}

.edit-address {
  color: #818181;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.edit-votes-input {
  border: none;
  border-bottom: 2px solid #60ba62;
  padding: 0.2rem;
  border-radius: 4px;
  width: 100%;
}

.edit-votes-input:focus {
  outline: 2px solid rgba(96, 186, 98, 0.6);
  border-bottom: 2px solid transparent;
}

.validation-error {
  font-size: 0.8rem;
  color: #e63939;
  margin-bottom: 0.4rem;
}
</style>
