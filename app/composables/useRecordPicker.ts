import type { RecordModel } from "pocketbase";
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

  if (value) {
    record.value = await pb.collection(collection).getOne(value);
  }

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
