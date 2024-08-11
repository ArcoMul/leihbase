<template>
  <FormRow :for="id" :label="label" :required="required" class="formrow">
    <div class="textarea">
      <ClientOnly>
        <QuillEditor
          ref="editor"
          theme="snow"
          v-model:content="model"
          contentType="html"
          :toolbar="[
            ['bold', 'italic', 'underline', 'strike', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ]"
        />
      </ClientOnly>
    </div>
  </FormRow>
</template>

<script lang="ts" setup>
let QuillEditor;
if (process.client) {
  ({ QuillEditor } = await import("@vueup/vue-quill"));
  await import("@vueup/vue-quill/dist/vue-quill.snow.css");
}

const editor = ref();
const model = defineModel();
const props = defineProps<{
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  dataTestid?: string;
}>();

watch(model, (newValue) => {
  console.log("new value", newValue, editor.value);
  if (!newValue) {
    editor.value.setHTML("");
  }
});
</script>

<style scoped>
.lb-input {
  line-height: 1.15;
  padding: var(--spacing-3) var(--spacing-3);
}
.formrow {
  display: flex;
  flex-direction: column;
}
.textarea {
  height: 9rem;
  display: flex;
  flex-direction: column;
}
</style>

<style>
.ql-container {
  overflow: hidden;
}
.ql-editor p,
.ql-editor ol,
.ql-editor ul,
.ql-editor pre,
.ql-editor blockquote,
.ql-editor h1,
.ql-editor h2,
.ql-editor h3,
.ql-editor h4,
.ql-editor h5,
.ql-editor h6 {
  margin-bottom: 1rem !important;
}
</style>
