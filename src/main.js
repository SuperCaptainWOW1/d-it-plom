import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

library.add(faMagnifyingGlass, faTimes, faBars, faChevronLeft);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
