
import { useEffect, useState } from "react";
import { Unity } from "../../types/Unity";
import { UnityService } from "../../services/UnityService";
import Loader from "../Loader/Loader";
import { Table, Button } from "react-bootstrap"; 
import { ModalType } from "../../types/ModalType";
import UnityModal from "../UnityModal/UnityModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";




const UnityTable = () => {
    
    //contiene los datos recibidos por la API
    const [unities, setUnities] = useState<Unity[]>([]);

    //muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Este hook se ejecuta cada vez que se renderice el componente
    useEffect(() => {
        //llamamos a la funcion para obtener todos los produtos declarados en el service
        const fetchUnities = async () => {
            const unities = await UnityService.getUnities();
            setUnities(unities);
            setIsLoading(false);
        };

        fetchUnities();

    }, []);
    //test, este log esta modificado para mostrar mejor los datos
    console.log(JSON.stringify(unities, null, 2));

    //const para iniciar un producto por defecto y evitar el undefined

    const initializableNewUnity = (): Unity => {
        return {
            id: 0,
            abreviatura: "",
            denominacion: "",
        };
    };
    
    //unidad seleccionada que se pasa como prop al modal
    const [unity, setUnity] = useState<Unity>(initializableNewUnity);
    //const para manejar el estado del modal
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    
    //Logica del modal
    const handleClick = (newTitle: string, unit: Unity, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal);
        setUnity(unit);
        setShowModal(true);   
    
    };
    

    return (
        <>
        <Button onClick={() => handleClick("Nueva Unidad", initializableNewUnity(), 
        ModalType.CREATE )}> Nueva Unidad </Button>

        {isLoading ? <Loader/> : (
           <Table hover>
            <thead>
                <tr>
                    <th> Abreviatura </th>
                    <th> Denominacion </th>
                    <th> Editar</th>
                    <th> Eliminar</th>
                </tr>
                </thead> 
                <tbody>
                    {unities.map(unity => (
                        <tr> key={unity.id}
                        <td>{unity.abreviatura}</td>
                        <td>{unity.denominacion}</td>
                        <td> <EditButton onClick={() => handleClick("Editar Unidad", unity, ModalType.UPDATE)}/> </td>
                        <td> <DeleteButton onClick={() => handleClick("Eliminar Unidad", unity, ModalType.DELETE)}/> </td>
                        </tr>
                    ))}
                
                </tbody>
            </Table>
        )} 
        {showModal && (
            <UnityModal
            show={showModal}
            onHide={() => setShowModal(false)}
            title={title}
            modalType={modalType}
            unit={unity}
            />
        )}
     </>  
    )
}
export default UnityTable