import { Button, Form, FormLabel, Modal, ModalBody } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Unity } from "../../types/Unity";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UnityService } from "../../services/UnityService";

type UnityModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    unit: Unity;
}

const UnityModal = ({show, onHide, title, modalType, unit}: UnityModalProps) => {
    
    //CREATE - ACTUALIZAR
    const handleSaveUpdate = async (unit: Unity) => {

            try {
                const isNew = unit.id === 0;
                if(isNew) {
                    await UnityService.createUnity(unit);
                } else {
                    await UnityService.updateUnity(unit.id,unit);
                }
                onHide();
            }catch(error) { 
                console.error;
            }
    };

    //DELETE
    const handleDelete = async () => {

        try {
            await UnityService.deleteUnity(unit.id);
            onHide();
        }catch(error) {
            console.error(error);
        }
    }
    
    //Yup, validación.
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            abreviatura: Yup.string().required('La abreviatura es requerida'),
            denominacion: Yup.string().required('La denominación es requerida'),
        });

    };

    //Formik, validación.
    //en caso de haber errores
    const formik = useFormik({
        initialValues: unit,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Unity) => handleSaveUpdate(obj),
    });

    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Está seguro que desea eliminar la unidad <br/>
                        <strong> {unit.denominacion} </strong> ?
                        </p>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}> Cancelar</Button>
                        <Button variant="danger" onClick={handleDelete}> Eliminar</Button>

                    </Modal.Footer>
                </Modal>
                
                </>
            ) : (
            <>
            <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title> { title } </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    {"Formulario"}
                    <Form onSubmit={formik.handleSubmit}>
                    {
                    "Abreviatura"}
                        <Form.Group controlId="formAbreviatura">
                            <FormLabel> Abreviatura </FormLabel>
                            <Form.Control
                                name="abreviatura"
                                type="text"
                                value= {formik.values.abreviatura || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.abreviatura && formik.touched.abreviatura)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.abreviatura}
                            </Form.Control.Feedback>
                            </Form.Group>
                    
                    {"Denominación"}
                    <Form.Group controlId="formDenominacion">
                            <FormLabel> Denominación </FormLabel>
                            <Form.Control
                                name="denominacion"
                                type="text"
                                value= {formik.values.denominacion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.denominacion}
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Modal.Footer className="mt-4">
                                <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>
                            </Modal.Footer>
                    </Form>
                </ModalBody>
            </Modal>
            </> 
        )}
    </>
)
}

export default UnityModal