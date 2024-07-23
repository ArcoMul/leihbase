import type { RecordModel } from "pocketbase";
import type { ModelRef } from "vue";
import type RecordPicker from "~/components/admin/RecordPicker.vue";

/**
 * Composable to manage the RecordPicker component living as a parent element of
 * the current element.
 *
 * @param recordPicker RecordPicker component reference
 * @param options Options
 * @returns
 */
export async function useRecordPicker(
  model: ModelRef<string | undefined, string>,
  recordPicker: Ref<InstanceType<typeof RecordPicker> | undefined>,
  {
    title,
    collection,
    search,
    value,
  }: {
    title: string;
    collection: string;
    search: string[];
    value: string | undefined;
  }
) {
  const { pb } = usePocketbase();

  const record = ref<RecordModel>();

  // Retrieve record if a value is defined
  if (value) {
    record.value = await pb.collection(collection).getOne(value);
  }

  // Refresh record on value change
  watch(model, async (newValue) => {
    if (!newValue) {
      record.value = undefined;
      return;
    }
    record.value = await pb.collection(collection).getOne(newValue);
  });

  // Expose function to show RecordPicker dialog
  function show() {
    recordPicker?.value?.show({
      title,
      collection,
      search,
      record,
    });
  }

  return { record, show };
}
