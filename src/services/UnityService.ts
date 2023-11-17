import { Unity } from "../types/Unity";
const BASE_URL = 'http://localhost:8080/api/v1';

export const UnityService = {
    //se declaran los métodos

    getUnities: async (): Promise<Unity[]>=> {
        const response = await fetch(`${BASE_URL}/unidadMedida`);
        const data = await response.json();
//se hace un get a la url que pasamos para obtener una lista de productos, con el fetch se hace la solicitud 
//y espera la respuesta con await luego convertimos la respuesta en formato json y la devolvemos con una promesa 
//de un array de objetos product
        return data;

    },
//toma un parametro id del producto que obtenemos, hacemos una solicitud get a nuestra url para obtener un producto
// especifico y luego utiliza fetch para lo de la respuesta y lo del json como antes
    getUnity: async (id: number) : Promise <Unity> => {
        const response = await fetch(`${BASE_URL}/unidadMedida/${id}`);
        const data = await response.json();
        return data;

    },
//toma un objeto product como parametro que representa el producto que se va a crear, realiza una solicitud post a la url
//con el objeto product serializado como json en el cuerpo de la solicitud
//es decir con el primer metodo serializamos el producto, espera la respuesta del servidor y hace lo mismo que los demas    
    createUnity: async (unity:Unity):  Promise <Unity> => {
        const response = await fetch(`${BASE_URL}/unidadMedida`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unity)
    });

    const data = await response.json();
    return data;

    },
//toma dos parametros que seria el id del producto a actualizar y product que es el objeto con los datos actualizados del producto
//realiza una solicutd put en la url enviando el objeto product como datos en el cuerpo de la solicitud, tambien lo manda serializado y espera la respuesta de siempre y convierte
//devuelve promesa del producto actualizado
    updateUnity:async (id: number,unity: Unity): Promise<Unity> => {
        const response = await fetch (`${BASE_URL}/unidadMedida/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unity)
        });

        const data = await response.json();
        return data;
    },
//toma un parametro id que representa el producto que se va a eliminar, realiza una solicitud delete a la url para eliminar dicho producto
//y no espera respuestas del servidor   
    deleteUnity:async (id:number): Promise<void> => {
        await fetch (`${BASE_URL}/unidadMedida/${id}`, {
            method: "DELETE"
        });
    }    

} 