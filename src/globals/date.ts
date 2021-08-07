export function format_django_date(date: string): string {
    const sp: string[] = date.substr(0, date.length-1).split("T");
    const time = sp[1].split(".")[0]
    return sp[0] + " " + time.substr(0, time.length-3);
}