import { DateTime } from "luxon";

export function formatDate(date: string, format: string) {
    return DateTime.fromJSDate(new Date(date)).toLocaleString(
        format
    )
}