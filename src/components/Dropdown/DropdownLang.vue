<template>
  <div class="relative">
    <button @click="toggleDropdown"
            class="bg-white border w-56 border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-between text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
        <div class="flex gap-2 items-center">
          <img v-if="props.flag" :src="selectedLabel.flag.src" alt="">
          {{ selectedLabel.name }}
        </div>
      <svg class="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"/>
      </svg>
    </button>

    <ul v-if="isOpen" class="select-none absolute mt-2 w-56 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <li v-for="(option, index) in options" :key="index">
          <div v-if="selectedLabel.code === option.value" class="px-4 py-2 text-sm text-gray-700 bg-gray-100 flex gap-2 items-center cursor-default">
            <img v-if="props.flag" :src="option.label.flag.src" :alt="`${option.label.code} flag`">
            {{ option.label.name }}
          </div>
          <div v-else @click="selectOption(option)" class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2 items-center cursor-pointer">
            <img v-if="props.flag" :src="option.label.flag.src" :alt="`${option.label.code} flag`">
            {{ option.label.name }}
          </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { languages } from "@i18n/ui";

const props = defineProps<{
  modelValue?: string | number;
  url: string;
  lang: string;
  flag: boolean,
  load: () => void;
}>();

const isOpen = ref(false);

interface LanguageOption {
  label: string;
  value: string;
}

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const options = ref<LanguageOption[]>([]);

const selectedOption = ref<LanguageOption | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && props.load) {
    props.load(); // Calling the load function when the dropdown is opened
  }
};

const selectOption = (option: LanguageOption) => {
  selectedOption.value = option;
  isOpen.value = false;

  emit("update:modelValue", option.value);

  const url = new URL(props.url);
  const pathname = url.pathname;

  // Adjusted regular expression to handle both `/fr` and `/fr/` formats
  const updatedPathname = pathname.replace(/^\/[a-zA-Z]{2}(\/)?/, "/");

  const defaultLang = "en";
  let route = "/" + option.value + updatedPathname;

  // Check if the option value matches the default language
  if (option.value === defaultLang) {
    route = updatedPathname; // Set route to updated pathname without the language prefix
  } else if (pathname === "/" + defaultLang) {
    // Check if the current pathname is the default language without trailing slash
    route = "/" + option.value + "/";
  }

  document.location.href = route;
};

watch(() => props.modelValue, (newValue) => {
  selectedOption.value = options.value.find((item) => item.value === newValue) || null;
});

Object.entries(languages).forEach(([key, value]) => {
  options.value.push({
    label: value as any,
    value: key,
  });
});

if (props.lang) {
  selectedOption.value = options.value.find((item) => item.value === props.lang) || null;
}

const selectedLabel = selectedOption.value ? selectedOption.value.label : "";
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-top: none;
  padding: 5px 0;
  list-style: none;
  margin: 0;
  z-index: 1000;
}

.dropdown-menu li {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f8f9fa;
}
</style>
