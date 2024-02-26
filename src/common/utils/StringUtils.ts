export class StringUtils {

    public static isEmpty(str: string): boolean {
        if (!str || str === undefined || str === "" ||  str.length == 0) {
            return true;
        }
        return false;
    }

    public static toPascalCase(input: string): string {
        return `${input}`
          .replace(new RegExp(/[-_]+/, 'g'), ' ')
          .replace(new RegExp(/[^\w\s]/, 'g'), '')
          .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
          )
          .replace(new RegExp(/\s/, 'g'), '')
          .replace(new RegExp(/\w/), s => s.toUpperCase());
      }
}