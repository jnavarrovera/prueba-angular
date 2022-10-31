import { Observable } from "rxjs";

/**
 * Interfaz que establece el estado de la aplicación
 */
export interface StateService<T> {
    /**
     * Función que comprueba el loading
     */
    isLoading$(): Observable<boolean>;

    /**
     * Función que establece si se muestra o no el loading
     * @param isLoading 
     */
    setLoading(isLoading: boolean): void;

    /**
     * Función que obtiene datos
     */
    get$(): Observable<T[] | null>;

    /**
     * Función que establece datos
     * @param elements 
     */
    set(elements: T[]): void;

    /**
     * Función que añade un dato
     * @param element 
     */
    add(element: T): void;

    /**
     * Función que modifica un dato
     * @param element 
     */
    update(element: T): void;

    /**
     * Función que elimina un dato
     * @param element 
     */
    remove(element: T): void;

    /**
     * Función que elimina algunos datos
     * @param elements
     */
    removeMany?(elemens:number[]):void;
}
