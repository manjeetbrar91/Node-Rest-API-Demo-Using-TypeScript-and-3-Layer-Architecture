export class CollectionUtils {

    public static isEmpty(array: Array<any>): boolean {
        if (typeof array != "undefined"
            && array != null
            && array.length != null
            && array.length > 0) {
            return false;
        }
        return true;
    }
}